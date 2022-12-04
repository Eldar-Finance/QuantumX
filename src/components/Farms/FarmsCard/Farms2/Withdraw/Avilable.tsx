import { Box, Center, Flex, Text } from "@chakra-ui/react";
import zpayWegldImg from "assets/logos/zpaywegld.png";
import ActionButton from "components/ActionButton/ActionButton";
import NextImage from "components/NextImage/NextImage";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import { IScFarmItem } from "utils/types/sc.interface";

interface IProps {
  farm: IScFarmItem;
}

const Avilable = ({ farm }: IProps) => {
  const { token: rewardsToken } = useGetElrondToken(farm.farm.rewardToken);

  return (
    <Box>
      <Flex w="full" justifyContent={"space-between"}>
        <Text color="white.400">Avilable to withdraw</Text>
        <Flex alignItems={"center"} gap={2}>
          <Text>89</Text>
          {<NextImage alt="" src={zpayWegldImg} width={27} />}
        </Flex>
      </Flex>
      <Center mt="2">
        <ActionButton>WITHDRAW</ActionButton>
      </Center>
    </Box>
  );
};

export default Avilable;
