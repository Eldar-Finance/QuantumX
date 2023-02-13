import { scQuery } from "api/sc/queries";
import { IScFarms2EarnerInfo } from "utils/types/sc.interface";

//queries
export const fetchEarnersInfo = async () => {
  const response = await scQuery("smartSwap", "getEarnersInfo");
  const { firstValue } = response;

  const data: IScFarms2EarnerInfo[] = firstValue.valueOf().map((struct) => {
    return {
      name: struct.field0.toString(),
      address: struct.field1.bech32(),
      percent: struct.field2.toNumber() / 100,
    };
  });

  return data;
};

export const fetchSmartSwapFees = async () => {
  const feeRes = await scQuery("smartSwap", "fee");
  const { firstValue: feeFirstValue } = feeRes;
  const fee: number = feeFirstValue.valueOf();

  const lpFeeRes = await scQuery("smartSwap", "lpFee");
  const { firstValue: lpFeeFirstValue } = lpFeeRes;
  const lpFee: number = lpFeeFirstValue.valueOf();

  return {
    fee,
    lpFee,
  };
};

//calls
