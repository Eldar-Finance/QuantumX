import { Box, Center, Flex, IconButton } from "@chakra-ui/react";

import SwapButton from "../SwapButton/SwapButton";
import TextField from "../TextField/TextField";

import BigNumber from "bignumber.js";
import { ExchangeIcon } from "components/Icons/ui";
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
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { ILpSmartSwap, INomalSmartSwap } from "utils/types/others.interface";
import useGetSwapInfo from "views/Swap/hooks/useGetSwapInfo";
import SwapDetails from "../SwapDetails/SwapDetails";

const SwapCard = () => {
  const fromToken = useAppSelector(selectFromField);
  const toToken = useAppSelector(selectToField);
  const dispatch = useAppDispatch();

  const handleChangeFromField = (token) => {
    dispatch(setFromTokenValue(token));
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
        const swapData = data[data.length - 1] as ILpSmartSwap;
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
    dispatch(setFromToken(token.identifier));
  };
  const handleOnSelectToToken = (token) => {
    dispatch(setToToken(token.identifier));
  };
  const handleExchangeFields = () => {
    dispatch(excahngeFields());
  };
  const handleMaxFromField = (amount) => {
    dispatch(setFromTokenValue(amount));
  };

  return (
    <Flex
      width={"full"}
      flexDir={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      <Box
        maxWidth={"500px"}
        width={"full"}
        mb={0}
        borderRadius="30px"
        position="relative"
        pt={5}
      >
        <Box>
          <Flex flexDir={"column"} width={"full"}>
            <Center flexDir={"column"} position="relative">
              <TextField
                label={"You send"}
                id="from"
                isMaxToken
                onChange={(e) => handleChangeFromField(e.target.value)}
                handleClickToken={handleOnSelectFromToken}
                onClickMaxtoken={handleMaxFromField}
                field={fromToken}
                disableChangeToken={isSapwToLp}
              />
              <Center position={"absolute"} bottom={"-20px"} zIndex={2}>
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
              label={"You receive"}
              id="to"
              handleClickToken={handleOnSelectToToken}
              field={toToken}
              sxProps={{
                marginBottom: "15px",
              }}
              // @ts-ignore
              disabled={true}
              isLoadingAmount={isLoading}
            />
            {toToken.token && (
              <Flex justifyContent={"flex-end"} mt={-2} color="#24918a"></Flex>
            )}

            <SwapDetails />

            <SwapButton
              bg={"black.dark"}
              color="main"
              py="20px"
              swapInfo={data}
              isSapwToLp={isSapwToLp}
              // disableButton={disableButton}
            />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default SwapCard;
