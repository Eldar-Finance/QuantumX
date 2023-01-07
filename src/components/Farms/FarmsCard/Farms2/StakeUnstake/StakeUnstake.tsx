import { Center, Flex, Text } from "@chakra-ui/react";
import { getNetworkStats } from "api/rest/elrondApi/network";
import ActionButton from "components/ActionButton/ActionButton";
import dynamic from "next/dynamic";
import { useState } from "react";
import useSWR from "swr";
import { formatTokenI } from "utils/functions/tokens";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import { IScFarmItem, IScUserFarmInfo } from "utils/types/sc.interface";

const StakeModal: any = dynamic(() => import("./StakeModal"));
const UnstakeModal: any = dynamic(() => import("./UnstkeModal"));

interface IProps {
  farm: IScFarmItem;
  userFarmItem: IScUserFarmInfo;
  isPool?: boolean;
}

const StakeUnstake = ({ farm, userFarmItem, isPool }: IProps) => {
  const [openStake, setOpenStake] = useState(false);
  const [openUnstakeStake, setOpenUnstakeStake] = useState(false);
  const { token: rewardsToken } = useGetElrondToken(farm.farm.rewardToken);
  const { token: stakingToken } = useGetElrondToken(farm.farm.stakingToken);
  const { data: statsRes } = useSWR("/stats", getNetworkStats);

  const currentEpoch = statsRes?.data?.epoch;

  let disableUnstake = false;
  const epochDiffrence = userFarmItem?.unboundingEpoch
    ? currentEpoch - userFarmItem.unboundingEpoch
    : 777;
  if (epochDiffrence <= 0 || userFarmItem?.stakedBalance === 0) {
    disableUnstake = true;
  }

  let hasuserStaked = userFarmItem?.stakedBalance > 0;

  return (
    <Flex h="full" flexDir={"column"}>
      <Text color="white.400">
        STAKE {formatTokenI(farm.farm.stakingToken)} {!isPool && "LP"}
      </Text>
      <Flex mt="2" gap="3" flex={1} alignItems="center">
        <ActionButton
          onClick={() => setOpenStake((s) => !s)}
          variant={"outline"}
          w="full"
          maxW={"500px"}
        >
          STAKE {!isPool && "LP"}
        </ActionButton>
        <Center flex="1" flexDir={"column"}>
          <ActionButton
            onClick={() => setOpenUnstakeStake((s) => !s)}
            disabled={disableUnstake}
          >
            UNSTAKE
          </ActionButton>
          {hasuserStaked && disableUnstake && epochDiffrence !== 777 && (
            <Text fontSize={"smaller"} mt={1}>
              {Math.abs(epochDiffrence)} days remaining to unstake
            </Text>
          )}
        </Center>
      </Flex>
      {openStake && (
        <StakeModal
          farm={farm}
          isOpen={openStake}
          onClose={() => setOpenStake((s) => !s)}
          token={stakingToken}
          isPool={isPool}
        />
      )}

      {openUnstakeStake && (
        <UnstakeModal
          token={stakingToken}
          userFarmItem={userFarmItem}
          farm={farm}
          isPool={isPool}
          isOpen={openUnstakeStake}
          onClose={() => setOpenUnstakeStake((s) => !s)}
        />
      )}
    </Flex>
  );
};

export default StakeUnstake;
