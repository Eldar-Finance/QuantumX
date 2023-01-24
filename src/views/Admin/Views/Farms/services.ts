import { scQuery } from "api/sc/queries";
import { IScFarms2EarnerInfo } from "utils/types/sc.interface";

//queries
export const fetchEarnersInfo = async () => {
  const response = await scQuery("farms2", "getEarnersInfo");
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
export const fetchFarmsWhitelistedTokens = async (key: string) => {
  const response = await scQuery("farms2", key.split(":")[1]);
  const { firstValue } = response;

  const data: string[] = firstValue.valueOf();
  return data;
};

//calls
