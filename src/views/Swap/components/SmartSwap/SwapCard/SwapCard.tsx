import { Box, Center, Flex, Heading, IconButton, Text } from "@chakra-ui/react";

import SwapButton from "../SwapButton/SwapButton";
import TextField from "../TextField/TextField";

import BigNumber from "bignumber.js";
import { ExchangeIcon } from "components/Icons/ui";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/dist/client/router";
import { use, useEffect, useMemo } from "react";
import { FetchWhitelistedTokens } from "redux/slices/smartSwaps/funcs";
import {
  selectSlippage,
} from "redux/slices/smartSwaps/smartSwaps";
import { updateURLParams } from "utils/functions/routes";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { ILpSmartSwap, INomalSmartSwap } from "utils/types/others.interface";
import useGetSwapInfo from "views/Swap/hooks/useGetSwapInfo";
import FeeInfo from "../FeeInfo/FeeInfo";
import SwapDetails from "../SwapDetails/SwapDetails";
import React, { useState } from 'react';
import {Aggregator, ChainId} from '@ashswap/ash-sdk-js';
import { Address } from "@multiversx/sdk-core/out";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
import ActionButton from "components/ActionButton/ActionButton";
import { network, toknesID } from "api/net.config";
import { set } from "lodash";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import useGetAccountTokens from "utils/hooks/useGetAccountTokens";
import store from "redux/store";

const getAshChainId = () => {
  if (network.id == "mainnet") {
    return ChainId.Mainnet;
  } else if (network.id == "devnet") {
    return ChainId.Devnet;
  }
}

export interface SwapToken {
  identifier: string;
  decimals?: number;
  value?: string;
}

