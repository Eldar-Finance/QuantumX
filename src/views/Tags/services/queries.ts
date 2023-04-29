import { Address, AddressValue } from "@multiversx/sdk-core/out";
import { scQuery } from "api/sc/queries";
import { IScQxTagExtension, IScQxTagInfo } from "utils/types/sc.interface";

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
