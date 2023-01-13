import { Address, AddressValue } from "@elrondnetwork/erdjs/out";
import { scQuery } from "api/sc/queries";
import store from "redux/store";
import { IScInvestorRewards } from "utils/types/sc.interface";

export const fetchSuppoertersInfo = async () => {
  const address = store.getState().userAccount.connectedAddress;
  const res = await scQuery("sftsRewards", "retrieveInvestorRewards", [
    new AddressValue(new Address(address)),
  ]);
  console.log("res.firstValue", res.firstValue?.valueOf());
  const scData = res.firstValue.valueOf();
  const data: IScInvestorRewards = {
    claimable: scData[0].map((rewardInfo: any) => {
      const d: {
        token: string;
        amount: number;
      } = {
        token: rewardInfo.field0,
        amount: rewardInfo.field1,
      };
      return d;
    }),
    claimed: scData[1].map((rewardInfo: any) => {
      const d: {
        token: string;
        amount: number;
      } = {
        token: rewardInfo.field0,
        amount: rewardInfo.field1,
      };
      return d;
    }),
  };

  return data;
};
