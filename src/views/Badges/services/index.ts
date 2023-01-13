import { Address, AddressValue } from "@elrondnetwork/erdjs/out";
import { scQuery } from "api/sc/queries";
import store from "redux/store";

export const fetchSuppoertersInfo = async () => {
  const address = store.getState().userAccount.connectedAddress;
  const res = await scQuery("sftsRewards", "retrieveInvestorRewarasdsadds", [
    new AddressValue(new Address(address)),
  ]);
  console.log("res.firstValue", res.firstValue?.valueOf());

  //   const data: any[] = res.firstValue.valueOf().map((rewardInfo: any) => {
  //     const d = {};
  //     return d;
  //   });

  return res.firstValue?.valueOf();
};
