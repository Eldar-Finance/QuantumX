import { Address, AddressValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import { scQuery } from "api/sc/queries";

//calls
export const claim = () => {
  scCall("hypezoneWsp", "claim", [], 5000000);
};

//queries

export const fetchCanUserClaim = async ([key, address]: [string, string]) => {
  const res = await scQuery("hypezoneWsp", "canUserClaim", [
    new AddressValue(new Address(address)),
  ]);

  return res.firstValue?.valueOf() as Boolean;
};
