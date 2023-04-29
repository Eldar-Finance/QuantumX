import { BigUIntValue, BytesValue } from "@multiversx/sdk-core/out";
import { scCall } from "api/sc/calls";
import { scQuery } from "api/sc/queries";
import BigNumber from "bignumber.js";
import { IScFarms2EarnerInfo } from "utils/types/sc.interface";
//queries
export const fetchEarnersInfo = async () => {
  const response = await scQuery("tagsWsp", "getEarnersInfo");
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

export const setExtensionCost = async (
  extension: string,
  token: string,
  amount: string,
  nonce: number
) => {
  scCall(
    "tagsWsp",
    "setExtensionCost",
    [
      BytesValue.fromUTF8(extension),
      BytesValue.fromUTF8(token),
      new BigUIntValue(new BigNumber(nonce)),
      new BigUIntValue(new BigNumber(amount)),
    ],
    10000000
  );
};
export const setUsernameUpdateCost = async (
  token: string,
  amount: string,
  nonce: number
) => {
  scCall(
    "tagsWsp",
    "setExtensionCost",
    [
      BytesValue.fromUTF8(token),
      new BigUIntValue(new BigNumber(nonce)),
      new BigUIntValue(new BigNumber(amount)),
    ],
    10000000
  );
};
