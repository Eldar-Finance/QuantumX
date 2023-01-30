import { Center, Flex, Text } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import bearImage from "assets/logos/bear.png";
import NextImage from "components/NextImage/NextImage";
import { Fragment } from "react";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
interface IProps {
  userRewardsTokensIdentifiers: string[];
}

const EarnTokens = ({ userRewardsTokensIdentifiers }: IProps) => {
  const { tokens: rewardsTokens } = useGetMultipleElrondTokens(
    userRewardsTokensIdentifiers
  );

  let manualImage = null;

  return (
    <Flex flexDir={"column"} textAlign="center">
      <Text color="white.400" mb={2} textAlign="center">
        Earn
      </Text>
      <Center gap={2}>
        {rewardsTokens.map((rewardsToken) => {
          if (rewardsToken.identifier === toknesID.bear) {
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
                      height={25}
                      width={25}
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
