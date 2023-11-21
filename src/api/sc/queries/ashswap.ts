import { BigUIntValue } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import { ISCFarms2Fees } from "utils/types/sc.interface";
import { scQuery } from ".";


export const fetchAshSwapFee = async (): Promise<number> => {
  const res = await scQuery("ashswapWsp", "feePercentage");
  const firstValue = res?.firstValue?.valueOf().toNumber();

  return firstValue / 10000;
};
