import { BigUIntValue } from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";
import { scQuery } from ".";

export const fetchLastRewardedEpoch = async <T>(farmId: number) => {
  const res = await scQuery("farms2", "lastRewardedEpoch", [
    new BigUIntValue(new BigNumber(farmId)),
  ]);
  const data: T = res?.firstValue.valueOf();
  return data;
};
