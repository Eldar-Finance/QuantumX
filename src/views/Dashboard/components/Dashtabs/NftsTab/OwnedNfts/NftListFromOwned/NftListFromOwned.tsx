import { Box, Grid, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { breakpoints } from "theme/chakra";
import { IElrondNFT } from "utils/types/elrond.interface";
import { getTopOffesetBasedOnCollection } from "views/Dashboard/funcs/functions";

import NftItemFromOwned from "./NftItemFromOwned";
interface IProps {
  nfts: IElrondNFT[];
  nftsByCollection: IElrondNFT[][];
  onClose: () => void;
  selectedCollection: string;
}

const NftListFromOwned = ({
  nfts,
  selectedCollection,
  nftsByCollection,
  onClose,
}: IProps) => {
  const bg = useColorModeValue("lightGray.base", "#202020");
  const closeIconColor = useColorModeValue("black", "light.lighter");

  const [isLargerThanLg] = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  const [isLargerThanTablet] = useMediaQuery(
    `(min-width: ${breakpoints.tablet})`
  );

  let rows = 1;
  if (isLargerThanTablet) {
    rows = 2;
  }
  if (isLargerThanLg) {
    rows = 3;
  }

  return (
    <Box
      gridColumn={"1 / " + (rows + 1)}
      mb={2}
      borderRadius="lg"
      // position={"absolute"}
      w="full"
      zIndex="9"
      top={
        getTopOffesetBasedOnCollection(
          selectedCollection,
          nftsByCollection,
          rows,
          106,
          105
        ) + "px"
      }
      // bg={bg}
    >
      <Grid
        templateColumns={{ xs: "1fr", tablet: "1fr 1fr", lg: "1fr 1fr 1fr" }}
        gap={4}
      >
        <>
          {nfts.map((nft) => {
            return <NftItemFromOwned key={nft.identifier} nft={nft} />;
          })}
        </>
      </Grid>
    </Box>
  );
};

export default NftListFromOwned;
