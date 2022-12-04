import { Center, Flex, Text } from "@chakra-ui/react";
import NextImage from "components/NextImage/NextImage";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import { IScFarmItem } from "utils/types/sc.interface";

interface IProps {
  farm: IScFarmItem;
}

const EarnTokens = ({ farm }: IProps) => {
  const { token: rewardsToken } = useGetElrondToken(farm.farm.rewardToken);

  return (
    <Flex flexDir={"column"} textAlign="center">
      <Text color="white.400" mb={2} textAlign="center">
        Earn
      </Text>
      <Center gap={2}>
        {rewardsToken?.assets?.pngUrl && (
          <NextImage
            alt=""
            src={rewardsToken.assets.pngUrl}
            height={27}
            width={27}
          />
        )}
      </Center>
    </Flex>
  );
};

export default EarnTokens;
