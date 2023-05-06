import { Center, Flex, Text } from "@chakra-ui/react";
import NextImage from "components/NextImage/NextImage";
import nftImage from "assets/logos/nfttoken.png";
import { toknesID } from "api/net.config";
import { formatBalance } from "utils/functions/formatBalance";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import { IScUserFarmRewards } from "utils/types/sc.interface";

interface IProps {
  userRewards: IScUserFarmRewards[];
  multifarmRewardsLeft: string[];
}

const EarnedRewards = ({ userRewards, multifarmRewardsLeft }: IProps) => {
  const { tokens: rewardsTokens } = useGetMultipleElrondTokens(
    multifarmRewardsLeft
  );
  let manualImage = null;

  return (
    <Flex flexDir={"column"}>
      <Text color="white.400" fontSize={"sm"}>
        EARNED REWARDS
      </Text>
      {rewardsTokens.map((rewardsToken) => {

        if (rewardsToken.identifier === toknesID.nfttoken) {
          manualImage = nftImage;
        }

        const rewardInfo = userRewards.find(
          (r) => r.rewardToken === rewardsToken.identifier
        );

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
              {manualImage ? (
                <NextImage alt="" src={manualImage} height={30} width={30} />
              ) : (
                <>
                  {rewardsToken?.assets?.svgUrl && (
                    <NextImage
                      src={rewardsToken.assets.svgUrl}
                      alt=""
                      height={30}
                      width={30}
                    />
                  )}
                </>
              )}
            </Flex>
          </Center>
        );
      })}
    </Flex>
  );
};

export default EarnedRewards;
