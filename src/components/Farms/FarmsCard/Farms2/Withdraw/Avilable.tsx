import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { BigUIntValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import NextImage from "components/NextImage/NextImage";
import { formatBalance } from "utils/functions/formatBalance";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import { IScFarmItem, IScUserFarmInfo } from "utils/types/sc.interface";

interface IProps {
  farm: IScFarmItem;
  userFarmInfo: IScUserFarmInfo;
}

const Avilable = ({ farm, userFarmInfo }: IProps) => {
  const { token: rewardsToken } = useGetElrondToken(farm.farm.rewardToken);
  const handleHarvest = () => {
    scCall("farms2", "harvest", [
      new BigUIntValue(new BigNumber(farm.farm.farmId)),
    ]);
  };
  return (
    <Box>
      <Flex w="full" justifyContent={"space-between"}>
        <Text color="white.400">Available to withdraw</Text>
        <Flex alignItems={"center"} gap={2}>
          <Text>
            {formatBalance({
              balance: userFarmInfo?.harvestableRewards,
              decimals: rewardsToken?.decimals,
            })}
          </Text>
          {rewardsToken?.assets?.pngUrl && (
            <NextImage
              alt=""
              src={rewardsToken.assets.pngUrl}
              width={27}
              height={27}
            />
          )}
        </Flex>
      </Flex>
      <Center mt="2">
        <ActionButton
          onClick={handleHarvest}
          disabled={userFarmInfo?.harvestableRewards === 0}
        >
          HARVEST
        </ActionButton>
      </Center>
    </Box>
  );
};

export default Avilable;
