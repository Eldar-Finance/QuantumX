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
import useGetAshSwapFee from "utils/hooks/useGetAshSwapFee";
import { unwrapEgld, wrapEgld } from "api/sc/calls";

const getAshChainId = () => {
  if (network.id == "mainnet") {
    return ChainId.Mainnet;
  } else if (network.id == "devnet") {
    return ChainId.Devnet;
  }
}

const getValueAfterFee = (value, fee) => {
  return BigNumber(value).times(BigNumber(1).minus(BigNumber(fee))).toString();
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
  const { fee } = useGetAshSwapFee();

  const ashSwapAggregator = useMemo(() => {
    if (chainId) {
      const agg = new Aggregator({ chainId: chainId });
      // setReiceverAddress(agg.address.valueHex);
      return agg;
    }
  }, [chainId]);
  // console.log("⚠️ ~ file: SwapCard.tsx:51 ~ ashSwapAggregator:", ashSwapAggregator)

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
      let tokens = await ashSwapAggregator.getTokens();
      if (!tokens.find((token) => token.id === "EGLD")) {
        tokens = [...tokens, {
          id: "EGLD",
          decimal: 18,
          coingeckoId: ""
        }];
      }

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
    if (tokenIdentifier === toToken.identifier) {
      handleExchangeFields();
    } else {
      updateURLParams({ fromToken: tokenIdentifier });
      setFromToken({
        identifier: tokenIdentifier,
        decimals: token.decimals,
        value: fromToken.value,
      });
      setSwapPaths(null);
      setInteraction(null);
    }
  };

  const handleOnSelectToToken = (token) => {
    const tokenIdentifier = token.identifier;
    updateURLParams({ toToken: tokenIdentifier });
    setToToken({
      identifier: tokenIdentifier,
      decimals: token.decimals,
      value: null,
    });
    setSwapPaths(null);
    setInteraction(null);
  };

  const handleExchangeFields = () => {
    const fromTokenId = toToken.identifier;
    const toTokenId = fromToken.identifier;
    setFromToken({
      identifier: toToken.identifier,
      decimals: toToken.decimals,
      value: fromToken.value || null,
    });
    setToToken({
      identifier: fromToken.identifier,
      decimals: fromToken.decimals,
      value: null,
    });

    updateURLParams({ fromToken: fromTokenId, toToken: toTokenId });
    setSwapPaths(null);
    setInteraction(null);
  };

  const handleMaxFromField = () => {
      const multiplier = Math.pow(10, accountToken.decimals);
      const finalValue = BigNumber(accountToken.balance).div(multiplier).toString();
      setFromToken({
        identifier: fromToken.identifier,
        decimals: accountToken.decimals,
        value: finalValue,
      });
  };

  const handleWrapUnwrap = async () => {
    if (isWrapEgld) {
      return wrapEgld(fromToken.value);
    } else if (isUnwrapEgld) {
      return unwrapEgld(fromToken.value);
    }
  }

  //
  // CONDITIONS
  //
  const hasEnoughBalance = useMemo(() => {
    // if (!fromToken.value) {
    //   return true;
    // }
    // else 
    if (accountToken) {
      return BigNumber(accountToken.balance).gte(BigNumber(Number(fromToken?.value || 0) * Math.pow(10, accountToken.decimals)));
    }
    return false;
  }, [accountToken, fromToken?.value]);
  // console.log("⚠️ ~ file: SwapCard.tsx:288 ~ hasEnoughBalance:", hasEnoughBalance)

  const isWrapEgld = useMemo(() => {
    return fromToken.identifier === toknesID.egld && toToken.identifier === toknesID.wegld;
  }, [fromToken.identifier, toToken.identifier]);

  const isUnwrapEgld = useMemo(() => {
    return fromToken.identifier === toknesID.wegld && toToken.identifier === toknesID.egld;
  }, [fromToken.identifier, toToken.identifier]);

  //
  // NEW SWAP DATA
  //
  const [swapPaths, setSwapPaths] = useState(null);
  console.log("⚠️ ~ file: SwapCard.tsx:192 ~ swapPaths:", swapPaths)

  useEffect(() => {
    const handleCalculateNewSwapData = () => {
      const multiplier = Math.pow(10, fromToken?.decimals || 0);
      const finalInputAmount = getValueAfterFee(fromToken.value, fee);
      const finalValue = BigNumber(finalInputAmount).times(multiplier).toString();

      ashSwapAggregator.getPaths(fromToken.identifier, toToken.identifier, finalValue).then((p) => {
        setSwapPaths(p);
      });
    };

    if (fromToken.identifier && Number(fromToken.value) > 0 && toToken.identifier && !isWrapEgld && !isUnwrapEgld) {
      handleCalculateNewSwapData();
    }
  }, [ashSwapAggregator, fee, fromToken?.decimals, fromToken.identifier, fromToken.value, isUnwrapEgld, isWrapEgld, toToken.identifier]);

  useEffect(() => {
    if (swapPaths && swapPaths?.returnAmount && fromToken?.value) {
      setToToken({
        identifier: toToken.identifier,
        decimals: toToken.decimals,
        value: swapPaths?.returnAmount || null,
      });
    }
  }, [swapPaths, fromToken, toToken.identifier, toToken.decimals, fee]);

  //
  // INTERACTION DATA
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

    if (swapPaths && fromToken?.value) {
      handleCreateInteractionFromSwapData();
    }
  }
  , [ashSwapAggregator, fromToken?.value, slipapge, swapPaths, userAddress]);

  //
  // WRAP - UNWRAP
  //
  useEffect(() => {
    if (isWrapEgld || isUnwrapEgld) {
      setToToken({
        identifier: toToken.identifier,
        decimals: toToken.decimals,
        value: fromToken.value,
      });
    }
  }
  , [fromToken.value, isUnwrapEgld, isWrapEgld, toToken.decimals, toToken.identifier]);

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
      <Heading as="h1" fontSize={"m"} fontWeight={"bold"} mb={1} ml={5}
      >
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
                  borderRadius={"2.5rem"}
                  aria-label="change-positions"
                  bg="black.base"
                  boxSize={"55px"}
                  border={"7px solid"}
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
            {!isWrapEgld && !isUnwrapEgld ? 
              <SwapButton
                //bg={"#22F6DC"}
                bg={"linear-gradient(315deg, #FF005C 50%, #22F6DC 50% 100%);"}
                filter={"brightness(90%)"}
                color="black"
                py="17px"
                width="100%"
                alignContent="center"
                fontWeight={"900"}
                fontSize={"1.2em"}
                style={{ margin: 'auto' , marginTop:'20px'}}
                interaction={interaction}
                actualInputAmount={BigNumber(fromToken.value).times(Math.pow(10, fromToken.decimals)).toString()}
                disabled={!hasEnoughBalance || !swapPaths || userAddress=="" ? true : false}
                disabledMessage={hasEnoughBalance ? "Enter an amount" : "Insufficient balance"}
              /> :
              <SwapButton
                //bg={"#22F6DC"}
                bg={"linear-gradient(315deg, #FF005C 50%, #22F6DC 50% 100%);"}
                filter={"brightness(90%)"}
                color="black"
                py="17px"
                width="100%"
                alignContent="center"
                fontWeight={"900"}
                fontSize={"1.2em"}
                style={{ margin: 'auto' , marginTop:'20px'}}
                disabled={!hasEnoughBalance || userAddress=="" || !fromToken.value ? true : false}
                disabledMessage={hasEnoughBalance ? "Enter an amount" : "Insufficient balance"}
                defaultMessage={isWrapEgld ? "Wrap" : "Unwrap"}
                isWrapOrUnwrap={true}
                wrapUnwrapCall={handleWrapUnwrap}
              />
            }
            <FeeInfo fee={fee * 100}/>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default SwapCard;