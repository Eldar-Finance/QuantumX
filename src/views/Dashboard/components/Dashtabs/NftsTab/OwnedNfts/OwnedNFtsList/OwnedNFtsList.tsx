import { Grid, useMediaQuery } from "@chakra-ui/react";

import { Fragment } from "react";
import { breakpoints } from "theme/chakra";
import { IElrondNFT } from "utils/types/elrond.interface";
import NftListFromOwned from "../NftListFromOwned/NftListFromOwned";
import OwnedNFItem from "./OwnedNFItem";
interface IProps {
  nfts: IElrondNFT[][];
  selectedCollection?: string;
  setSelectedCollection: (collection: string) => void;
}
const OwnedNFtsList = ({
  nfts,
  selectedCollection,
  setSelectedCollection,
}: IProps) => {
  const [isLargerThanTablet] = useMediaQuery(
    `(min-width: ${breakpoints.tablet})`
  );

  let rows = 1;
  if (isLargerThanTablet) {
    rows = 2;
  }

  return (
    <Grid
      templateColumns={{ xs: "1fr", tablet: "1fr 1fr ", lg: "1fr 1fr" }}
      gap={6}
      w="full"
    >
      {nfts.map((nftsArr, i) => {
        const collection = nftsArr[0].collection;
        return (
          <Fragment key={nftsArr[0].collection}>
            <OwnedNFItem
              collection={collection}
              onClick={() =>
                collection === selectedCollection && selectedCollection !== ""
                  ? setSelectedCollection("")
                  : setSelectedCollection(collection)
              }
              selected={selectedCollection === collection}
              nftsArr={nftsArr}
            />
            {nfts.length >= rows ? (
              <Fragment>
                {((i + 1) % rows === 0 ||
                  (i + 1 === nfts.length && nfts.length % rows !== 0)) && (
                  <>
                    {selectedCollection &&
                      renderNftsRow(i, rows, selectedCollection, nfts) && (
                        <NftListFromOwned
                          nfts={
                            nfts.find(
                              (nftArr) =>
                                nftArr[0].collection === selectedCollection
                            ) || []
                          }
                          selectedCollection={selectedCollection}
                          nftsByCollection={nfts}
                        />
                      )}
                  </>
                )}
              </Fragment>
            ) : (
              <Fragment>
                {i + 1 === nfts.length && (
                  <>
                    {selectedCollection &&
                      renderNftsRow(i, rows, selectedCollection, nfts) && (
                        <NftListFromOwned
                          nfts={
                            nfts.find(
                              (nftArr) =>
                                nftArr[0].collection === selectedCollection
                            ) || []
                          }
                          selectedCollection={selectedCollection}
                          nftsByCollection={nfts}
                        />
                      )}
                  </>
                )}
              </Fragment>
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default OwnedNFtsList;

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
