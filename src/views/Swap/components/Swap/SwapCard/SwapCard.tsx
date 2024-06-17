import { Box, BoxProps, Center, Flex, FlexProps, Heading, IconButton, Text, useEditable } from "@chakra-ui/react";

import SwapButton from "../SwapButton/SwapButton";
import TextField from "../TextField/TextField";

import BigNumber from "bignumber.js";
import { ExchangeIcon } from "components/Icons/ui";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import router, { useRouter } from "next/dist/client/router";
import { PropsWithChildren, use, useEffect, useMemo } from "react";
import { FetchWhitelistedTokens } from "redux/slices/smartSwaps/funcs";
import {
  selectSlippage,
  setFromToken,
  setToToken,
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
import MainSwap from "./MainSwap";
import LpSwap from "./LpSwap";

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


const SwapCard = ({setGraphTokens, setIsNftSwap, setIsMainSwap} : {setGraphTokens: any, setIsNftSwap: any, setIsMainSwap: any}) => {
  const [isNFTLiquidityActive, setIsNFTLiquidityActive] = useState(false);
  const [isLpSwap, setIsLpSwap] = useState(false);

  useEffect(() => {
    if (router.query.toLp == "true") {
      setIsLpSwap(true)
      setIsMainSwap(false)
      setIsNftSwap(false)
      setIsNFTLiquidityActive(false)
    }
  }, [setIsMainSwap, setIsNftSwap]);

  return (
    <Flex
      width="100%" // Set the width to 100% to make it full width
      flexDir="column"
      justifyContent="flex-start"
      alignItems="left"
    >
      <Flex width="100%" mb={1} ml={6} gap={7} zIndex={10} w={"full"}>
        <Heading
          as="h1"
          fontSize={"m"}
          fontWeight={"bold"}
          cursor={"pointer"}
          color={isNFTLiquidityActive || isLpSwap ? "gray" : "highlighted"} // Replace with your active style
          onClick={() => {
            setIsNFTLiquidityActive(false)
            setIsNftSwap(false)
            setIsLpSwap(false)
            setIsMainSwap(true)
            updateURLParams({toLp: null})
            updateURLParams({fromToken: null})
            updateURLParams({toToken: null})
          }}
        >
          Swap
        </Heading>
        <Heading
          as="h1"
          fontSize={"m"}
          fontWeight={"bold"}
          cursor={"pointer"}
          color={!isLpSwap ? "gray" : "highlighted"} // Replace with your active style
          onClick={() => {
            setIsNFTLiquidityActive(false)
            setIsNftSwap(false)
            setIsLpSwap(true)
            setIsMainSwap(false)
            updateURLParams({toLp: "true"})
            updateURLParams({fromToken: null})
            updateURLParams({toToken: null})
          }}
        >
          Create LP
        </Heading>
        <Heading
          as="h1"
          fontSize={"m"}
          fontWeight={"bold"}
          cursor={"pointer"}
          color={!isNFTLiquidityActive ? "gray" : "highlighted"} // Replace with your active style
          onClick={() => {
            setIsNFTLiquidityActive(true)
            setIsNftSwap(true)
            setIsLpSwap(false)
            setIsMainSwap(false)
            updateURLParams({toLp: null})
            updateURLParams({fromToken: null})
            updateURLParams({toToken: null})
          }}
        >
          Sell NFT
        </Heading>
      </Flex>
      <Box
        // maxWidth={"500px"}
        width={"full"}
        mb={0}
        borderRadius="30px"
        position="relative"
        pt={4}
      >
        {isNFTLiquidityActive ? <NFTLiquidityInterface/> :
          isLpSwap ? <LpSwap/> :
          <MainSwap setGraphTokens={setGraphTokens}/>
        }
      </Box>
    </Flex>
  );
};

export default SwapCard;