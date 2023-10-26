import { Box, Center, Flex, Link, Text, Tooltip, VStack } from "@chakra-ui/react";
import { getNetworkStats } from "api/rest/elrondApi/network";
import ActionButton from "components/ActionButton/ActionButton";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import useSWR from "swr";
import { getBigerTime } from "utils/functions/time";
import { formatTokenI } from "utils/functions/tokens";
import { useAppSelector } from "utils/hooks/redux";
import useCountDown from "utils/hooks/useCountDown";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import useGetQuantumxFarmsFees from "utils/hooks/useGetQuantumxFarmsFees";
import { IScFarmItem, IScUserFarmInfo, IScUserFarmRewards } from "utils/types/sc.interface";
import useIsBearFarm from "views/Pools/hooks/useIsBearFarm";
import useCanUsePool7 from "views/Pools/hooks/useIsSrbStaker";
import MultipleStakeModal from "./MultipleStakeModal";
import MultipleUnstakeModal from "./MultipleUnstakeModal";
import { ToolIcon } from "components/Icons/ui";
import CustomTooltip from "components/CustomTooltip/CustomTooltip";
import useGetEligibleAddresses from "utils/hooks/useGetEligibleAddresses";
import { farmsTobeShutDown } from "views/Farms/constants";

const StakeModal: any = dynamic(() => import("./StakeModal"));
const UnstakeModal: any = dynamic(() => import("./UnstkeModal"));

interface IProps {
  farm: IScFarmItem;
  userFarmItem: IScUserFarmInfo;
  isPool?: boolean;
  isBearly?: boolean;
  farmUserRewards?: IScUserFarmRewards[];
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

const StakeUnstake = ({ farm, userFarmItem, isPool, isBearly, farmUserRewards }: IProps) => {
  const [openStake, setOpenStake] = useState(false);
  const [openUnstakeStake, setOpenUnstakeStake] = useState(false);
  const { token: stakingToken } = useGetElrondToken(farm.farm.stakingToken);
  const { data: statsRes } = useSWR("/stats", getNetworkStats);
  const { isSrbStaker } = useCanUsePool7();
  const address = useAppSelector(selectUserAddress);
  const currentEpoch = statsRes?.data?.epoch;
  const { farmFee } = useGetQuantumxFarmsFees(farm.farm.farmId);
  const isAFarmBoost = useIsBearFarm(farm);

  const shouldUserHarvestWarning = farmUserRewards?.some(
    (reward) => reward.harvestableAmount > 0
  );

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

  const { addresses } = useGetEligibleAddresses();
  const isEligible = addresses.some(provider => provider.address === address);

  const handleClickStake = () => {
    if (
      (isEligible && farm.farm.farmId === 49) || 
      (isSrbStaker && farm.farm.farmId === 7) ||
      (farm.farm.farmId != 49 && farm.farm.farmId != 7) ) {
      setOpenStake((s) => !s);
    }
  };

  return (
    <Flex h="full" flexDir={"column"} w="full">
      <Text color="white.400">
        STAKE {formatTokenI(farm.farm.stakingToken)} {!isPool && "LP"}{" "}
        {isAFarmBoost && (
          <Box as="span" color="white">
            <Link href={"https://xoxno.com/collection/SRB-61daf7"} isExternal>
              (Get 20% Boost by Staking a 🐻SRB NFT)
            </Link>
          </Box>
        )}
      </Text>
      <Flex mt="2" gap="3" flex={1} alignItems="center" w="full">
          <VStack w="full" maxW="50%" position="relative" top={(!isEligible && farm.farm.farmId === 49) ? 4 : 0}>
            <ActionButton
              onClick={handleClickStake}
              variant={"outline"}
              w="full"
              // maxW={"50%"}
              isDisabled={(!isEligible && farm.farm.farmId === 49) || (!isSrbStaker && farm.farm.farmId === 7) || farmsTobeShutDown.includes(farm.farm.farmId)}
              _hover={{bgColor: (!isEligible && farm.farm.farmId === 49) || (!isSrbStaker && farm.farm.farmId === 7) ? "red" : "main",
              color: (!isEligible && farm.farm.farmId === 49) || (!isSrbStaker && farm.farm.farmId === 7) ? "white" : "black"
            }}
            >
              STAKE {!isPool && "LP"}{" "}
            </ActionButton>
            {!isEligible && farm.farm.farmId === 49 &&
            <Text pl={2} placeSelf={"center"} whiteSpace={"nowrap"}>
              ❗️ {" "} Add Liquidity in {" "}
              <Link
                href="https://xexchange.com/liquidity"
                isExternal
                color="main"
              >
                {" "} xExchange
              </Link> 
            </Text>}
          </VStack>
        <Center flex="1" flexDir={"column"} w="full" maxW={"50%"} position={"relative"}>
          <ActionButton
            onClick={() => setOpenUnstakeStake((s) => !s)}
            isDisabled={disableUnstake || shouldUserHarvestWarning}
            w={isBearly ? "full" : { xs: "full", md: "50%" }}
          >
            UNSTAKE
          </ActionButton>
          {shouldUserHarvestWarning && 
            <Text color={"yellow.300"} fontSize={"16px"} position={"absolute"} top={{sm: "42px", md: "-35px"}} right={{sm: "5px", md: "75px"}} whiteSpace={"nowrap"}>
              ⚠️ {" "} Harvest your rewards before unstaking.
            </Text>
          }
        </Center>
      </Flex>
      <Flex w="full" justifyContent={"center"} mt={2}>
        {hasuserStaked && disableUnstake && epochDiffrence !== 777 && (
          <Text fontSize={"md"} mt={1} color="darkgray">
            ⚠️ {" "} {timeToUnstake} remaining to unstake
          </Text>
        )}
        {epochDiffrence <= 0 && farmFee?.earlyUnbondingFee > 0 && (
          <Text fontSize={"md"} color="darkgray" mt={1}>
            ⚠️ {" "} {timeToUnstake} remaining to unstake with 0% penalty
          </Text>
        )}
      </Flex>
      {openStake &&
        (farm?.extraPools?.length > 0 ? (
          <MultipleStakeModal
            farm={farm}
            isOpen={openStake}
            onClose={() => setOpenStake((s) => !s)}
            token={stakingToken}
            isPool={isPool}
          />
        ) : (
          <StakeModal
            farm={farm}
            isOpen={openStake}
            onClose={() => setOpenStake((s) => !s)}
            token={stakingToken}
            isPool={isPool}
          />
        ))}

      {openUnstakeStake &&
        (farm?.extraPools?.length > 0 ? (
          <MultipleUnstakeModal
            token={stakingToken}
            userFarmItem={userFarmItem}
            farm={farm}
            isPool={isPool}
            isOpen={openUnstakeStake}
            onClose={() => setOpenUnstakeStake((s) => !s)}
            epochDiffrence={epochDiffrence}
          />
        ) : (
          <UnstakeModal
            token={stakingToken}
            userFarmItem={userFarmItem}
            farm={farm}
            isPool={isPool}
            isOpen={openUnstakeStake}
            onClose={() => setOpenUnstakeStake((s) => !s)}
            epochDiffrence={epochDiffrence}
          />
        ))}
    </Flex>
  );
};

export default StakeUnstake;
