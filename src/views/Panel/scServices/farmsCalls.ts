import { BigUIntValue, BooleanValue, BytesValue } from "@elrondnetwork/erdjs/out";
import {
  EGLDPayment,
  MultESDTNFTTranferOrEgldPayment,
  scCall,
} from "api/sc/calls";
import BigNumber from "bignumber.js";
import { setElrondBalance } from "utils/functions/formatBalance";
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
    new BigUIntValue(
      new BigNumber(new BigNumber(fee).multipliedBy(100).toFixed(0))
    ),
  ]);

  return res;
}
export async function setEarlyUnbodingFee(
  farmId: number,
  fee: number | string
) {
  const res = await scCall("farms2", "setEarlyUnbondingFee", [
    new BigUIntValue(new BigNumber(farmId)),
    new BigUIntValue(
      new BigNumber(new BigNumber(fee).multipliedBy(100).toFixed(0))
    ),
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
  tokensInfo: { tokenDetail: IElrondToken; amount: number | string }[],
  farmId: number,
  epochs: number | string,
  bypass?: boolean
) {
  let res = null;

  const tokensToSend = tokensInfo.map((ti) => {
    const data = {
      identifier: ti.tokenDetail.identifier,
      nonce: 0,
      amount: setElrondBalance(Number(ti.amount), ti.tokenDetail.decimals),
    };

    return data;
  });

  const arg = [
    new BigUIntValue(new BigNumber(farmId)),
    new BigUIntValue(new BigNumber(epochs)),
    new BooleanValue(bypass)
  ];
  res = MultESDTNFTTranferOrEgldPayment(
    "farms2",
    "depositRewards",
    tokensToSend,
    arg,
    50000000
  );

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
      new BigUIntValue(
        new BigNumber(
          new BigNumber(farm.unbondingFee).multipliedBy(100).toFixed(0)
        )
      ),
      new BigUIntValue(
        new BigNumber(
          new BigNumber(farm.harvestFee).multipliedBy(100).toFixed(0)
        )
      ),
    ],
    10000000
  );
}
