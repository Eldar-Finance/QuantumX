import { Box, Flex, Stack, Text } from "@chakra-ui/react";

import Image from "next/legacy/image";
import {
  formatBalance,
  formatBalanceDolar,
  formatPrecision,
} from "utils/functions/formatBalance";
import { numberWithCommas } from "utils/functions/numbers";

export const tokenColumns = [
  {
    Header: "Coin",
    accessor: "ticker",
    Cell: ({ row }) => {
      const token = row.original;
      return (
        <Stack direction="row">
          <Box width={"30px"} height={"30px"}>
            {token.assets?.img ? (
              token.assets?.img
            ) : (
              <Box borderRadius={"full"} width="30px" height="30px">
                <Image
                  layout="intrinsic"
                  width={30}
                  height={30}
                  src={token.assets.svgUrl}
                  alt={token.name}
                />
              </Box>
            )}
          </Box>
          <Text
            fontSize={{ xs: "sm", md: "18px" }}
            fontWeight="500"
            textTransform={"uppercase"}
            display={"flex"}
            alignItems={"center"}
          >
            {token.ticker}
          </Text>
        </Stack>
      );
    },
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: ({ row }) => {
      const token = row.original;

      return (
        <Flex
          fontSize={{ xs: "sm", md: "18px" }}
          display={"flex"}
          width={"max-content"}
          alignItems={"center"}
          fontWeight="500"
        >
          {token.price ? (
            <>${numberWithCommas(formatPrecision(token.price))}</>
          ) : (
            <Box mr={"5px"}>-$</Box>
          )}
        </Flex>
      );
    },
  },
  {
    Header: "Holdings",
    accessor: "tokenBalance",
    Cell: ({ row }) => {
      const token = row.original;
      return (
        <Flex
          fontSize={{ xs: "sm", md: "18px" }}
          flexDir={"column"}
          textAlign={"left"}
          fontWeight="500"
          // justifyContent={{ xs: "start", lg: "center" }}
        >
          <Flex
            textAlign={"right"}
            flexWrap={"nowrap"}
            justifyContent={"flex-start"}
            mb="2px"
          >
            <Box marginRight={"5px"}>{formatBalance(token)}</Box>
            <Box>{token.ticker}</Box>
          </Flex>
          {token.price && (
            <Box
              textAlign={"left"}
              fontWeight="400"
              color="white.400"
              fontSize={"14px"}
            >
              ${formatBalanceDolar(token, token.price)}
            </Box>
          )}
        </Flex>
      );
    },
  },
];
