import { Center, Flex, Text } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import bearImage from "assets/logos/bear.png";
import NextImage from "components/NextImage/NextImage";
import { Fragment } from "react";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import { IScUserFarmRewards } from "utils/types/sc.interface";
interface IProps {
  userRewards: IScUserFarmRewards[];
}

const EarnTokens = ({ userRewards }: IProps) => {
  const { tokens: rewardsTokens } = useGetMultipleElrondTokens(
    userRewards.map((r) => r.rewardToken)
  );

  let manualImage = null;

  return (
    <Flex flexDir={"column"} textAlign="center">
      <Text color="white.400" mb={2} textAlign="center">
        Earn
      </Text>
      <Center gap={2}>
        {rewardsTokens.map((rewardsToken) => {
          if (rewardsToken === toknesID.bear) {
            manualImage = bearImage;
          }
          return (
            <Fragment key={rewardsToken.identifier}>
              {manualImage ? (
                <NextImage alt="" src={manualImage} height={30} width={30} />
              ) : (
                <>
                  {rewardsToken?.assets?.svgUrl && (
                    <NextImage
                      alt=""
                      src={rewardsToken.assets.svgUrl}
                      height={30}
                      width={30}
                    />
                  )}
                </>
              )}
            </Fragment>
          );
        })}
      </Center>
    </Flex>
  );
};

export default EarnTokens;
