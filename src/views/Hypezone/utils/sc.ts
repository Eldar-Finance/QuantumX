import { Address, AddressValue, BigIntValue, BigUIntValue } from "@multiversx/sdk-core/out";
import { scQuery } from "api/sc/queries";
import BigNumber from "bignumber.js";
import { IScFungibleReward, IScUserFarmRewards } from "utils/types/sc.interface";

//queries

export const fetchCanUserClaim = async ([key, address]: [string, string]) => {
  const res = await scQuery("hypezoneWsp", "canUserClaim", [
    new AddressValue(new Address(address)),
  ]);

  return res.firstValue?.valueOf() as boolean;
};
export const fetchFarmunbondingPeriod = async ([key, id]: [string, string]) => {
  const res = await scQuery("farms2", "unbondingPeriod", [
    new BigUIntValue(new BigNumber(id)),
  ]);

  return res.firstValue?.valueOf().toNumber() as number;
};

export const fetchUserHarvestableRewards = async (address: string, farmId:number): Promise<IScUserFarmRewards[]> => {

  const res = await scQuery("farms2", "calcHarvestableRewards", [
    new AddressValue(new Address(address)),
    new BigIntValue(farmId)
  ]);

  const data = res.firstValue?.valueOf();

  const finalData: IScUserFarmRewards[] = data.map((item: any) => {
      const data: IScUserFarmRewards = {
          rewardToken: item.field0,
          harvestableAmount: item.field1.toNumber(),
          farmId: farmId,
          earnedAmount: 0,
      };
      return data;
  });

  return finalData;
};