import { Center, Flex, Text } from "@chakra-ui/react";
import { coinInfo } from "utils/constants/farms";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { IProteoFarm } from "utils/types/farms.interface";
import useGetHarvestableRewards from "./useGetHarvestableRewards";
interface IProps {
  pf: IProteoFarm;
}

const HarvestableRewards = ({ pf }: IProps) => {
  const { rewards: allRewards } = useGetHarvestableRewards();

  const rewards = allRewards.filter(
    (r) => r.stakedTokenI === pf.tokenIdentifier
  );
  return (
    <Flex flexDir={"column"}>
      <Text color="white.400" fontSize={"sm"}>
        HARVESTABLE
      </Text>
      <Center mt="2" gap="3" justifyContent={"space-around"} flexDir="column">
        {rewards.map((r) => {
          const tokenLogo = coinInfo[formatTokenI(r.claimableTokenI)]?.logo;
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
