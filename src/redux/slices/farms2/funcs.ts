import { Address, AddressValue } from "@elrondnetwork/erdjs/out";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { scQuery } from "api/sc/queries";
import { pairs } from "utils/constants/lpPairs";
import { formatBalance } from "utils/functions/formatBalance";
import {
  IScFarmItem,
  IScMultiFarmsRewardsLeft,
  IScPanelFarms,
  IScUserFarmInfo,
  IScUserFarmRewards,
} from "utils/types/sc.interface";
import { allHypeFarms } from "views/Hypezone/utils/constants";

export const fetchAllFarms = createAsyncThunk(
  "farms2/fetchAllFarms",
  async () => {
    const scRes = await scQuery("farms2", "getAllFarms");

    const scFirstValue = scRes.firstValue.valueOf();
    const allFarms: IScFarmItem[] = scFirstValue.map((farm: any) => {
      return {
        farm: {
          farmId: farm.field0.id.toNumber(),
          creationEpoch: farm.field0.creation_epoch.toNumber(),
          stakingToken: farm.field0.staked_token,
          rewardToken: farm.field0.reward_token,
          creator: farm.field0.creator.bech32(),
        },
        stakedBalance: farm.field1.toNumber(),
        totalRewardsLeft: farm.field2.toNumber(),
      };
    });

    const allNomalFarms = allFarms.filter(
      (farm) => !allHypeFarms.includes(farm.farm.farmId)
    );

    const hypeFarms = allFarms.filter((farm) =>
      allHypeFarms.includes(farm.farm.farmId)
    );

    return {
      allFarms,
      pools: pairs
        ? allNomalFarms.filter(
            (farm) =>
              pairs.findIndex(
                (mexPair) => mexPair.lpidentifier === farm.farm.stakingToken
              ) === -1
          )
        : [],
      farms: pairs
        ? allNomalFarms.filter(
            (farm) =>
              pairs.findIndex(
                (mexPair) => mexPair.lpidentifier === farm.farm.stakingToken
              ) !== -1
          )
        : [],
      allHypeFarms: hypeFarms,
    };
  }
);
export const fetchUSerFarmInfo = createAsyncThunk(
  "farms2/fetchUSerFarmInfo",
  async (address: string) => {
    const scRes = await scQuery("farms2", "getUserFarmInfo", [
      new AddressValue(new Address(address)),
    ]);

    const scFirstValue = scRes.firstValue.valueOf();

    const allFarms: IScUserFarmInfo[] = scFirstValue.map((farm) => {
      const data: IScUserFarmInfo = {
        farmId: farm[0].toNumber(),
        stakedBalance: farm[1].toString(),
        unboundingEpoch: farm[2].toNumber(),
      };
      return data;
    });
    return allFarms;
  }
);
export const fetchUSerRewardsInfo = createAsyncThunk(
  "farms2/fetchUSerRewardsInfo",
  async (address: string) => {
    const scRes = await scQuery("farms2", "getUserRewardsInfo", [
      new AddressValue(new Address(address)),
    ]);

    const scFirstValue = scRes.firstValue.valueOf();

    const userRewards: IScUserFarmRewards[] = scFirstValue.map((rewards) => {
      const data: IScUserFarmRewards = {
        rewardToken: rewards.field0,
        farmId: rewards.field1[0].toNumber(),
        harvestableAmount: rewards.field1[1].toNumber(),
        earnedAmount: rewards.field1[2].toNumber(),
      };
      return data;
    });

    return userRewards;
  }
);
export const fetchCreatorsFarms = createAsyncThunk(
  "farms2/fetchCreatorsFarms",
  async (address: string) => {
    const scRes = await scQuery("farms2", "getCreatorTable", [
      new AddressValue(new Address(address)),
    ]);

    const scFirstValue = scRes.firstValue.valueOf();

    const creatorFarms: IScPanelFarms[] = scFirstValue.map((farm) => {
      const data: IScPanelFarms = {
        farm: {
          farmId: farm.field0.id.toNumber(),
          creationEpoch: farm.field0.creation_epoch.toNumber(),
          stakingToken: farm.field0.staked_token,
          rewardToken: farm.field0.reward_token,
          creator: farm.field0.creator.bech32(),
        },
        lastReawardEpoch: farm.field1[0].toNumber(),
        earlyUnbondingFee: formatBalance(
          { balance: farm.field1[1].toNumber(), decimals: 2 },
          true
        ),
        rewardsFee: formatBalance(
          { balance: farm.field1[2].toNumber(), decimals: 2 },
          true
        ),
        unbondingPeriod: farm.field1[3].toNumber(),
      };

      return data;
    });

    return creatorFarms;
  }
);
export const fetchMultiFarms2RewardsLeft = createAsyncThunk(
  "farms2/fetchMultiFarms2RewardsLeft",
  async () => {
    const scRes = await scQuery("farms2", "getMultifarmsRewardsLeft");

    const scFirstValue = scRes.firstValue.valueOf();

    const multiFarmRewardsLeft: IScMultiFarmsRewardsLeft[] = scFirstValue.map(
      (r) => {
        const data: IScMultiFarmsRewardsLeft = {
          farmId: r.field0.toNumber(),
          rewardsLeft: r.field1.map((token) => {
            return {
              token: token.token_identifier,
              nonce: token.token_nonce.toNumber(),
              amount: token.amount.toNumber(),
            };
          }),
        };
        return data;
      }
    );

    return multiFarmRewardsLeft;
  }
);
