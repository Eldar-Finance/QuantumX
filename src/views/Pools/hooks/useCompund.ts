import BigNumber from "bignumber.js";
import { getRealBalance } from "utils/functions/formatBalance";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import { INomalSmartSwap } from "utils/types/others.interface";
import { IScFarmItem, IScUserFarmRewards } from "utils/types/sc.interface";
import useGetSwapInfo from "views/Swap/hooks/useGetSwapInfo";
import { compound } from "../services";
//
const useCompund = (
  farm: IScFarmItem,
  userFarmRewards: IScUserFarmRewards[]
) => {
  const { tokens: rewardsTokens } = useGetMultipleElrondTokens(
    userFarmRewards.map((r) => r.rewardToken)
  );
  const { data, isLoading, isSapwToLp } = useGetSwapInfo(
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

  const handleCompound = () => {
    compound(farm, data as INomalSmartSwap[], isSapwToLp);
  };

  return {
    data,
    isLoading,
    isSapwToLp,
    handleCompound,
  };
};

export default useCompund;
