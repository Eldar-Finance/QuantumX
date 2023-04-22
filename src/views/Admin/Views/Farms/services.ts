import { BigUIntValue, BytesValue } from "@multiversx/sdk-core/out";
import { EGLDPayment } from "api/sc/calls";
import { scQuery } from "api/sc/queries";
import BigNumber from "bignumber.js";
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

export async function forceCreateFarm(
  fee,
  farm = {
    stakingTokenI: "",
    rewardTokenI: "",
    unbondingPeriod: "",
    unbondingFee: "",
    creator: "",
    allowMultipleRewardsTokens: true,
  }
) {
  EGLDPayment(
    "farms2",
    "forceCreateFarm",
    fee,
    [
      new BigUIntValue(new BigNumber(farm.unbondingPeriod)),
      new BigUIntValue(
        new BigNumber(
          new BigNumber(farm.unbondingFee).multipliedBy(100).toFixed(0)
        )
      ),
      BytesValue.fromUTF8(farm.creator),
      BytesValue.fromUTF8(farm.stakingTokenI),

      BytesValue.fromUTF8(
        farm.allowMultipleRewardsTokens ? "" : farm.rewardTokenI
      ),
    ],
    10000000
  );
}
