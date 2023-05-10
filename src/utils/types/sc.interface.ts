export interface IScFarm2 {
  farmId: number;
  creationEpoch: number;
  stakingToken: string;
  rewardToken: string;
  creator: string;
}
export interface IScFarmItem {
  farm: IScFarm2;
  stakedToken: string;
  stakedBalance: number;
  totalRewardsLeft: number;
  compound: boolean;
  extraPools?: IScFarmItem[];
}

export interface IScUserFarmInfo {
  farmId: number;
  stakedToken: string;
  stakedBalance: string;
  unboundingEpoch: number;
  extraPools?: IScFarmItem[];
}
export interface IScUserFarmRewards {
  rewardToken: string;
  farmId: number;
  harvestableAmount: number;
  earnedAmount: number;
}
export interface IScPanelFarms {
  farm: IScFarm2;
  lastReawardEpoch: number;
  earlyUnbondingFee: number;

  unbondingPeriod: number;
}

export interface IScFarm2RewardsLeft {
  token: string;
  nonce: number;
  amount: number;
}

export interface IScMultiFarmsRewardsLeft {
  farmId: number;
  rewardsLeft: IScFarm2RewardsLeft[];
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
export interface IScFarms2StakersReport {
  staker: string;
  stakedAmount: number;
  lastStake: number;
  lastUnstake: number;
  lastHarvest: number;
  rewardsHarvested: number;
}

export interface IScHypeFauctetAdminInfo {
  currentBalance: {
    token: string;
    amount: string;
    nonce: number;
  };
  reward: {
    token: string;
    amount: string;
    nonce: number;
  };
  cost: {
    token: string;
    amount: string;
    nonce: number;
  };
}

export interface IScPayment {
  token: string;
  amount: string;
  nonce: number;
}

export interface IScQxTagInfo {
  username: string;
  extension: string;
  tag: string;
}
export interface IScQxTagExtension extends IScPayment {
  extension: string;
}

export interface IScQxGetAddress {
  username: string;
  extension: string;
}

export interface IScQxTagReport {
  username: string;
  extension: string;
  address: string;
}