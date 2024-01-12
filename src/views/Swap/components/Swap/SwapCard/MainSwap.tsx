import { Box, BoxProps, Center, Flex, FlexProps, Heading, IconButton, Text, useEditable } from "@chakra-ui/react";

import SwapButton from "../SwapButton/SwapButton";
import TextField from "../TextField/TextField";

import BigNumber from "bignumber.js";
import { ExchangeIcon } from "components/Icons/ui";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/dist/client/router";
import { PropsWithChildren, use, useEffect, useMemo } from "react";
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
import CoinTab from "views/Dashboard/components/Dashtabs/WalletTab/CoinTab";
import NFTLiquidityInterface from "views/Swap/NFTSwap/NFTLiquidityInterface";

const getAshChainId = () => {
  if (network.id == "mainnet") {
    return ChainId.Mainnet;
  } else if (network.id == "devnet") {
    return ChainId.Devnet;
  }
}

const getValueAfterFee = (token, fee) => {
  return BigNumber(token.value).times(BigNumber(1).minus(BigNumber(fee))).toFixed(18).toString();
}

export interface SwapToken {
  identifier: string;
  decimals?: number;
  value?: string;
}

const egldFee = 0.01;

const SwapCard = ({setGraphTokens} : {setGraphTokens: any}) => {
  const userAddress = store.getState().userAccount.connectedAddress;
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

  const { accountToken } = useGetAccountToken(fromToken.identifier);

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
      setFromToken({
        identifier: router.query.fromToken.toString(),
      });
    }
    if (router.query.toToken) {
      setToToken({
        identifier: router.query.toToken.toString(),
      });
    }
  }, [router, swapTokens]);

  useEffect(() => {
    if (fromToken?.identifier && toToken?.identifier) {
      setGraphTokens([fromToken.identifier, toToken.identifier]);
    }
  } , [fromToken.identifier, setGraphTokens, toToken.identifier]);

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
      const finalValue = fromToken.identifier == "EGLD" ?
        BigNumber(accountToken.balance).div(multiplier).minus(egldFee).toString() :
        BigNumber(accountToken.balance).div(multiplier).toString();
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
    const fee = fromToken.identifier == "EGLD" ? egldFee : 0;
    if (accountToken) {
      if (!fromToken.value) {
        return true;
      }
      return BigNumber(accountToken.balance).gte(
        BigNumber(fromToken?.value).times(Math.pow(10, accountToken.decimals)).plus(
          BigNumber(fee * Math.pow(10, 18))
        )
      );
    }
  }, [accountToken, fromToken.identifier, fromToken?.value]);

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

  useEffect(() => {
    const handleCalculateNewSwapData = () => {
      const multiplier = Math.pow(10, fromToken?.decimals || 0);
      const finalInputAmount = getValueAfterFee(fromToken, fee);
      const finalValue = BigNumber(finalInputAmount).times(multiplier).toFixed(0).toString();

      try {
        ashSwapAggregator.getPaths(fromToken.identifier, toToken.identifier, finalValue).then((p) => {
          setSwapPaths(p);
        });
      } catch (error) {
        console.log("⚠️ ~ file: SwapCard.tsx:207 ~ error:", error)
      }
    };

    if (fromToken.identifier && Number(fromToken.value) > 0 && toToken.identifier && !isWrapEgld && !isUnwrapEgld) {
      handleCalculateNewSwapData();
    }
  }, [ashSwapAggregator, fee, fromToken, isUnwrapEgld, isWrapEgld, toToken.identifier]);

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
  // console.log("⚠️ ~ file: SwapCard.tsx:223 ~ interaction:", interaction)
  useEffect(() => {
    const handleCreateInteractionFromSwapData = () => {
      try {
        ashSwapAggregator.aggregateFromPaths(swapPaths, slipapge*100).then((i) => {
          setInteraction(
            i.withSender(
              new Address(userAddress)
            )
          );
        });
      } catch (error) {
        console.log("⚠️ ~ file: SwapCard.tsx:237 ~ error:", error)
      }
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
        <FeeInfo fee={fee * 100} whichToken={"input"}/>
      </Flex>
    </Box>
  );
};

export default SwapCard;