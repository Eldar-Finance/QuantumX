import { BytesValue } from "@multiversx/sdk-core/out";
import { EGLDPayment } from "api/sc/calls";
import { IScPayment, IScQxTagExtension } from "utils/types/sc.interface";
export const registerTag = async (
  tag: string,
  extension: IScQxTagExtension
) => {
  const res = await EGLDPayment(
    "tagsWsp",
    "registerQtag",
    0,
    [BytesValue.fromUTF8(tag), BytesValue.fromUTF8(extension.extension)],
    30000000,
    extension.amount
  );
  return res;
};
export const updsteUserName = async (tag: string, usernameCost: IScPayment) => {
  console.log("usernameCost", usernameCost);

  const res = await EGLDPayment(
    "tagsWsp",
    "updateUsername",
    0,
    [BytesValue.fromUTF8(tag)],
    10000000,
    usernameCost.amount
  );
  return res;
};
export const replaceExtension = async (extension: IScQxTagExtension) => {
  const res = await EGLDPayment(
    "tagsWsp",
    "replaceExtension",
    0,
    [BytesValue.fromUTF8(extension.extension)],
    10000000,
    extension.amount
  );
  return res;
};
