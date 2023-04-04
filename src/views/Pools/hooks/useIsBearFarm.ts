import { toknesID } from "api/net.config";
import { IScFarmItem } from "utils/types/sc.interface";

const useIsBearFarm = (farm: IScFarmItem): boolean => {
  let isBear = false;

  if (
    farm.farm.stakingToken === toknesID.rare ||
    farm.farm.stakingToken === toknesID.rareUsdcLp ||
    farm.farm.stakingToken === toknesID.hype ||
    farm.farm.stakingToken === toknesID.hypeusdc ||
    (farm.farm.stakingToken === toknesID.mex &&
      farm.farm.rewardToken === toknesID.hype)
  ) {
    isBear = true;
  }
  return isBear;
};

export default useIsBearFarm;
