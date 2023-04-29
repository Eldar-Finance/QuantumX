import { BytesValue } from "@multiversx/sdk-core/out";
import { EGLDPayment } from "api/sc/calls";
import { IScQxTagExtension } from "utils/types/sc.interface";
export const registerTag = async (
  tag: string,
  extension: IScQxTagExtension
) => {
  const res = await EGLDPayment(
    "tagsWsp",
    "registerQtag",
    0,
    [BytesValue.fromUTF8(tag), BytesValue.fromUTF8(extension.extension)],
    10000000,
    extension.amount
  );
  return res;
};
