import { Address, AddressValue, BigUIntValue } from "@multiversx/sdk-core/out";
import { scQuery } from "api/sc/queries";
import BigNumber from "bignumber.js";

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
