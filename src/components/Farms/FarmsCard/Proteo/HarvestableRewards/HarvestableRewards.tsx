import { Center, Flex, Text } from "@chakra-ui/react";
import { coinInfo } from "utils/constants/farms";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import useGetHarvestableRewards from "./useGetHarvestableRewards";

const HarvestableRewards = () => {
  const { rewards } = useGetHarvestableRewards();
  return (
    <Flex flexDir={"column"}>
      <Text color="white.400" fontSize={"sm"}>
        HARVESTABLE
      </Text>
      <Center mt="2" gap="3" justifyContent={"space-around"} flexDir="column">
        {rewards.map((r) => {
          const tokenLogo = coinInfo[formatTokenI(r.claimableTokenI)]?.logo;
          console.log("tokenLogo", tokenLogo);

          const decimals =
            coinInfo[formatTokenI(r.claimableTokenI)]?.dedecimals;
          return (
            <Flex gap="2" alignItems={"center"} key={r.claimableTokenI}>
              <Text>
                {formatBalance({
                  balance: r.claimableAmount,
                  decimals: decimals,
                })}
              </Text>{" "}
              {tokenLogo}
            </Flex>
          );
        })}
      </Center>
    </Flex>
  );
};

export default HarvestableRewards;
