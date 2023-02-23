import { BigUIntValue, BytesValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import BigNumber from "bignumber.js";
import { setElrondBalance } from "utils/functions/formatBalance";

export const deposiHype = async (amount: string | number) => {
  const res = await scCall("hypezoneWsp", "deposit", [
    new BigUIntValue(new BigNumber(setElrondBalance(amount, 18))),
  ]);
  return res;
};
export const changeReward = async (amount: string | number, token: string) => {
  const res = await scCall("hypezoneWsp", "deposit", [
    BytesValue.fromUTF8(token),
    new BigUIntValue(new BigNumber(0)),
    new BigUIntValue(new BigNumber(setElrondBalance(amount, 18))),
  ]);
  return res;
};
