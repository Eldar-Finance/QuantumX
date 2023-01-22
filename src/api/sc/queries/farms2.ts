import { BigUIntValue } from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";
import { ISCFarms2Fees } from "utils/types/sc.interface";
import { scQuery } from ".";

export const fetchLastRewardedEpoch = async <T>(farmId: number) => {
  const res = await scQuery("farms2", "lastRewardedEpoch", [
    new BigUIntValue(new BigNumber(farmId)),
  ]);
  const data: T = res?.firstValue.valueOf().toNumber();
  return data;
};

export const fetchFarmsFees = async (): Promise<ISCFarms2Fees[]> => {
  const res = await scQuery("farms2", "getFarmFees");
  const firstValue = res?.firstValue?.valueOf();
  let data: ISCFarms2Fees[] = [];

  if (firstValue) {
    data = firstValue.map((feeInfo) => {
      const feeData: ISCFarms2Fees = {
        farmId: feeInfo[0].toNumber(),
        earlyUnbondingFee: new BigNumber(feeInfo[1]).dividedBy(100).toNumber(),
        harvestFee: new BigNumber(feeInfo[2]).dividedBy(100).toNumber(),
      };
      return feeData;
    });
  }

  return data;
};
