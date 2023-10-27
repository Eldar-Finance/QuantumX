import { BigUIntValue } from "@multiversx/sdk-core/out";
import { scQuery } from "api/sc/queries";
import BigNumber from "bignumber.js";
import { IScFarms2StakersReport, IScUserToAutoHarvest } from "utils/types/sc.interface";

export const fetchFarmsFees = async () => {
  const res = await scQuery("farms2", "getFees");
  const resharvestFee = await scQuery("farms2", "harvestFee");
  const harvestFee = resharvestFee?.firstValue.valueOf();

  const data = res?.firstValue?.valueOf();
  if (data) {
    return {
      earners: data[0].toNumber(),
      creator: data[1].toNumber(),
      farmCreation: data[2].toNumber(),
      harvest: harvestFee.toNumber(),
    };
  } else {
    return {
      earners: 0,
      harvest: 0,
      creator: 0,
      farmCreation: 0,
    };
  }
};

export const fetchIsFarmCreator = async () => {
  const res = await scQuery("farms2", "farmCreators");
  let data = res?.firstValue?.valueOf();
  if (data) {
    data = data.map((creator) => creator.bech32());
  }

  return data as string[];
};
export const fetchStakersReport = async ([key, id]: [string, number]) => {
  const res = await scQuery("farms2", "getStakersReport", [
    new BigUIntValue(new BigNumber(id)),
  ]);
  let data = res?.firstValue?.valueOf();

  const finalData: IScFarms2StakersReport[] = data.map((reportInfo) => {
    const data: IScFarms2StakersReport = {
      staker: reportInfo.field0.bech32(),
      stakedAmount: reportInfo.field1[0].toNumber(),
      lastStake: reportInfo.field1[1].toNumber(),
      lastUnstake: reportInfo.field1[2].toNumber(),
      lastHarvest: reportInfo.field1[3].toNumber(),
      rewardsHarvested: reportInfo.field1[4].toNumber(),
    };
    return data;
  });

  return finalData;
};

export const fetchFarmIds = async () => {
  const res = await scQuery("farms2", "farmIds");
  let data = res?.firstValue?.valueOf();
  if (data) {
    data = data.map((id) => id.toNumber());
  }

  return data as Number[];
};

export const fetchUsersToAutoHarvest = async (farmId: any) => {
  
  const res = await scQuery("farms2", "getUsersToAutoHarvest", [new BigUIntValue(new BigNumber(farmId))]);
  console.log("⚠️ ~ file: farmsQueries.ts:72 ~ fetchUsersToAutoHarvest ~ res:::", res)

  let data = res?.firstValue?.valueOf();
  console.log("⚠️ ~ file: farmsQueries.ts:74 ~ fetchUsersToAutoHarvest ~ data:::", data)

  const finalData: IScUserToAutoHarvest[] = data.map((data) => {
    const res: IScUserToAutoHarvest = {
      address: data.field0.bech32(),
      stakePercentage: data.field1.toNumber() * 100 / data.field2.toNumber(),
      epochsSinceLastHarvest: data.field3.toNumber(),
    };
    return res;
  });
  console.log("⚠️ ~ file: farmsQueries.ts:84 ~ constfinalData:IScUserToAutoHarvest[]=data.map ~ finalData:::", finalData)

  return finalData;
};