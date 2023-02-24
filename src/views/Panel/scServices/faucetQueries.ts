import { scQuery } from "api/sc/queries";
import { IScHypeFauctetAdminInfo } from "utils/types/sc.interface";

export const fetchAdminInfo = async () => {
  const res = await scQuery("hypezoneWsp", "adminInfo");
  const firstValue = res?.firstValue?.valueOf();

  const data: IScHypeFauctetAdminInfo = {
    currentBalance: {
      token: firstValue[0].token_identifier,
      amount: firstValue[0].amount.toString(),
      nonce: firstValue[0].token_nonce.toNumber(),
    },
    reward: {
      token: firstValue[1].token_identifier,
      amount: firstValue[1].amount.toString(),
      nonce: firstValue[1].token_nonce.toNumber(),
    },
    cost: {
      token: firstValue[2].token_identifier,
      amount: firstValue[2].amount.toString(),
      nonce: firstValue[2].token_nonce.toNumber(),
    },
  };
  console.log("data", data);

  return data;
};

export const fetchAdmins = async () => {
  const res = await scQuery("hypezoneWsp", "withOwnerRights");
  const firstValue = res?.firstValue?.valueOf().map((add) => add.bech32());
  return firstValue;
};
