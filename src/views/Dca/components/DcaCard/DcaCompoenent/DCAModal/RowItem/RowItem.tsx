import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const RowItem = ({ token }) => {
  return (
    <Flex
      position={"relative"}
      justifyContent="space-between"
      mb={1}
      px={3}
      py={1}
      alignItems={"center"}
      borderRadius="10px"
      width={"full"}
    >
      <Flex alignItems={"center"}>
        {token?.assets?.svgUrl ? (
          <Image
            mr={3}
            boxSize={"22px"}
            borderRadius={"full"}
            boxShadow={"rgb(255 255 255 / 8%) 0px 6px 10px"}
            src={token?.assets?.svgUrl || ""}
            alt={token?.assets?.description || ""}
          />
        ) : null}

        <Flex flexDir={"column"} justifyContent="center">
          <Text fontSize="xl">{token.ticker}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RowItem;
