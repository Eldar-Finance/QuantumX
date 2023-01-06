import { Center, Flex, Text } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import bearImage from "assets/logos/bear.png";
import NextImage from "components/NextImage/NextImage";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import { IScFarmItem } from "utils/types/sc.interface";
interface IProps {
  farm: IScFarmItem;
}

const EarnTokens = ({ farm }: IProps) => {
  const { token: rewardsToken } = useGetElrondToken(farm.farm.rewardToken);

  let manualImage = null;

  if (farm.farm.rewardToken === toknesID.bear) {
    manualImage = bearImage;
  }
  return (
    <Flex flexDir={"column"} textAlign="center">
      <Text color="white.400" mb={2} textAlign="center">
        Earn
      </Text>
      <Center gap={2}>
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
      </Center>
    </Flex>
  );
};

export default EarnTokens;
