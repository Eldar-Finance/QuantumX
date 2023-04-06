import { IScFarm2RewardsLeft, IScFarmItem } from "utils/types/sc.interface";

import { toknesID } from "api/net.config";
import { fetchLastRewardedEpoch } from "api/sc/queries/farms2";
import { selectElrondStats } from "redux/slices/elrond/elrond-slice";
import useSWR from "swr";
import { aprFarms, apyFarms } from "utils/functions/farms";
import { useAppSelector } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import useGetJexPrice from "utils/hooks/useGetJexPrice";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";

const useApr = (
  farm: IScFarmItem,
  multifarmRewardsLeft: IScFarm2RewardsLeft[],
  stakedTokenPrice: number
) => {
  const { token: stakingToken } = useGetElrondToken(farm.farm.stakingToken);

  const { token: rewardToken } = useGetElrondToken(farm.farm.rewardToken);
  const { data: lastRewardedEpoch } = useSWR<number>(
    //@ts-ignore
    farm.farm.farmId,
    fetchLastRewardedEpoch
  );

  const { data: stats } = useAppSelector(selectElrondStats);
  const { jexPrice } = useGetJexPrice(
    multifarmRewardsLeft.find((r) => r.token === toknesID.jex)?.token
  );
  const { jexPrice: bonezPrice } = useGetJexPrice(
    multifarmRewardsLeft.find((r) => r.token === toknesID.bonez)?.token
  );
  const { tokens: rewardsTokens } = useGetMultipleElrondTokens(
    multifarmRewardsLeft ? multifarmRewardsLeft.map((f) => f.token) : []
  );

  const price = stakedTokenPrice;
  let apr: string = "-";
  let aprNumber = 0;
  if (farm.farm.rewardToken === "") {
    apr = aprFarms(
      price,
      stakingToken,
      lastRewardedEpoch,
      rewardsTokens,
      farm,
      stats,
      "multi",
      multifarmRewardsLeft,
      [
        { tokenI: toknesID.jex, price: jexPrice },
        { tokenI: toknesID.bonez, price: bonezPrice },
      ]
    ) as string;
    aprNumber = aprFarms(
      price,
      stakingToken,
      lastRewardedEpoch,
      rewardsTokens,
      farm,
      stats,
      "multi",
      multifarmRewardsLeft,
      [
        { tokenI: toknesID.jex, price: jexPrice },
        { tokenI: toknesID.bonez, price: bonezPrice },
      ],
      true
    ) as number;
  } else {
    apr = aprFarms(
      price,
      stakingToken,
      lastRewardedEpoch,
      rewardToken,
      farm,
      stats
    ) as string;
    aprNumber = aprFarms(
      price,
      stakingToken,
      lastRewardedEpoch,
      rewardToken,
      farm,
      stats,
      undefined,
      undefined,
      undefined,
      true
    ) as number;
  }

  const apy = apyFarms(aprNumber);

  return {
    apr: apr,
    apy: apy,
  };
};

export default useApr;
