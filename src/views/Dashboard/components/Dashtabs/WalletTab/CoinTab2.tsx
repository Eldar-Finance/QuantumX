import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, Flex, Text } from '@chakra-ui/react';
import { selectUserAddress, selectEgldBalance, selectUserAccountData } from "redux/slices/userAcount/account-slice";
import { fetchEgld, fetchTokens } from "redux/slices/userAcount/funcs";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import useGetTokenPrice from "utils/hooks/useGetTokenPrice";
import { toknesID } from "api/net.config";
import { formatBalance, formatBalanceDolar } from "utils/functions/formatBalance";
import orderBy from "lodash/orderBy";
import { EgldlogoIcon } from "components/Icons/ui";

const CoinTab2 = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  const egldData = useAppSelector(selectEgldBalance);
  const [egldPrice] = useGetTokenPrice(toknesID.egld);
  const tableData = useAppSelector(selectUserAccountData);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (address) {
      dispatch(fetchEgld(address));
      dispatch(fetchTokens(address));
    }
  }, [address, dispatch]);

  useEffect(() => {
    const newData = [];
    tableData.data.forEach((token) => {
      const price = token.identifier === toknesID.usdt || token.identifier === toknesID.busd ? 1 : token.price;
      newData.push({
        tokenBalance: formatBalanceDolar(token, price),
        ...token,
      });
    });

    const orderData = orderBy(newData, ['tokenBalance'], ['desc']);

    const EgldData = {
      tokenBalance: formatBalance(egldData, false, 3),
      identifier: "EGLD",
      name: "EGLD",
      ticker: "EGLD",
      decimals: 18,
      assets: { img: <EgldlogoIcon /> },
      price: egldPrice,
      balance: egldData.balance,
    };

    orderData.unshift(EgldData);
    setData(orderData);
  }, [tableData.data, egldData, egldPrice]);

  // Limit the number of tokens to display to 5
  const displayedTokens = data.slice(0, 5);

  return (
    <>
      <style>
        {`
          .thin-scrollbar::-webkit-scrollbar {
            width: 5px; /* Adjust the width as needed */
          }
          .thin-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1; /* Track color */
          }
          .thin-scrollbar::-webkit-scrollbar-thumb {
            background: #888; /* Thumb color */
          }
          .thin-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555; /* Thumb hover color */
          }
        `}
      </style>
    <Box w="full" maxW={"200px"} mx="auto" maxH="200px" overflowY={"auto"} className="thin-scrollbar">
      <List spacing={3}>
        {displayedTokens.map((token, index) => (
          <ListItem key={index} pb={2} mb={2}>
            <Flex alignItems="center" justifyContent="space-between">
              <Flex alignItems="center">
                <Box mr={3}>{token.assets.img}</Box>
                <Text fontSize={"xs"} fontWeight="bold">{token.name}</Text>
              </Flex>
              <Text marginRight="10px">{token.tokenBalance}</Text>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
    </>
  );
};

export default CoinTab2;
