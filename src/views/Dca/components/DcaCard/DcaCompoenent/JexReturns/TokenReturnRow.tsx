import { Flex, Image, Text } from "@chakra-ui/react";
import { formatPrecision } from "utils/functions/formatBalance";

const TokenReturnRow = ({ token, jp }) => {
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
      maxW="380px"
    >
      <Flex alignItems={"center"}>
        {token?.assets?.svgUrl ? (
          <Image
            mr={3}
            boxSize={"30px"}
            borderRadius={"full"}
            boxShadow={"rgb(255 255 255 / 8%) 0px 6px 10px"}
            src={token?.assets?.svgUrl || ""}
            alt={token?.assets?.description || ""}
          />
        ) : null}

        <Flex flexDir={"column"} justifyContent="center">
          <Text fontSize="xl">{token.name}</Text>
        </Flex>
      </Flex>
      <Text fontWeight={"bold"} fontSize="xl">
        ≈ {formatPrecision(jp.returnValue)}
        {token.ticker}
      </Text>
    </Flex>
  );
};

export default TokenReturnRow;
