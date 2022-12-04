import { Center, Flex, Text } from "@chakra-ui/react";
import NextImage from "components/NextImage/NextImage";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import { IScFarmItem } from "utils/types/sc.interface";

interface IProps {
  farm: IScFarmItem;
}

const EarnedRewards = ({ farm }: IProps) => {
  const { token: rewardsToken } = useGetElrondToken(farm.farm.rewardToken);

  return (
    <Flex flexDir={"column"}>
      <Text color="white.400" fontSize={"sm"}>
        EARNED REWARDS
      </Text>
      <Center mt="2" gap="3" justifyContent={"space-around"} flexDir="column">
        <Flex gap="2" alignItems={"center"}>
          <Text>69</Text>{" "}
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
    </Flex>
  );
};

export default EarnedRewards;
