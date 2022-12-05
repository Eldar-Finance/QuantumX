import { SORTTYPE } from "utils/types/farms.interface";

export const cutText = (
  mainText: string,
  length: number = 15
): [string, boolean] => {
  if (!mainText) {
    return ["", false];
  }
  if (mainText.length <= length) {
    return [mainText, false];
  }
  return [mainText.slice(0, length) + " ...", true];
};

export const getTextBySortKey = (sortKey: SORTTYPE) => {
  switch (sortKey) {
    case "new":
      return "New";
    case "amount":
      return "Amount";

    default:
      return "";
  }
};
