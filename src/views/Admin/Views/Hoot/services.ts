import {
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
} from "@multiversx/sdk-core/out";
import { scCall } from "api/sc/calls";
import { scQuery } from "api/sc/queries";
import BigNumber from "bignumber.js";
import { IScFarms2EarnerInfo } from "utils/types/sc.interface";
//queries
export const fetchEarnersInfo = async () => {
  const response = await scQuery("hootWsp", "getEarnersInfo");
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
