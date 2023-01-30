import { ArrowForwardIcon, Icon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";

import Image from "next/legacy/image";
import { useSelector } from "react-redux";
import { selectUserOrders } from "redux/slices/fastSwap/fastSwap";
import { formatPrecision } from "utils/functions/formatBalance";
const OperationsList = () => {
  const userOders = useSelector(selectUserOrders);
  return (
    <Box>
      {userOders.map((order, i) => {
        return (
          <Flex
            key={i}
            justifyContent={"space-between"}
            alignItems="center"
            w="full"
          >
            <Flex>
              <Flex mr={1} alignItems="center">
                {/* <NextImage src={jexImg} alt="jexImg" height={30} /> */}
              </Flex>
              <Flex alignItems="center">
                <Text mr={"2"} fontSize={{ xs: "12px", md: "14px" }}>
                  {formatPrecision(order.spend)}{" "}
                </Text>
                <Image
                  layout="intrinsic"
                  width={15}
                  height={15}
                  src={
                    order.fromToken.token.assets?.svgUrl ||
                    order.fromToken.token.assets?.static.src ||
                    ""
                  }
                  alt={order.fromToken.token.name}
                />
                <Text ml={"1"} fontSize={{ xs: "12px", md: "14px" }}>
                  {order.fromToken.token.ticker}{" "}
                </Text>
              </Flex>
            </Flex>

            <Flex>
              <Icon as={ArrowForwardIcon} />
            </Flex>
            <Flex justifyContent={"flex-end"}>
              <Flex alignItems="center">
                <Text mr={"2"} fontSize={{ xs: "12px", md: "14px" }}>
                  {formatPrecision(order.receive)}{" "}
                </Text>
                <Image
                  layout="intrinsic"
                  width={15}
                  height={15}
                  src={
                    order.toToken.token.assets?.svgUrl ||
                    order.toToken.token.assets?.static.src ||
                    ""
                  }
                  alt={order.toToken.token.name}
                />
                <Text ml={"1"} fontSize={{ xs: "12px", md: "14px" }}>
                  {order.toToken.token.ticker}{" "}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Box>
  );
};

export default OperationsList;
