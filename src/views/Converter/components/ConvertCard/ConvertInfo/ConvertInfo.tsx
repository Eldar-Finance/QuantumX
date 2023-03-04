import { Flex, Text } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import Card from "components/Card/Card";
import { selectConvertInfo } from "redux/slices/converter/converter-slice";
import { formatBalance, formatNumber } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppSelector } from "utils/hooks/redux";
import {
  protocolFee,
  protocolFeeToken,
  toTokenToConvert,
} from "views/Converter/utils/contants";

const ConvertInfo = () => {
  const selectedTokens = useAppSelector(selectConvertInfo);
  const totalRARE = selectedTokens.reduce((acc, cur) => {
    return (
      acc +
      new BigNumber(cur.data[cur.data.length - 1].amountReceivDec).toNumber()
    );
  }, 0);

  const totalDollar = selectedTokens.reduce((acc, cur) => {
    return (
      acc + new BigNumber(cur.data[cur.data.length - 1].dollarAmount).toNumber()
    );
  }, 0);

  return (
    <Card as={Flex} p={8} rounded="xl" w="full" flexDir={"column"} mt={8}>
      <Flex
        justifyContent={"space-between"}
        mb={4}
        fontSize={{ xs: "14px", md: "md" }}
      >
        <Text>Minimum RARE to receive</Text>
        <Flex flexDir={"column"} alignItems="flex-end">
          <Text fontWeight="600">
            {formatBalance({ balance: totalRARE, decimals: 18 })}{" "}
            {formatTokenI(toTokenToConvert)}
          </Text>
          <Text color={"GrayText"} fontSize="sm" fontWeight="600">
            ≈ ${formatNumber(totalDollar)}
          </Text>
        </Flex>
      </Flex>
      <Flex
        justifyContent={"space-between"}
        fontSize={{ xs: "14px", md: "md" }}
      >
        <Text>Protocol Fee for Burn</Text>
        <Text color={"GrayText"} fontWeight="600">
          {protocolFee} {formatTokenI(protocolFeeToken)}
        </Text>
      </Flex>
    </Card>
  );
};

export default ConvertInfo;
