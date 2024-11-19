import { Accordion } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { selectMultiFarms2RewardsLeft } from "redux/slices/farms2/farms2-slice";
import { getSortedFarm, unparseMultipleFarms } from "utils/functions/farms";
import { useAppSelector } from "utils/hooks/redux";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import useGetMultiplePrices from "utils/hooks/useGetMultiplePrices";
import {
  IScFarmItem,
  IScUserFarmInfo,
  IScUserFarmRewards,
} from "utils/types/sc.interface";
import Farms2Item from "./Farms2Item";

interface IProps {
  othersArr?: {
    allFarms: IScFarmItem[];
    userFarmInfo: IScUserFarmInfo[];
    userFarm2Rewards: IScUserFarmRewards[];
  };
  isPool?: boolean;
}

export interface IFarmWithTvl {
  tokenI;
  totalLocked;
  stakedTokenPrice;
  stakedTokenDecimals;
  type: "proteo" | "farms2";
  farm: any;
}

const FarmsCard = ({ isPool, othersArr = null }: IProps) => {
  const router = useRouter();
  const [accordionIndex, setAccordionIndex] = useState<number[]>([]);

  const { data: multifarmRewardsLeft } = useAppSelector(
    selectMultiFarms2RewardsLeft
  );

  const [tokenPrices] = useGetMultiplePrices(
    unparseMultipleFarms(othersArr.allFarms)
      .map((f) => f.stakedToken)
  );
  
  const { tokens } = useGetMultipleElrondTokens(
    unparseMultipleFarms(othersArr.allFarms)
      .map((f) => f.stakedToken)
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
    othersArr,
  );

  return (
    <Accordion
      allowMultiple
      borderColor={"black.100"}
      borderRadius={"2xl"}
      overflow="hidden"
      w="full"
      index={accordionIndex}
      onChange={handleChangePoolIndex}
    >
      {farmStored.map((farm, i) => {
        if (!farm.farm.farm.farmId) return null;
        return (
          <Farms2Item
            key={i}
            farm={farm.farm}
            tvl={farm.totalLocked}
            farmUserInfoArr={othersArr.userFarmInfo.filter((userFarm) => {
              return userFarm.farmId === farm.farm.farm.farmId;
            })}
            farmUserRewards={othersArr.userFarm2Rewards.filter((userFarm) => {
              return userFarm.farmId === farm.farm.farm.farmId;
            })}
            stakedTokenPrice={farm.stakedTokenPrice}
            isPool={isPool}
            logoSize={isPool ? 40 : 27}
            multifarmRewardsLeft={
              multifarmRewardsLeft.find(
                (mfr) => mfr.farmId === farm.farm.farm.farmId
              )?.rewardsLeft || []
            }
          />
        );
      })}
    </Accordion>
  );
};

export default FarmsCard;
