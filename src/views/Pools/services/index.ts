import { Address, AddressValue } from "@elrondnetwork/erdjs/out";
import { scQuery } from "api/sc/queries";
import BigNumber from "bignumber.js";

export async function fetchInfoForNumber7Pool([key, address]) {
  const res = await scQuery("xoxnoSrbPoolsInfoWsp", "getWalletPools", [
    new AddressValue(new Address(address)),
  ]);
  let data: number[] = [];
  if (res?.firstValue?.valueOf()) {
    data = res.firstValue.valueOf().map((num: BigNumber) => num.toNumber());
  }

  return data;
}
