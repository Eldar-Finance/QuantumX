export interface IScFarmItem {
  farm: {
    farmId: number;
    creationEpoch: number;
    stakingToken: string;
    rewardToken: string;
  };
  stakedBalance: number;
  apr: number;
}

export interface IScUserFarmInfo {
  farmId: number;
  stakedBalance: number;
  harvestableRewards: number;
  earnedRewards: number;
  unboundingRewards: number;
}
