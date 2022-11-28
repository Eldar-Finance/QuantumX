import { rpsWsp } from "api/sc/sc";
import { scQuery } from "..";

export const getWhiteListTokens = async () => {
  const response = await scQuery(rpsWsp, "getTokenWhitelist");
  const { firstValue } = response;
  const listOfTokens = firstValue.items.map((tokenI) => {
    return tokenI.toString();
  });

  return listOfTokens;
};
