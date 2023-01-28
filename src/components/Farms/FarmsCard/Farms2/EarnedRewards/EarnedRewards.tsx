import { Center, Flex, Text } from "@chakra-ui/react";
import NextImage from "components/NextImage/NextImage";
import { formatBalance } from "utils/functions/formatBalance";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import {
  IScFarm2RewardsLeft,
  IScUserFarmRewards,
} from "utils/types/sc.interface";

interface IProps {
  userRewards: IScUserFarmRewards[];
  multifarmRewardsLeft: IScFarm2RewardsLeft[];
}

const EarnedRewards = ({ userRewards, multifarmRewardsLeft }: IProps) => {
  const { tokens: rewardsTokens } = useGetMultipleElrondTokens(
    userRewards.map((r) => r.rewardToken)
  );
  console.log("rewardsTokens", rewardsTokens);

  return (
    <Flex flexDir={"column"}>
      <Text color="white.400" fontSize={"sm"}>
        EARNED REWARDS
      </Text>
      {rewardsTokens.map((rewardsToken) => {
        const rewardInfo = userRewards.find(
          (r) => r.rewardToken === rewardsToken.identifier
        );
        console.log("rewardInfo", rewardInfo);

        return (
          <Center
            key={rewardsToken.identifier}
            mt="2"
            gap="3"
            justifyContent={"space-around"}
            flexDir="column"
          >
            <Flex gap="2" alignItems={"center"}>
              <Text>
                {formatBalance({
                  balance: rewardInfo?.earnedAmount || 0,
                  decimals: rewardsToken.decimals,
                })}
              </Text>{" "}
              {rewardsToken?.assets?.svgUrl && (
                <NextImage
                  src={rewardsToken.assets.svgUrl}
                  alt=""
                  height={30}
                  width={30}
                />
              )}
            </Flex>
          </Center>
        );
      })}
    </Flex>
  );
};

export default EarnedRewards;
