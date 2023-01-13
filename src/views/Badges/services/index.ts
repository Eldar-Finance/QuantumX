import { Address, AddressValue } from "@elrondnetwork/erdjs/out";
import { scQuery } from "api/sc/queries";
import store from "redux/store";
import { createIndentifierByCollectionAndNonce } from "utils/functions/tokens";
import { IScInvestorRewards } from "utils/types/sc.interface";

export const fetchSuppoertersInfo = async () => {
  const address = store.getState().userAccount.connectedAddress;
  const res = await scQuery("sftsRewards", "retrieveInvestorRewards", [
    new AddressValue(new Address(address)),
  ]);
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
export const fetchAllowedSfts = async () => {
  const res = await scQuery("sftsRewards", "allowedSftsWithNonces");
  const scData = res.firstValue.valueOf();
  const data = scData.map((sftInfo: any) => {
    return {
      token: sftInfo.field0,
      nonce: sftInfo.field1.toNumber(),
    };
  });

  const finalData: string[] = data.map((sftInfo) => {
    return createIndentifierByCollectionAndNonce(sftInfo.token, sftInfo.nonce);
  });
  console.log("finalData", finalData);

  return finalData;
};
