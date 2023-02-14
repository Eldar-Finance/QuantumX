import { Accordion } from "@chakra-ui/react";
import { IFarmWithTvl } from "components/Farms/FarmsCard/FarmsCard";
import { useRouter } from "next/dist/client/router";
import { ReactNode, useEffect, useState } from "react";
import { selectMultiFarms2RewardsLeft } from "redux/slices/farms2/farms2-slice";
import { getSortedFarm } from "utils/functions/farms";
import { useAppSelector } from "utils/hooks/redux";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import useGetMultiplePrices from "utils/hooks/useGetMultiplePrices";
import {
  IScFarmItem,
  IScUserFarmInfo,
  IScUserFarmRewards,
} from "utils/types/sc.interface";
import Farms2Item from "../FarmItem/FarmItem";

interface IProps {
  othersArr?: {
    allFarms: IScFarmItem[];
    userFarmInfo: IScUserFarmInfo[];
    userFarm2Rewards: IScUserFarmRewards[];
  };
  isPool?: boolean;
  disableIds?: number[];
  disableComponent: ReactNode;
  maxStakingAmount?: number;
}

const FarmAccordion = ({
  isPool,
  othersArr = null,
  disableIds,
  disableComponent,
  maxStakingAmount,
}: IProps) => {
  const router = useRouter();
  const [accordionIndex, setAccordionIndex] = useState<number[]>([]);
  const { data: generalFarmsData } = useAppSelector(
    (state) => state.proteo.generalInfoApp
  );
  const { data: multifarmRewardsLeft } = useAppSelector(
    selectMultiFarms2RewardsLeft
  );

  const [tokenPrices] = useGetMultiplePrices(
    othersArr.allFarms.map((f) => f.farm.stakingToken)
  );

  const { tokens } = useGetMultipleElrondTokens(
    othersArr.allFarms.map((f) => f.farm.stakingToken)
  );

  useEffect(() => {
    if (router.query.index) {
      setAccordionIndex([parseInt(router.query.index as string)]);
    }
  }, [router]);

  const handleChangePoolIndex = (indeces: number[]) => {
    setAccordionIndex(indeces);
  };

  let farmStored: IFarmWithTvl[] = getSortedFarm(
    tokenPrices,
    tokens,
    [],
    othersArr,
    generalFarmsData
  );

  return (
    <Accordion
      allowMultiple
      borderRadius={"xl"}
      overflow="hidden"
      w="full"
      index={accordionIndex}
      onChange={handleChangePoolIndex}
    >
      {farmStored.map((farm) => {
        if (farm.type === "farms2") {
          if (!farm.farm.farm.farmId) return null;
          return (
            <Farms2Item
              key={farm.farm.farm.farmId}
              farm={farm.farm}
              tvl={farm.totalLocked}
              farmUserInfo={othersArr.userFarmInfo.find((userFarm) => {
                return userFarm.farmId === farm.farm.farm.farmId;
              })}
              farmUserRewards={othersArr.userFarm2Rewards.filter((userFarm) => {
                return userFarm.farmId === farm.farm.farm.farmId;
              })}
              stakedTokenPrice={farm.stakedTokenPrice}
              isPool={isPool}
              logoSize={isPool ? 45 : 27}
              multifarmRewardsLeft={
                multifarmRewardsLeft.find(
                  (mfr) => mfr.farmId === farm.farm.farm.farmId
                )?.rewardsLeft || []
              }
              disable={Boolean(
                disableIds?.find((id) => id === farm.farm.farm.farmId)
              )}
              disableComponent={disableComponent}
              maxStakingAmount={maxStakingAmount}
            />
          );
        }
      })}
    </Accordion>
  );
};

export default FarmAccordion;
