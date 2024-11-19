import { IScFarm2RewardsLeft, IScFarmItem } from "utils/types/sc.interface";

import { toknesID } from "api/net.config";
import { fetchLastRewardedEpoch } from "api/sc/queries/farms2";
import BigNumber from "bignumber.js";
import { selectElrondStats } from "redux/slices/elrond/elrond-slice";
import useSWR from "swr";
import { aprFarms, apyFarms } from "utils/functions/farms";
import { formatNumber } from "utils/functions/formatBalance";
import { useAppSelector } from "utils/hooks/redux";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import useGetMultiplePrices from "utils/hooks/useGetMultiplePrices";
import useGetElrondToken2 from "utils/hooks/useGetElrondToken2";

const  useApr = (
  farm: IScFarmItem,
  multifarmRewardsLeft: IScFarm2RewardsLeft[],
  stakedTokenPrice: number,
  fixedStakedBalance?: string
) => {
  const { tokens: stakingToken } = useGetMultipleElrondTokens([
    farm.farm.stakingToken,
    ...farm.extraPools.map((p) => p.stakedToken),
  ]);
  const [prices] = useGetMultiplePrices([
    farm.farm.stakingToken,
    ...farm.extraPools.map((p) => p.stakedToken),
  ]);


    const { token: rewardToken } = useGetElrondToken2(farm.farm.rewardToken);
  
  const { data: lastRewardedEpoch } = useSWR<number>(
    //@ts-ignore
    farm.farm.farmId,
    fetchLastRewardedEpoch
  );

  const { data: stats } = useAppSelector(selectElrondStats);

  const { tokens: rewardsTokens } = useGetMultipleElrondTokens(
    multifarmRewardsLeft ? multifarmRewardsLeft.map((f) => f.token) : []
  );

  const price = stakedTokenPrice;
  let apr: string = "-";
  let aprNumber = 0;
  if (farm.farm.rewardToken === "") {
    apr = aprFarms(
      prices || price,
      stakingToken,
      lastRewardedEpoch,
      rewardsTokens,
      farm,
      stats,
      "multi",
      multifarmRewardsLeft,
    ) as string;
    aprNumber = aprFarms(
      prices || price,
      stakingToken,
      lastRewardedEpoch,
      rewardsTokens,
      farm,
      stats,
      "multi",
      multifarmRewardsLeft,
      true
    ) as number;
  } else {
    apr = aprFarms(
      prices || price,
      stakingToken,
      lastRewardedEpoch,
      rewardToken,
      fixedStakedBalance
        ? {
            ...farm,
            stakedBalance: new BigNumber(
              farm.stakedBalance
            ).isGreaterThanOrEqualTo(fixedStakedBalance)
              ? farm.stakedBalance
              : Number(fixedStakedBalance),
          }
        : farm,

      stats
    ) as string;
    aprNumber = aprFarms(
      prices || price,
      stakingToken,
      lastRewardedEpoch,
      rewardToken,
      fixedStakedBalance
        ? {
            ...farm,
            stakedBalance: new BigNumber(
              farm.stakedBalance
            ).isGreaterThanOrEqualTo(fixedStakedBalance)
            ? farm.stakedBalance
            : Number(fixedStakedBalance),
          }
        : farm,
      stats,
      undefined,
      undefined,
      true
    ) as number;
  }

  const apy =
    apyFarms(aprNumber) !== "-"
      ? formatNumber(apyFarms(aprNumber)) + " %"
      : "-";

  return {
    apr: apr,
    apy: apy,
  };
};

export default useApr;
