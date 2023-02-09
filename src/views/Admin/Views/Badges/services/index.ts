import { scQuery } from "api/sc/queries";

export const getStakers = async (): Promise<string[]> => {
  const res = await scQuery("sftsRewards", "getStakers");
  if (res) {
    const { firstValue } = res;

    return firstValue?.valueOf().map((add, i) => {
      return {
        index: i,
        address: add.bech32(),
      };
    });
  }
  return [];
};
export const getInvestors = async (): Promise<string[]> => {
  const res = await scQuery("sftsRewards", "investors");
  if (res) {
    const { firstValue } = res;

    return firstValue?.valueOf().map((add, i) => {
      return {
        index: i,
        address: add.bech32(),
      };
    });
  }
  return [];
};
