import { Center, Flex, Text } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import bearImage from "assets/logos/bear.png";
import nftImage from "assets/logos/nfttoken.png";
import NextImage from "components/NextImage/NextImage";
import { Fragment } from "react";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
interface IProps {
  userRewardsTokensIdentifiers: string[];
  vertGap?: number;
}

const EarnTokens = ({ userRewardsTokensIdentifiers, vertGap }: IProps) => {
  const { tokens: rewardsTokens } = useGetMultipleElrondTokens(
    userRewardsTokensIdentifiers.slice(0, 5)
  );
  const moreThan5Tokens = userRewardsTokensIdentifiers.length - 5;
  let manualImage = null;

  return (
    <Flex
      flexDir={"column"}
      textAlign="center"
      h="full"
      justifyContent={"center"}
      gap={vertGap || 0}
    >
      <Text color="white.400" textAlign="center">
        Earn
      </Text>
      <Center gap={2}>
        {rewardsTokens.map((rewardsToken) => {
          if (rewardsToken.identifier === toknesID.bear) {
            manualImage = bearImage;
          }
          if (rewardsToken.identifier === toknesID.nfttoken) {
            manualImage = nftImage;
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
        {moreThan5Tokens > 0 && (
          <Text fontSize="sm" fontWeight="bold" color="white.400">
            + {moreThan5Tokens}
          </Text>
        )}
      </Center>
    </Flex>
  );
};

export default EarnTokens;
