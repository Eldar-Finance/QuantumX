import { Box, Center, Flex, Link, Text } from "@chakra-ui/react";
import { getNetworkStats } from "api/rest/elrondApi/network";
import ActionButton from "components/ActionButton/ActionButton";
import dynamic from "next/dynamic";
import { useState } from "react";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import useSWR from "swr";
import { getBigerTime } from "utils/functions/time";
import { formatTokenI } from "utils/functions/tokens";
import { useAppSelector } from "utils/hooks/redux";
import useCountDown from "utils/hooks/useCountDown";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import useGetQuantumxFarmsFees from "utils/hooks/useGetQuantumxFarmsFees";
import { IScFarmItem, IScUserFarmInfo } from "utils/types/sc.interface";
import useIsBearFarm from "views/Pools/hooks/useIsBearFarm";
import useCanUsePool7 from "views/Pools/hooks/useIsSrbStaker";

const StakeModal: any = dynamic(() => import("./StakeModal"));
const UnstakeModal: any = dynamic(() => import("./UnstkeModal"));

interface IProps {
  farm: IScFarmItem;
  userFarmItem: IScUserFarmInfo;
  isPool?: boolean;
  isBearly?: boolean;
}

const useGetFarmTimeForUnstake = (statsRes, userFarmItem) => {
  const currentEpoch = statsRes?.data?.epoch;
  const roundsPerEpoch = statsRes?.data?.roundsPerEpoch;
  const roundsPassed = statsRes?.data?.roundsPassed;
  const remainingRounds =
    roundsPerEpoch && roundsPassed ? roundsPerEpoch - roundsPassed : 0;
  const remainingSeconds = remainingRounds * 6;
  const epochDiffrence = userFarmItem?.unboundingEpoch
    ? currentEpoch - userFarmItem.unboundingEpoch
    : 777;

  const today = new Date();
  const unstakeDate = new Date(
    today.getTime() +
      remainingSeconds * 1000 +
      Math.abs(epochDiffrence) * 86400000
  );

  const [countdownTimer] = useCountDown(
    Math.floor(unstakeDate.getTime() / 1000),
    undefined,
    true
  );
  const { days, hours, mins, secs } = countdownTimer;
  const biggerTime = getBigerTime(days, hours, mins, secs);

  return biggerTime;
};

const StakeUnstake = ({ farm, userFarmItem, isPool, isBearly }: IProps) => {
  const [openStake, setOpenStake] = useState(false);
  const [openUnstakeStake, setOpenUnstakeStake] = useState(false);
  const { token: stakingToken } = useGetElrondToken(farm.farm.stakingToken);
  const { data: statsRes } = useSWR("/stats", getNetworkStats);
  const { isSrbStaker } = useCanUsePool7();
  const address = useAppSelector(selectUserAddress);
  const currentEpoch = statsRes?.data?.epoch;
  const { farmFee } = useGetQuantumxFarmsFees(farm.farm.farmId);
  const isAFarmBoost = useIsBearFarm(farm);

  const epochDiffrence = userFarmItem?.unboundingEpoch
    ? currentEpoch - userFarmItem.unboundingEpoch
    : 777;

  const timeToUnstake = useGetFarmTimeForUnstake(statsRes, userFarmItem);

  let disableUnstake = false;

  if (
    (epochDiffrence <= 0 && farmFee?.earlyUnbondingFee === 0) ||
    Number(userFarmItem?.stakedBalance) === 0 ||
    (!isSrbStaker && farm.farm.farmId === 7)
  ) {
    // if user is creator not disable unstake
    disableUnstake = true && address !== farm.farm.creator;
  }
  let hasuserStaked = Number(userFarmItem?.stakedBalance) > 0;

  return (
    <Flex h="full" flexDir={"column"} w="full">
      <Text color="white.400">
        STAKE {formatTokenI(farm.farm.stakingToken)} {!isPool && "LP"}{" "}
        {isAFarmBoost && (
          <Box as="span" color="white">
            <Link href={"https://xoxno.com/collection/SRB-61daf7"} isExternal>
              (Get 10% Boost by Staking a 🐻SRB NFT)
            </Link>
          </Box>
        )}
      </Text>
      <Flex mt="2" gap="3" flex={1} alignItems="center" w="full">
        <ActionButton
          onClick={() => setOpenStake((s) => !s)}
          variant={"outline"}
          w="full"
          maxW={"50%"}
          disabled={!isSrbStaker && farm.farm.farmId === 7}
        >
          STAKE {!isPool && "LP"}{" "}
        </ActionButton>
        <Center flex="1" flexDir={"column"} w="full" maxW={"50%"}>
          <ActionButton
            onClick={() => setOpenUnstakeStake((s) => !s)}
            disabled={disableUnstake}
            w={isBearly ? "full" : { xs: "full", md: "50%" }}
          >
            UNSTAKE
          </ActionButton>
        </Center>
      </Flex>
      <Flex w="full" justifyContent={"center"} mt={3}>
        {hasuserStaked && disableUnstake && epochDiffrence !== 777 && (
          <Text fontSize={"smaller"} mt={1} color="darkgray">
            {timeToUnstake} remaining to unstake
          </Text>
        )}
        {epochDiffrence <= 0 && farmFee?.earlyUnbondingFee > 0 && (
          <Text fontSize={"sm"} color="darkgray" mt={1}>
            {timeToUnstake} remaining to unstake with 0% penalty
          </Text>
        )}
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
          epochDiffrence={epochDiffrence}
        />
      )}
    </Flex>
  );
};

export default StakeUnstake;
