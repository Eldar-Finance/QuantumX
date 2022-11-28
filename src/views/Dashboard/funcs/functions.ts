import BigNumber from "bignumber.js";
import { IElrondNFT } from "utils/types/elrond.interface";

export const getTopOffesetBasedOnCollection = (
  collection: string,
  nftsByCollections: IElrondNFT[][],
  rows: number,
  offset: number,
  fixedOffset: number
): number => {
  const collectionIndex =
    nftsByCollections.findIndex(
      (nftArr) => nftArr[0].collection === collection
    ) || 0;

  const multiplier = Math.floor(collectionIndex / rows);
  const finalValue = offset * multiplier + fixedOffset;

  return finalValue;
};
export const renderNftsRow = (
  index: number,
  elementsPerRow: number,
  collection: string,
  collections: IElrondNFT[][]
): boolean => {
  const collectionIndex = index;
  const indexRow = Math.floor(collectionIndex / elementsPerRow);

  const selectedIdex =
    collections.findIndex((nftArr) => nftArr[0].collection === collection) || 0;

  const selectedOptionIndexRow = Math.floor(selectedIdex / elementsPerRow);

  let data = [...collections];
  const arr2Dimentions: IElrondNFT[][][] = [];

  let iter = 0;
  let j = 0;
  for (let i = 0; i < data.length; i++) {
    if (j === 0) {
      const arr = data.filter(
        (b, i) => iter === Math.floor(i / elementsPerRow)
      );
      arr2Dimentions[iter] = arr;
    }
    // data = data.filter((b, i) => iter !== Math.floor(i / elementsPerRow));
    j = j + 1;
    if (j === elementsPerRow) {
      j = 0;
      iter = iter + 1;
    }
  }

  let selectedOptionIndexColumn = -1;
  let rows = 0;
  for (let rowIndex = 0; rowIndex < arr2Dimentions.length; rowIndex++) {
    const row = arr2Dimentions[rowIndex];

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const currentCollection =
        arr2Dimentions[rowIndex][columnIndex][0].collection;

      if (arr2Dimentions[rowIndex][columnIndex][0].collection === collection) {
        selectedOptionIndexColumn = columnIndex;
      }
    }
    rows++;
  }

  const indexColumn = index - indexRow * (rows - 1);

  return (
    selectedOptionIndexRow ===
    indexRow /* &&
    indexColumn === selectedOptionIndexColumn */
  );
};

export const calculatePriceBreakdown = (
  userPrice: number,
  royalties: number,
  newmoonFee: number,
  trackingRewardsPercent: number
): {
  seller: number;
  royalties: number;
  newMoonFee: number;
  tradingRewards: number;
} => {
  if (typeof userPrice !== "number") {
    return {
      seller: 0,
      royalties: 0,
      newMoonFee: 0,
      tradingRewards: 0,
    };
  }
  const price = new BigNumber(userPrice);
  const royal = new BigNumber(price).multipliedBy(royalties).dividedBy(100);
  const newMoon = new BigNumber(price).multipliedBy(newmoonFee).dividedBy(100);
  const trackingRewardsd = new BigNumber(newMoon)
    .multipliedBy(trackingRewardsPercent)
    .dividedBy(100)
    .multipliedBy(newMoon);

  const seller = new BigNumber(price).minus(royal).minus(newMoon);

  return {
    seller: seller.toNumber(),
    royalties: royal.toNumber(),
    newMoonFee: newMoon.toNumber(),
    tradingRewards: trackingRewardsd.toNumber(),
  };
};

//This function receive a char o string and length. Build a string with the given string repeated length times
export const createStringWithCharAndLenght = (
  string: string,
  length: number
): string => {
  const stringArr: string[] = [];
  for (let index = 0; index < length; index++) {
    stringArr.push(string);
  }

  const finalString = stringArr.join("");

  return finalString;
};
