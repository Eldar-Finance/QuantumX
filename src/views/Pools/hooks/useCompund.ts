import BigNumber from "bignumber.js";
import { selectFarms } from "redux/slices/farms2/farms2-slice";
import { getRealBalance } from "utils/functions/formatBalance";
import { useAppSelector } from "utils/hooks/redux";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import { INomalSmartSwap } from "utils/types/others.interface";
import { IScFarmItem, IScUserFarmRewards } from "utils/types/sc.interface";
import { hypeFarmIds } from "views/Hypezone/utils/constants";
import useGetSwapInfo from "views/Swap/hooks/useGetSwapInfo";
import { compound } from "../services";

const useCompund = (
  farm: IScFarmItem,
  userFarmRewards: IScUserFarmRewards[]
) => {
  const { tokens: rewardsTokens } = useGetMultipleElrondTokens(
    userFarmRewards.map((r) => r.rewardToken)
  );
  const { data, isLoading, isSwapToLp } = useGetSwapInfo(
    farm.farm.rewardToken,
    farm.farm.stakingToken,
    userFarmRewards && userFarmRewards.length > 0 && rewardsTokens.length > 0
      ? (
          getRealBalance(
            userFarmRewards[0]?.harvestableAmount,
            rewardsTokens[0]?.decimals,
            true
          ) as BigNumber
        ).toString()
      : null
  );
  const isNormalFarm =
    useAppSelector(selectFarms).findIndex(
      (sfarm) => sfarm.farm.farmId === farm.farm.farmId
    ) !== -1;
  const ishypeFarm = hypeFarmIds.includes(farm.farm.farmId);
  const isLp = isNormalFarm || ishypeFarm;
  const handleCompound = () => {
    compound(farm, data as INomalSmartSwap[], isLp);
  };

  return {
    data,
    isLoading,
    isSwapToLp,
    handleCompound,
  };
};

export default useCompund;
