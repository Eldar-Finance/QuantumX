import { toknesID } from "api/net.config";
import { IScFarmItem } from "utils/types/sc.interface";

const useIsBearFarm = (farm: IScFarmItem): boolean => {
  let isBear = false;

  if (
    farm.farm.stakingToken === toknesID.rare ||
    farm.farm.stakingToken === toknesID.rareUsdcLp
  ) {
    isBear = true;
  }
  return isBear;
};

export default useIsBearFarm;
