import { Text } from "@chakra-ui/react";
import { formatPrecision, getRealBalance } from "lib/formatBalance";
import { numberWithCommas } from "lib/numbers";
import React from "react";

const UnlockedLiquidity = ({ unlocked, deciamls }) => {
  return (
    <Text textAlign={"right"} w="full" mb={6}>
      Unlocked Liquidity:{" "}
      {numberWithCommas(formatPrecision(getRealBalance(unlocked, deciamls)))}
    </Text>
  );
};

export default UnlockedLiquidity;
