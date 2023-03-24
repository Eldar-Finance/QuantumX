import { Flex, Text } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import Card from "components/Card/Card";
import {
  selectConvertInfo,
  selectToTokenDust,
} from "redux/slices/moondustx/moondustx-slice";
import { formatBalance, formatNumber } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppSelector } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import { protocolFee } from "views/MoonDustX/utils/contants";

const ConvertInfo = () => {
  const toTokenToConvert = useAppSelector(selectToTokenDust);
  const { token } = useGetElrondToken(toTokenToConvert);
  const selectedTokens = useAppSelector(selectConvertInfo);
  const totalAmountOfTokens = selectedTokens.reduce((acc, cur) => {
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
        <Text>Minimum {formatTokenI(toTokenToConvert)} to receive</Text>
        <Flex flexDir={"column"} alignItems="flex-end">
          <Text fontWeight="600">
            {formatBalance({
              balance: totalAmountOfTokens,
              decimals: token.decimals,
            })}{" "}
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
        <Text>Protocol Fee</Text>
        <Text color={"GrayText"} fontWeight="600">
          {protocolFee} %
        </Text>
      </Flex>
    </Card>
  );
};

export default ConvertInfo;
