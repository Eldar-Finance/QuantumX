import { Flex, Image, Text } from "@chakra-ui/react";

import { formatPrecision } from "utils/functions/formatBalance";
import { numberWithCommas } from "utils/functions/numbers";
import { getDcaAmount } from "views/Dca/funcs";

const RowItem = ({ token, egldAmount }) => {
  return (
    <Flex
      position={"relative"}
      justifyContent="space-between"
      mb={1}
      px={"20px"}
      py={"10px"}
      alignItems={"center"}
      borderRadius="10px"
      width={"full"}
      bg="black.baseDark"
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
          <Text fontSize={{ xs: "md", md: "xl" }}>{token.token}</Text>
        </Flex>
      </Flex>
      <Text fontWeight={"bold"} fontSize={{ xs: "md", md: "xl" }}>
        ≈{" "}
        {numberWithCommas(
          formatPrecision(getDcaAmount(egldAmount, token, true))
        )}{" "}
        {token.token}
      </Text>
    </Flex>
  );
};

export default RowItem;
