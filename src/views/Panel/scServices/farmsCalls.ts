import {
  BigIntValue,
  BigUIntValue,
  BytesValue,
} from "@elrondnetwork/erdjs/out";
import { contractAddr } from "api/net.config";
import { EGLDPayment, ESDTTransfer, scCall } from "api/sc/calls";
import BigNumber from "bignumber.js";
import { IElrondToken } from "utils/types/elrond.interface";

export async function deleteFarm(farmId: number) {
  const res = await scCall("farms2", "deleteFarm", [
    new BigUIntValue(new BigNumber(farmId)),
  ]);

  return res;
}
export async function setRewardsFee(farmId: number, fee: number | string) {
  const res = await scCall("farms2", "setRewardsFee", [
    new BigUIntValue(new BigNumber(farmId)),
    new BigUIntValue(new BigNumber(fee)),
  ]);

  return res;
}
export async function setEarlyUnbodingFee(
  farmId: number,
  fee: number | string
) {
  const res = await scCall("farms2", "setEarlyUnbondingFee", [
    new BigUIntValue(new BigNumber(farmId)),
    new BigUIntValue(new BigNumber(fee)),
  ]);

  return res;
}
export async function setUnbondingPeriod(
  farmId: number,
  epochs: number | string
) {
  const res = await scCall("farms2", "setUnbondingPeriod", [
    new BigUIntValue(new BigNumber(farmId)),
    new BigUIntValue(new BigNumber(epochs)),
  ]);

  return res;
}
export async function depositRewards(
  token: IElrondToken,
  farmId: number,
  epochs: number | string,
  amount: number | string
) {
  let res = null;
  if (token.identifier === "EGLD") {
    res = await EGLDPayment(
      "farms2",
      "depositRewards",
      Number(amount),
      [
        new BigIntValue(new BigNumber(farmId)),
        new BigIntValue(new BigNumber(epochs)),
      ],
      50000000
    );
  } else {
    res = await ESDTTransfer({
      funcName: "depositRewards",
      token: { identifier: token.identifier, decimals: token.decimals },
      val: Number(amount),
      args: [
        new BigIntValue(new BigNumber(farmId)),
        new BigIntValue(new BigNumber(epochs)),
      ],
      contractAddr: contractAddr.farms2,
      gasL: 50000000,
    });
  }

  return res;
}
export async function becomeCreator(fee: number) {
  EGLDPayment("farms2", "becomeCreator", fee, [], 10000000);
}

export async function createFarm(
  fee,
  farm = {
    stakingTokenI: "",
    rewardTokenI: "",
    unbondingPeriod: "",
    unbondingFee: "",
    harvestFee: "",
  }
) {
  EGLDPayment(
    "farms2",
    "createFarm",
    fee,
    [
      BytesValue.fromUTF8(farm.stakingTokenI),
      BytesValue.fromUTF8(farm.rewardTokenI),
      new BigUIntValue(new BigNumber(farm.unbondingPeriod)),
      new BigUIntValue(new BigNumber(farm.unbondingFee)),
      new BigUIntValue(new BigNumber(farm.harvestFee)),
    ],
    10000000
  );
}
