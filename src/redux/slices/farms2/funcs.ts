import { Address, AddressValue } from "@elrondnetwork/erdjs/out";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { scQuery } from "api/sc/queries";
import { formatBalance } from "utils/functions/formatBalance";
import {
  IScFarmItem,
  IScPanelFarms,
  IScUserFarmInfo,
} from "utils/types/sc.interface";

export const fetchAllFarms = createAsyncThunk(
  "farms2/fetchAllFarms",
  async () => {
    const scRes = await scQuery("farms2", "getAllFarms");

    const scFirstValue = scRes.firstValue.valueOf();
    console.log("scFirstValue", scFirstValue);

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

    return allFarms;
  }
);
export const fetchUSerFarmInfo = createAsyncThunk(
  "farms2/fetchUSerFarmInfo",
  async (address: string) => {
    const scRes = await scQuery("farms2", "getUserInfo", [
      new AddressValue(new Address(address)),
    ]);

    const scFirstValue = scRes.firstValue.valueOf();

    const allFarms: IScUserFarmInfo[] = scFirstValue.map((farmInfo) => {
      const data: IScUserFarmInfo = {
        farmId: farmInfo[0].toNumber(),
        stakedBalance: farmInfo[1].toNumber(),
        harvestableRewards: farmInfo[2].toNumber(),
        earnedRewards: farmInfo[3].toNumber(),
        unboundingRewards: farmInfo[4].toNumber(),
      };
      return data;
    });
    return allFarms;
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
