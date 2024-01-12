import { Box, BoxProps, Center, Flex, FlexProps, Heading, IconButton, Text, useEditable } from "@chakra-ui/react";
import SwapButton from "../SwapButton/SwapButton";
import TextField from "../TextField/TextField";
import BigNumber from "bignumber.js";
import { ExchangeIcon } from "components/Icons/ui";
import { ArrowUpDownIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { useRouter } from "next/dist/client/router";
import { PropsWithChildren, use, useEffect, useMemo } from "react";
import { FetchWhitelistedTokens } from "redux/slices/smartSwaps/funcs";
import {
  setFromToken,
  setFromTokenValue,
  setToToken,
  setToTokenValue,
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
import useSelectSmarSwapTokens from "views/Swap/hooks/useSelectSmarSwapTokens";
import { useGetFees } from "views/Admin/Views/Swap/hooks";
import { formatBalance } from "utils/functions/formatBalance";
import SwapToLpButton from "../SwapToLpButton/SwapToLpButton";
import SwapDetailsToLp from "../SwapDetailsToLp/SwapDetailsToLp";

const getAshChainId = () => {
  if (network.id == "mainnet") {
    return ChainId.Mainnet;
  } else if (network.id == "devnet") {
    return ChainId.Devnet;
  }
}

// const getValueAfterFee = (token, fee) => {
//   return BigNumber(token.value).times(BigNumber(1).minus(BigNumber(fee))).toFixed(18).toString();
// }

export interface SwapToken {
  identifier: string;
  decimals?: number;
  value?: string;
}

const egldFee = 0.01;

const LpSwap = () => {
  const userAddress = store.getState().userAccount.connectedAddress;
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(FetchWhitelistedTokens());
  }, [dispatch]);
  const chainId = getAshChainId();

  const { fees } = useGetFees();

  const ashSwapAggregator = useMemo(() => {
    if (chainId) {
      const agg = new Aggregator({ chainId: chainId });
      return agg;
    }
  }, [chainId]);

  //
  // TOKENS
  //
  const [swapTokens, setSwapTokens] = useState([]);

  const [fromTokenToLp, setFromTokenToLp] = useState<SwapToken>({
    identifier: toknesID.usdc,
    decimals: 6,
    value: null,
  });
  dispatch(setFromToken(fromTokenToLp.identifier));
  const [toTokenToLp, setToTokenToLp] = useState<SwapToken>({
    identifier: toknesID.rareUsdcLp,
    decimals: 18,
    value: null,
  });
  dispatch(setToToken(toTokenToLp.identifier));

  const fromTokensToLp = swapTokens.filter(
    (t) => t.identifier == toknesID.wegld || t.identifier == toknesID.usdc
  );

  const { tokens: elrondTokens } = useGetMultipleElrondTokens(swapTokens.map((token) => token.identifier));
  const { accountToken } = useGetAccountToken(fromTokenToLp.identifier);

  // LP Tokens
  const smartSwapTokens = useAppSelector((state) => state.smartSwap.tokens)
  const { elrondTokens: allSmartSwapTokens } = useSelectSmarSwapTokens(
    fromTokenToLp.identifier,
    smartSwapTokens,
    "to"
  );
  const toLpTokens = allSmartSwapTokens.filter((t) => t.name.includes('LP'));

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
  
  //
  // ROUTER QUERIES
  //
  useEffect(() => {
    if (router.query.fromToken) {
      setFromTokenToLp({
        identifier: router.query.fromToken.toString(),
      });
      dispatch(setFromToken(router.query.fromToken.toString()));
      dispatch(setFromTokenValue(0));
    }
    if (router.query.toToken) {
      setToTokenToLp({
        identifier: router.query.toToken.toString(),
      });
      dispatch(setToToken(router.query.toToken.toString()));
      dispatch(setToTokenValue(0));
    }
  }, [dispatch, router, swapTokens]);

  //
  // FIELDS
  //
  const handleChangeFromField = (value) => {
    if (!value || value == "") {
      setToTokenToLp({
        identifier: toTokenToLp.identifier,
        decimals: toTokenToLp.decimals,
        value: null,
      });
    }
    if (!fromTokenToLp?.decimals) {
      setFromTokenToLp({
        identifier: fromTokenToLp.identifier,
        decimals: swapTokens.find((token) => token.identifier === fromTokenToLp.identifier).decimals,
        value: value !== "" ? value : null,
      });
    } else {
      setFromTokenToLp({
        identifier: fromTokenToLp.identifier,
        decimals: fromTokenToLp.decimals,
        value: value !== "" ? value : null,
      });
    }
    dispatch(setFromTokenValue(value));
  };

  const handleOnSelectFromToken = (token) => {
    const tokenIdentifier = token.identifier;
    updateURLParams({ fromToken: tokenIdentifier });
    setFromTokenToLp({
      identifier: tokenIdentifier,
      decimals: token.decimals,
      value: fromTokenToLp.value,
    });
    dispatch(setFromToken(tokenIdentifier));
  
  };

  const handleOnSelectToToken = (token) => {
    const tokenIdentifier = token.identifier;
    updateURLParams({ toToken: tokenIdentifier });
    setToTokenToLp({
      identifier: tokenIdentifier,
      decimals: token.decimals,
      value: null,
    });
    dispatch(setToToken(tokenIdentifier));
  };

  const handleMaxFromField = () => {
    const multiplier = Math.pow(10, accountToken.decimals);
    const finalValue = fromTokenToLp.identifier == "EGLD" ?
      BigNumber(accountToken.balance).div(multiplier).minus(egldFee).toString() :
      BigNumber(accountToken.balance).div(multiplier).toString();
    setFromTokenToLp({
      identifier: fromTokenToLp.identifier,
      decimals: accountToken.decimals,
      value: finalValue,
    });
    dispatch(setFromTokenValue(finalValue));
  };

  // const swapFromToken = useAppSelector(selectFromToken);
  // const swapFromTokenValue = useAppSelector(selectFromTokenValue);
  // const swapToToken = useAppSelector(selectToToken);
  // const swapToTokenValue = useAppSelector(selectToTokenValue);

  // console.log("⚠️ ~ fromTokenToLp:", fromTokenToLp.identifier)
  // console.log("⚠️ ~ swapFromToken:", swapFromToken)
  
  // console.log("⚠️ ~ fromTokenToLp Value:", fromTokenToLp.value)
  // console.log("⚠️ ~ swapFromToken Value:", swapFromTokenValue)

  // console.log("⚠️ ~ toTokenToLp:", toTokenToLp.identifier)
  // console.log("⚠️ ~ swapToToken:", swapToToken)

  // console.log("⚠️ ~ toTokenToLp Value:", toTokenToLp.value)
  // console.log("⚠️ ~ swapToToken Value:", swapToTokenValue)


  //
  // CONDITIONS
  //
  const hasEnoughBalance = useMemo(() => {
    const fee = fromTokenToLp.identifier == "EGLD" ? egldFee : 0;
    if (accountToken) {
      if (!fromTokenToLp.value) {
        return true;
      }
      return BigNumber(accountToken.balance).gte(
        BigNumber(fromTokenToLp?.value).times(Math.pow(10, accountToken.decimals)).plus(
          BigNumber(fee * Math.pow(10, 18))
        )
      );
    }
  }, [accountToken, fromTokenToLp]);

  //
  // LP SWAP DATA
  //
  const { data, isLoading, isSapwToLp } = useGetSwapInfo();
  // console.log("⚠️ ~ data:", data)

  useEffect(() => {
    if (data) {
      if (!isSapwToLp) {
        const swapData = data[data.length - 1] as INomalSmartSwap;
        dispatch(
          setToTokenValue(new BigNumber(swapData.amountReceiv).toFixed(4))
        );
      } else {
        const swapData = data[0] as ILpSmartSwap;
        let lpValue = new BigNumber(swapData.lpamounttoreceive).toFixed(4);
        if (Number(lpValue) < 0.00000000001) {
          lpValue = new BigNumber(swapData.lpamounttoreceive).toFixed(25);
        }

        let toValue = lpValue;

        dispatch(setToTokenValue(toValue));
        
        setToTokenToLp({
          identifier: toTokenToLp.identifier,
          decimals: toTokenToLp.decimals,
          value: toValue,
        });
      }
    } else {
      dispatch(setToTokenValue(0));
        
      setToTokenToLp({
        identifier: toTokenToLp.identifier,
        decimals: toTokenToLp.decimals,
        value: null,
      });
    }
  }, [data, dispatch, isSapwToLp, toTokenToLp.decimals, toTokenToLp.identifier]);

  useEffect(() => {
    dispatch(setFromTokenValue(fromTokenToLp.value))
    dispatch(setToTokenValue(toTokenToLp.value))
  }, [dispatch, fromTokenToLp.value, toTokenToLp.value]);

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
            field={fromTokenToLp}
            disableChangeToken={false}
            dollarAmount={
              fromTokenToLp.value ?
              (elrondTokens.find((token) => token.identifier === fromTokenToLp.identifier)?.price
              * BigNumber(fromTokenToLp.value).toNumber()).toString() : ""
            }
            swapTokens={fromTokensToLp}
          />
          <Center position={"absolute"} bottom={"-25px"} zIndex={2}>
            <IconButton
              cursor={"not-allowed"}
              borderRadius={"2.5rem"}
              aria-label="change-positions"
              bg="black.base"
              boxSize={"55px"}
              border={"7px solid"}
              borderColor={"black.baseDark"}
              _hover={{ bg: "black.baseDark" }}
            >
              <NotAllowedIcon color={"gray"} opacity={0.2}/>
            </IconButton>
          </Center>
        </Center>
        <TextField
          sxProps={{borderColor: "transparent" , backgroundColor:"black.base"}}
          label={"You receive"}
          id="to"
          hasMaxButton={false}
          handleClickToken={handleOnSelectToToken}
          field={toTokenToLp}
          isDisabled={true}
          isLoadingAmount={isLoading}
          dollarAmount={
            data &&
              (isSapwToLp
                ? data[0]?.dollarAmount
                : data[data.length - 1]?.dollarAmount)
          }
          swapTokens={toLpTokens.filter((token) => token.identifier !== fromTokenToLp.identifier)}
        />
        {data && 
          <SwapDetailsToLp/>
        }
        <SwapToLpButton
          //bg={"#22F6DC"}
          bg={"main"}
          filter={"brightness(90%)"}
          color="black"
          py="17px"
          width="100%"
          alignContent="center"
          fontWeight={"900"}
          fontSize={"1.2em"}
          style={{ margin: 'auto' , marginTop:'20px'}}
          disableButton={!hasEnoughBalance || !data || isLoading || userAddress=="" ? true : false}
          opacity={!hasEnoughBalance || !data || isLoading || userAddress=="" ? 0.2 : 1}
          isSapwToLp={isSapwToLp}
          swapInfo={data}
          isLoading={isLoading}
          disabledMessage={
            !hasEnoughBalance ? "Insufficient balance" :
            isLoading ? "Loading..." : 
            Number(data?.[0].dollarAmount) > 0 ? "Create LP" :
            fromTokenToLp.value ? "Error" : "Enter an amount"
            // hasEnoughBalance ? "Enter an amount" : "Insufficient balance"
          }
        />
        <FeeInfo fee={formatBalance({ balance: fees.lpFee, decimals: 2 })} whichToken={"LP"}/>
      </Flex>
    </Box>
  );
};

export default LpSwap;