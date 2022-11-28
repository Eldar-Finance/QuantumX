import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { fetchNfts } from "redux/slices/userAcount/funcs";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import useGroupByField from "utils/hooks/useGroupByField";
import { IElrondNFT } from "utils/types/elrond.interface";
import OwnedNFtsList from "./OwnedNFtsList/OwnedNFtsList";

const OwnedNfts = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  const nfts = useAppSelector((state) => state.userAccount.nfts);

  const nftsByCollection = useGroupByField<IElrondNFT[][]>(
    nfts.data ?? [],
    "collection"
  );
  const [selectedCollection, setSelectedCollection] = useState<string>();

  useEffect(() => {
    if (address) {
      dispatch(fetchNfts(address));
    }
  }, [address, dispatch]);

  if (!nftsByCollection.length) {
    return null;
  }

  return (
    <Box p="10px 30px 60px 30px" borderRadius={"2xl"}>
      <Box position={"relative"}>
        <OwnedNFtsList
          nfts={nftsByCollection}
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
        />
      </Box>
    </Box>
  );
};

export default OwnedNfts;
