import { Address, AddressValue } from "@multiversx/sdk-core/out";
import { scQuery } from "api/sc/queries";
import {
  IScPayment,
  IScQxTagExtension,
  IScQxTagInfo,
} from "utils/types/sc.interface";

export const fetchUserTag = async (address: string): Promise<IScQxTagInfo> => {
  const scRes = await scQuery("tagsWsp", "getUserInfo", [
    new AddressValue(new Address(address)),
  ]);

  const data = scRes.firstValue?.valueOf();

  const finalData: IScQxTagInfo = {
    username: new Buffer(data[0]).toString("utf-8"),
    extension: new Buffer(data[1]).toString("utf-8"),
    tag: new Buffer(data[2]).toString("utf-8"),
  };

  return finalData;
};

export const fetchExtensionsList = async (): Promise<IScQxTagExtension[]> => {
  const scRes = await scQuery("tagsWsp", "getExtensionsInfo", []);

  const data = scRes.firstValue?.valueOf();

  const finalData: IScQxTagExtension[] = data.map((item: any) => {
    const data: IScQxTagExtension = {
      extension: new Buffer(item.field0).toString("utf-8"),
      amount: item.field1.amount.toString(),
      nonce: item.field1.token_nonce.toNumber(),
      token: item.field1.token_identifier,
    };
    return data;
  });

  return finalData;
};

export const fetchUserNameUpdateCost = async (): Promise<IScPayment> => {
  const scRes = await scQuery("tagsWsp", "usernameUpdateCost", []);

  const data = scRes.firstValue?.valueOf();
  let finalData: IScPayment = {
    token: "EGLD",
    amount: "0",
    nonce: 0,
  };

  if (data) {
    finalData = {
      token: data.token_identifier,
      amount: data.amount.toString(),
      nonce: data.token_nonce.toNumber(),
    };
  }

  return finalData;
};
