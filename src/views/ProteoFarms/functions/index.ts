import { SORTTYPE } from "../types";

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
