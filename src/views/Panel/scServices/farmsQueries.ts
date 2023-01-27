import { BigUIntValue } from "@elrondnetwork/erdjs/out";
import { scQuery } from "api/sc/queries";
import BigNumber from "bignumber.js";
import { IScFarms2StakersReport } from "utils/types/sc.interface";

export const fetchFarmsFees = async () => {
  const res = await scQuery("farms2", "getFees");

  const data = res?.firstValue?.valueOf();
  if (data) {
    return {
      earners: data[0].toNumber(),
      creator: data[1].toNumber(),
      farmCreation: data[2].toNumber(),
    };
  } else {
    return {
      earners: 0,
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

  console.log("data", data);

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
  console.log("finalData", finalData);

  return finalData;
};