const SwapCard = () => {
  const userAddress = store.getState().userAccount.connectedAddress;
  const [receiverAddress, setReiceverAddress] = useState(null);
  const router = useRouter();
  const chainId = getAshChainId();
  const slipapge = useAppSelector(selectSlippage);
  const ashSwapAggregator = useMemo(() => {
    if (chainId) {
      const agg = new Aggregator({ chainId: chainId });
      // setReiceverAddress(agg.address.valueHex);
      return agg;
    }
  }, [chainId]);
  console.log("⚠️ ~ file: SwapCard.tsx:51 ~ ashSwapAggregator:", ashSwapAggregator)

  //
  // TOKENS
  //
  const [swapTokens, setSwapTokens] = useState([]);
  const [fromToken, setFromToken] = useState<SwapToken>({
    identifier: toknesID.usdc,
    decimals: 6,
    value: null,
  });
  const [toToken, setToToken] = useState<SwapToken>({
    identifier: toknesID.wegld,
    decimals: 18,
    value: null,
  });

  const { tokens: elrondTokens } = useGetMultipleElrondTokens(swapTokens.map((token) => token.identifier));
  // console.log("⚠️ ~ file: SwapCard.tsx:72 ~ elrondTokens:", elrondTokens)

  const { accountToken } = useGetAccountToken(fromToken.identifier);
  // console.log("⚠️ ~ file: SwapCard.tsx:71 ~ accountTokens:", accountTokens)
  const [maxBalance, setMaxBalance] = useState(null);


  useEffect(() => {
    let isMounted = true;
    const fetchTokens = async () => {
      const tokens = await ashSwapAggregator.getTokens();
      const formattedTokens = tokens.map((token) => {
        return {
          identifier: token.id,
          decimals: token.decimal,
          coingeckoId: token.coingeckoId,
        };
      });

      if (isMounted) {
        setSwapTokens(formattedTokens);
      }
    };

    fetchTokens();
    return () => {
      isMounted = false;
    };
  }, [ashSwapAggregator, chainId]);
  
  useEffect(() => {
    if (router.query.fromToken) {
      // console.log("⚠️ ~ file: SwapCard.tsx:92 ~ fromToken:", router.query.fromToken)
      setFromToken({
        identifier: router.query.fromToken.toString(),
      });
    }
    if (router.query.toToken) {
      // console.log("⚠️ ~ file: SwapCard.tsx:92 ~ toToken:", router.query.toToken)
      setToToken({
        identifier: router.query.toToken.toString(),
      });
    }
  }, [router, swapTokens]);
  // console.log("⚠️ ~ file: SwapCard.tsx:50 ~ SwapCard ~ fromToken::::", fromToken)
  // console.log("⚠️ ~ file: SwapCard.tsx:52 ~ SwapCard ~ toToken::::", toToken)

  //
  // FIELDS
  //
  const handleChangeFromField = (value) => {
    if (!value || value == "") {
      setToToken({
        identifier: toToken.identifier,
        decimals: toToken.decimals,
        value: null,
      });
    }
    if (!fromToken?.decimals) {
      setFromToken({
        identifier: fromToken.identifier,
        decimals: swapTokens.find((token) => token.identifier === fromToken.identifier).decimals,
        value: value !== "" ? value : null,
      });
    } else {
      setFromToken({
        identifier: fromToken.identifier,
        decimals: fromToken.decimals,
        value: value !== "" ? value : null,
      });
    }
  };

  const handleOnSelectFromToken = (token) => {
    const tokenIdentifier = token.identifier;
    updateURLParams({ fromToken: tokenIdentifier });
    setFromToken({
      identifier: tokenIdentifier,
      decimals: token.decimals,
      value: fromToken.value,
    });
  };

  const handleOnSelectToToken = (token) => {
    const tokenIdentifier = token.identifier;
    updateURLParams({ toToken: tokenIdentifier });
    setToToken({
      identifier: tokenIdentifier,
      decimals: token.decimals,
      value: toToken.value,
    });
  };

  const handleExchangeFields = () => {
    setFromToken({
      identifier: toToken.identifier,
      decimals: toToken.decimals,
      value: null,
    });
    setToToken({
      identifier: fromToken.identifier,
      decimals: fromToken.decimals,
      value: null,
    });
    const fromTokenId = fromToken.identifier;
    const toTokenId = toToken.identifier;
    updateURLParams({ fromToken: fromTokenId, toToken: toTokenId });
  };

  const handleMaxFromField = () => {
      const multiplier = Math.pow(10, accountToken.decimals);
      const finalValue = BigNumber(accountToken.balance).div(multiplier).toString();
      setFromToken({
        identifier: fromToken.identifier,
        decimals: accountToken.decimals,
        value: finalValue,
      });
    // }
  };

  //
  // NEW SWAP DATA
  //
  const [swapPaths, setSwapPaths] = useState(null);
  // console.log("⚠️ ~ file: SwapCard.tsx:192 ~ swapPaths:", swapPaths)

  useEffect(() => {
    const handleCalculateNewSwapData = () => {
      const multiplier = Math.pow(10, fromToken?.decimals || 0);
      const finalValue = BigNumber(fromToken.value).times(multiplier).toString();

      ashSwapAggregator.getPaths(fromToken.identifier, toToken.identifier, finalValue).then((p) => {
        setSwapPaths(p);
      });
    };

    if (fromToken.identifier && fromToken.value && toToken.identifier) {
      handleCalculateNewSwapData();
    }
  }, [ashSwapAggregator, chainId, fromToken, router.query.fromToken, toToken.identifier]);

  useEffect(() => {
    if (swapPaths && swapPaths?.returnAmount && fromToken?.value) {
      setToToken({
        identifier: toToken.identifier,
        decimals: toToken.decimals,
        value: swapPaths?.returnAmount || null,
      });
    }
  }, [swapPaths, fromToken, toToken.identifier, toToken.decimals]);

  //
  // SWAP BUTTON
  //
  const [interaction, setInteraction] = useState(null);
  console.log("⚠️ ~ file: SwapCard.tsx:223 ~ interaction:", interaction)

  useEffect(() => {
    const handleCreateInteractionFromSwapData = () => {
      ashSwapAggregator.aggregateFromPaths(swapPaths, slipapge*100).then((i) => {
        setInteraction(
          i.withSender(
            new Address(userAddress)
          )
        );
      });
    };

    if (swapPaths && swapPaths?.swaps && fromToken?.value) {
      handleCreateInteractionFromSwapData();
    }
  }
  , [ashSwapAggregator, fromToken?.value, slipapge, swapPaths, userAddress]);

  //
  // RESET
  //
  useEffect(() => {
    if (!fromToken?.value) {
      setSwapPaths(null);
      setToToken({
        identifier: toToken.identifier,
        decimals: toToken.decimals,
        value: null,
      });
      setInteraction(null);
    }
  }, [fromToken?.value, toToken.decimals, toToken.identifier]);

  return (
    <Flex
      width={"full"}
      flexDir={"column"}
      justifyContent={"flex-start"}
      alignItems={"left"}
    >
      <Heading as="h1" ml={"15px"} fontSize={"xl"}>
        Swap
      </Heading>

      <Box
        maxWidth={"500px"}
        width={"full"}
        mb={0}
        borderRadius="30px"
        position="relative"
        pt={4}
      >
        <Box>
          <Flex flexDir={"column"} width={"full"}>
            <Center flexDir={"column"} position="relative" mb={"10px"}>
              <TextField
                sxProps={{borderColor: "transparent" , backgroundColor:"black.base"}}
                label={"You send"}
                id="from"
                hasMaxButton
                onChange={(e) => handleChangeFromField(e.target.value)}
                handleClickToken={handleOnSelectFromToken}
                onClickMaxtoken={handleMaxFromField}
                field={fromToken}
                disableChangeToken={false}
                dollarAmount={
                  fromToken.value ?
                  (elrondTokens.find((token) => token.identifier === fromToken.identifier)?.price
                  * BigNumber(fromToken.value).toNumber()).toString() : ""
                }
                swapTokens={swapTokens}
              />
              <Center  position={"absolute"} bottom={"-25px"} zIndex={2}>
                <IconButton
                  onClick={handleExchangeFields}
                  borderRadius={"1.5rem"}
                  aria-label="change-positions"
                  bg="black.base"
                  boxSize={"50px"}
                  border={"5px solid"}
                  borderColor={"black.baseDark"}
                  _hover={{ bg: "black.baseDark" }}
                  disabled={false}
                >
                  <ArrowUpDownIcon color={"main"} />
                </IconButton>
              </Center>
            </Center>
            <TextField
              sxProps={{borderColor: "transparent" , backgroundColor:"black.base"}}
              label={"You receive"}
              id="to"
              hasMaxButton={false}
              handleClickToken={handleOnSelectToToken}
              field={toToken}
              isDisabled={true}
              isLoadingAmount={false}
              dollarAmount={
                toToken.value && fromToken.value ?
                (elrondTokens.find((token) => token.identifier === toToken.identifier)?.price
                * BigNumber(toToken.value).toNumber()).toString() : ""
              }
              swapTokens={swapTokens.filter((token) => token.identifier !== fromToken.identifier)}
            />
            {/* {toToken?.identifier && (
              <Flex justifyContent={"flex-end"} mt={-2} color="#24918a"></Flex>
            )} */}
            {fromToken?.value && swapPaths && (
              <SwapDetails swapPaths={swapPaths} />
            )}
            <SwapButton
              bg={"black.dark"}
              color="main"
              py="15px"
              width="60%"
              alignContent="center"
              style={{ margin: 'auto' , marginTop:'40px'}}
              interaction={interaction}
            />

            <FeeInfo />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default SwapCard;