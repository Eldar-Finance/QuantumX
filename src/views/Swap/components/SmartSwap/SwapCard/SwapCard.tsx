import { Box, Center, Flex, Heading, IconButton, Text } from "@chakra-ui/react";

import SwapButton from "../SwapButton/SwapButton";
import TextField from "../TextField/TextField";

import BigNumber from "bignumber.js";
import { ExchangeIcon } from "components/Icons/ui";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { FetchWhitelistedTokens } from "redux/slices/smartSwaps/funcs";
import {
  excahngeFields,
  selectFromField,
  selectToField,
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


const SwapCard = () => {
  const fromToken = useAppSelector(selectFromField);
  const toToken = useAppSelector(selectToField);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isNumberEntered, setIsNumberEntered] = useState(false);

  const handleChangeFromField = (value) => {
    // Update state based on whether the input is a valid number
    setIsNumberEntered(!isNaN(value) && value.trim() !== '');

    // Existing logic in your handleChangeFromField
    dispatch(setFromTokenValue(value));
  };

  const { data, isLoading, isSapwToLp } = useGetSwapInfo();

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
      }
    }
  }, [data, dispatch, isSapwToLp]);
  useEffect(() => {
    dispatch(FetchWhitelistedTokens());
  }, [dispatch]);

  const handleOnSelectFromToken = (token) => {
    const fromToken = token.identifier;
    updateURLParams({ fromToken });
    dispatch(setFromToken(token.identifier));
  };
  const handleOnSelectToToken = (token) => {
    const toToken = token.identifier;
    updateURLParams({ toToken });
    dispatch(setToToken(token.identifier));
  };
  const handleExchangeFields = () => {
    dispatch(excahngeFields());
  };
  const handleMaxFromField = (amount) => {
    dispatch(setFromTokenValue(amount));
  };

  useEffect(() => {
    if (router.query.fromToken) {
      dispatch(setFromToken(router.query.fromToken as string));
    }
    if (router.query.toToken) {
      dispatch(setToToken(router.query.toToken as string));
    }
  }, [dispatch, router]);

  return (
    <Flex
      width={"full"}
      flexDir={"column"}
      justifyContent={"flex-start"}
      alignItems={"left"}
    >
      <Heading style={{ marginLeft:'25px' }} fontSize={"l"}>
        Swap
      </Heading>

      <Box
        maxWidth={"500px"}
        width={"full"}
        mb={0}
        borderRadius="30px"
        position="relative"
        pt={2}
      >
        <Box>
          <Flex style={{backgroundColor:'#121212',borderRadius:'30px'}} flexDir={"column"} width={"full"}>
            <Center style={{borderRadius:'20px'}} flexDir={"column"} position="relative">
              <TextField
              sxProps={{border:'10px solid #121212',backgroundColor:'#242526'}}
                label={"You send"}
                id="from"
                isMaxToken
                onChange={(e) => handleChangeFromField(e.target.value)}
                handleClickToken={handleOnSelectFromToken}
                onClickMaxtoken={handleMaxFromField}
                field={fromToken}
                disableChangeToken={isSapwToLp}
                dollarAmount={
                  data &&
                  (isSapwToLp ? data[1]?.dollarAmount : data[0]?.dollarAmount)
                }
              />
              <Center  position={"absolute"} bottom={"-20px"} zIndex={2}>
                <IconButton
                  onClick={handleExchangeFields}
                  borderRadius={"1.5rem"}
                  aria-label="change-positions"
                  bg="main"
                  boxSize={"50px"}
                  disabled={isSapwToLp}
                >
                  <ExchangeIcon />
                  {/* {positionNormal ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />} */}
                </IconButton>
              </Center>
            </Center>
            <TextField
            sxProps={{border:'10px solid #121212',backgroundColor:'#242526', marginBottom:'25px'}}
              label={"You receive"}
              id="to"
              handleClickToken={handleOnSelectToToken}
              field={toToken}
              // @ts-ignore
              disabled={true}
              isLoadingAmount={isLoading}
              dollarAmount={
                data &&
                (isSapwToLp
                  ? data[0]?.dollarAmount
                  : data[data.length - 1]?.dollarAmount)
              }
            />
            {toToken.token && (
              <Flex justifyContent={"flex-end"} mt={-2} color="#24918a"></Flex>
            )}

          {isNumberEntered && (
                  <SwapDetails />
                )}
            <SwapButton
              bg={"black.dark"}
              color="main"
              py="15px"
              width="60%"
              alignContent="center"
              swapInfo={data}
              isSapwToLp={isSapwToLp}
              // disableButton={disableButton}
              style={{ margin: 'auto' , marginTop:'40px'}}
            />

            <FeeInfo />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default SwapCard;
