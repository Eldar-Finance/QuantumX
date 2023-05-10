import { Address, AddressValue } from "@multiversx/sdk-core/out";
import { scQuery } from "api/sc/queries";
import {
  IScPayment,
  IScQxTagExtension,
  IScQxTagInfo,
  IScQxGetAddress,
  IScQxTagReport
} from "utils/types/sc.interface";
import { BytesValue } from "@multiversx/sdk-core/out";

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

export const getAddress = async (username: string, extension: string): Promise<IScQxGetAddress> => {
  const scRes = await scQuery("tagsWsp", "getAddress", [
    new BytesValue(Buffer.from(username, "utf-8")),
    new BytesValue(Buffer.from(extension, "utf-8"))
  ]);

  const address = scRes.firstValue?.valueOf().toString("hex");

  if (address == "erd1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq6gq4hu") {
    throw new Error("Address not found");
  }

  return address;
};

export const fetchQxTagList = async (): Promise<IScQxTagReport[]> => {
  const queryResult = await scQuery('tagsWsp', 'getAllTags', []);
  const rawResults = queryResult.firstValue?.valueOf() ?? [];

  const results: IScQxTagReport[] = rawResults.map((rawResult: any) => ({
    username: Buffer.from(rawResult.field0).toString('utf-8'),
    extension: Buffer.from(rawResult.field1).toString('utf-8'),
    address: rawResult.field2.toString("hex"),
  }));

  return results;
};

export const getIsTagAvailable = async (username: string, extension: string): Promise<Boolean> => {

  const scRes = await scQuery("tagsWsp", "isTagAvailable", [
    new BytesValue(Buffer.from(username, "utf-8")),
    new BytesValue(Buffer.from(extension, "utf-8"))
  ]);

  const isAvailable = scRes.firstValue?.valueOf();

  return isAvailable;
}