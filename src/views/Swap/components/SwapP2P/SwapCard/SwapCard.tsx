import { Box, Center, Flex, IconButton, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import {
  changePositions,
  selectAllowedTokens,
  selectFastSwapTokens,
  selectOffers,
  selectUserOrders,
  setFromToken,
  setFromTokenValue,
  setToToken,
  setToTokenValue,
  updateSwapValues,
} from "redux/slices/fastSwap/fastSwap";

import InfoBox from "../InfoBox/InfoBox";
import SwapButton from "../SwapButton/SwapButton";
import TextField from "../TextField/TextField";

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core";
import { toknesID } from "api/net.config";
import { ExchangeIcon } from "components/Icons/ui";
import { useRouter } from "next/router";
import {
  fetchAllowedTokens,
  fetchAllTokens,
  fetchBalances,
  fetchDefaultFeeA,
  fetchFeesInfo,
  fetchOffers,
} from "redux/slices/fastSwap/funcs";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { formatBalance } from "utils/functions/formatBalance";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import useQuery from "utils/hooks/useQuery";
import ClaimSection from "../ClaimSection/ClaimSection";
import SwapDetails from "../SwapDetails/SwapDetails";

const SwapCard = () => {
  const fromToken = useAppSelector((state) => state.fastSwap.fromToken);
  const toToken = useAppSelector((state) => state.fastSwap.toToken);
  const liquidity = useAppSelector((state) => state.fastSwap.liquidity);
  const { data: allowedTokens } = useAppSelector(selectAllowedTokens);
  const { data: tokens } = useAppSelector(selectFastSwapTokens);
  const address = useAppSelector(selectUserAddress);
  const acc = useGetAccountInfo();
  const userOders = useAppSelector(selectUserOrders);
  const offers = useAppSelector(selectOffers);
  const query = useQuery();
  const router = useRouter();
  const [openInfoBox, setOpenInfoBox] = useState(false);
  /* For the arrow to change from - to */
  const [positionNormal, setPositionNormal] = useState(true);
  const dispatch = useAppDispatch();

  const handleOnChangeFromToken = (e) => {
    dispatch(setFromTokenValue({ value: e.target.value, comeFrom: "input" }));
  };
  const handleOnChangeToToken = (e) => {
    dispatch(setToTokenValue({ value: e.target.value, comeFrom: "input" }));
  };

  const handleClickFromToken = (token) => {
    router.push({
      pathname: "/swap",
      query: { fromToken: token.identifier, toToken: query.get("toToken") },
    });
  };
  const handleClickToToken = (token) => {
    router.push({
      pathname: "/swap",
      query: { toToken: token.identifier, fromToken: query.get("fromToken") },
    });
  };
  const handleMaxToken = () => {
    dispatch(
      setFromTokenValue({ value: formatBalance(fromToken.balance, true) || 0 })
    );
  };
  const handleChangePositions = () => {
    setPositionNormal(!positionNormal);
    dispatch(setToTokenValue(""));
    router.push({
      pathname: "/swap",
      query: {
        toToken: fromToken.token.identifier,
        fromToken: toToken.token.identifier,
      },
    });
    dispatch(changePositions());
  };
  useEffect(() => {
    if (address) {
      dispatch(
        fetchBalances({
          address: address,
          balances: {
            egld: acc.account.balance,
          },
        })
      );
    }
  }, [acc.account.balance, address, allowedTokens, dispatch]);
  useEffect(() => {
    if (allowedTokens.length > 0) {
      dispatch(fetchAllTokens(allowedTokens));
    }
  }, [allowedTokens, dispatch]);

  // const tableData = [];

  useEffect(() => {
    dispatch(fetchAllowedTokens());
    dispatch(fetchFeesInfo());
    dispatch(fetchDefaultFeeA());
  }, [dispatch]);

  useEffect(() => {
    if (tokens.length > 0) {
      const urlFromToken = query.get("fromToken");
      const urlToToken = query.get("toToken");
      const token1 =
        tokens.find(
          (token) => token.identifier === (urlFromToken || toknesID.wegld)
        ) || tokens[1];
      const token2 =
        tokens.find(
          (token) => token.identifier === (urlToToken || "CYBER-489c1c")
        ) || tokens[2];

      if (token1) {
        dispatch(setFromToken(token1));
      }
      if (token2) {
        dispatch(setToToken(token2));
      }
    }
  }, [tokens, query, dispatch]);

  useEffect(() => {
    if (fromToken.token && toToken.token) {
      dispatch(
        fetchOffers({
          token_a_identifier:
            toToken.token.identifier === "EGLD"
              ? toknesID.wegld
              : toToken.token.identifier,
          token_b_identifier:
            fromToken.token.identifier === "EGLD"
              ? toknesID.wegld
              : fromToken.token.identifier,
        })
      );
    }
  }, [dispatch, fromToken.token, toToken.token]);

  useEffect(() => {
    dispatch(updateSwapValues(fromToken.value));
  }, [dispatch, fromToken.value]);
  const disableButton = !fromToken.value;
  const infoBox = userOders.length > 0 && liquidity.data > 0 && openInfoBox;

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
                onChange={handleOnChangeFromToken}
                handleClickToken={handleClickFromToken}
                onClickMaxtoken={handleMaxToken}
                token={fromToken}
                offers={offers}
                borderColored
              />
              <Center position={"absolute"} bottom={"-20px"} zIndex={2}>
                <IconButton
                  onClick={handleChangePositions}
                  borderRadius={"1.5rem"}
                  aria-label="change-positions"
                  bg="main"
                  boxSize={"50px"}
                >
                  <ExchangeIcon />
                  {/* {positionNormal ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />} */}
                </IconButton>
              </Center>
            </Center>
            <TextField
              label={"You receive"}
              id="to"
              onChange={handleOnChangeToToken}
              handleClickToken={handleClickToToken}
              onClickMaxtoken={handleMaxToken}
              token={toToken}
              sxProps={{
                marginBottom: "15px",
              }}
              liquidity={
                <>
                  {toToken.token && (
                    <Text
                      mt={4}
                      fontSize={{ xs: "sm", md: "md" }}
                      color={liquidity.data === 0 && "danger"}
                    >
                      Liquidity : {liquidity.data} {toToken.token.ticker}
                    </Text>
                  )}
                </>
              }
              // @ts-ignore
              disabled={true}
            />
            {toToken.token && (
              <Flex justifyContent={"flex-end"} mt={-2} color="#24918a"></Flex>
            )}

            <SwapDetails />
            <Box mt="25px">
              <Flex
                justifyContent={"center"}
                alignItems="center"
                gap={4}
                onClick={() => setOpenInfoBox((open) => !open)}
                cursor="pointer"
              >
                Swap Analysis{" "}
                {openInfoBox ? (
                  <ChevronUpIcon fontSize={"20px"} />
                ) : (
                  <ChevronDownIcon fontSize={"20px"} />
                )}
              </Flex>
              <InfoBox open={infoBox} />
            </Box>
            <SwapButton
              bg={"black.dark"}
              color="main"
              py="20px"
              disableButton={disableButton}
            />
          </Flex>
        </Box>
      </Box>
      <Box position="relative" w="full">
        <ClaimSection tokenWithDeatils={tokens} />
      </Box>
    </Flex>
  );
};

export default SwapCard;
