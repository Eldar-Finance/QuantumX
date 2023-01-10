export interface IScFarm2 {
  farmId: number;
  creationEpoch: number;
  stakingToken: string;
  rewardToken: string;
  creator: string;
}
export interface IScFarmItem {
  farm: IScFarm2;
  stakedBalance: number;
  totalRewardsLeft: number;
}

export interface IScUserFarmInfo {
  farmId: number;
  stakedBalance: number;
  harvestableRewards: number;
  earnedRewards: number;
  unboundingEpoch: number;
}
export interface IScPanelFarms {
  farm: IScFarm2;
  lastReawardEpoch: number;
  earlyUnbondingFee: number;
  rewardsFee: number;
  unbondingPeriod: number;
}

export interface IHubCreatorInfo {
  id: number;
  collection: string;
  creator: string;
  price: number;
  token: string;
  withdrawableFounds: number;
  nftsNonces: number[];
}
export interface IHubOffer {
  id: number;
  avilableNfts: number;
}
