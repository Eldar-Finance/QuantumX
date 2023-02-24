import { Address, AddressValue } from "@elrondnetwork/erdjs/out";
import { scQuery } from "api/sc/queries";

//queries

export const fetchCanUserClaim = async ([key, address]: [string, string]) => {
  const res = await scQuery("hypezoneWsp", "canUserClaim", [
    new AddressValue(new Address(address)),
  ]);

  return res.firstValue?.valueOf() as boolean;
};
