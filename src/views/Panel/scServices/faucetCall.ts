import { BigUIntValue, BytesValue } from "@elrondnetwork/erdjs/out";
import { contractAddr } from "api/net.config";
import { ESDTTransfer, scCall } from "api/sc/calls";
import BigNumber from "bignumber.js";
import { setElrondBalance } from "utils/functions/formatBalance";
import { IElrondToken } from "utils/types/elrond.interface";

export const deposiHype = async (
  amount: string | number,
  token: IElrondToken
) => {
  const res = await ESDTTransfer({
    token: token,
    funcName: "deposit",
    val: amount,
    contractAddr: contractAddr.hypeFaucet,
  });
  return res;
};
export const changeReward = async (amount: string | number, token: string) => {
  const res = await scCall("hypezoneWsp", "setReward", [
    BytesValue.fromUTF8(token),
    new BigUIntValue(new BigNumber(0)),
    new BigUIntValue(new BigNumber(setElrondBalance(amount, 18))),
  ]);
  return res;
};
