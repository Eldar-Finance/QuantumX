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

// export interface IScUserFarmInfo {
//   farmId: number;
//   stakedBalance: number;
//   unboundingEpoch: number;
// }
// export interface IScUserFarmRewards {
//   farmId: number;
//   rewardToken: string[];
//   harvestableAmount: number[];
//   earnedAmount: number[];
// }
export interface IScPanelFarms {
  farm: IScFarm2;
  lastReawardEpoch: number;
  earlyUnbondingFee: number;
  rewardsFee: number;
  unbondingPeriod: number;
}

export interface IHubOffer {
  id: number;
  collection: string;
  creator: string;
  price: number;
  token: string;
}
export interface IHubCreatorInfo extends IHubOffer {
  withdrawableFounds: number;
  nftsNonces: number[];
}

export interface IHubAvilableOffers extends IHubOffer {
  numberOfAvilableNfts: number;
}

export interface IScInvestorRewards {
  claimable: {
    token: string;
    amount: number;
  }[];
  claimed: {
    token: string;
    amount: number;
  }[];
}

export interface ISCFarms2Fees {
  farmId: number;
  earlyUnbondingFee: number;
  harvestFee: number;
}

export interface IScFarms2EarnerInfo {
  name: string;
  address: string;
  percent: number;
}
