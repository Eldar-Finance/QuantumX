import { useEffect, useState } from "react";
import { fetchNfts } from "redux/slices/userAcount/funcs";
import useSWR from "swr";
import { IElrondNFT } from "utils/types/elrond.interface";
import { fetchAllowedSfts } from "views/Badges/services";
import { useAppDispatch, useAppSelector } from "./redux";

const useGetEldarSfts = (initialValue = undefined) => {
  const nfts: IElrondNFT[] = useAppSelector(
    (state) => state.userAccount.nfts.data
  );

  const { data: sftsAllowed, isLoading, error } = useSWR(
    "sftsRewards:allowedSftsWithNonces",
    fetchAllowedSfts
  );

  const connectedAddress = useAppSelector(
    (state) => state.userAccount.connectedAddress
  );

  const [sfts, setSfts] = useState(initialValue || []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (connectedAddress) {
      dispatch(fetchNfts(connectedAddress));
    }
  }, [dispatch, connectedAddress]);

  useEffect(() => {
    if (sftsAllowed && nfts.length > 0) {
      const sftsList = [];

      nfts.forEach((nft) => {
        if (sftsAllowed.includes(nft.identifier)) {
          sftsList.push(nft);
        }
      });

      setSfts(sftsList);
    }
  }, [nfts, sftsAllowed]);

  return [sfts, setSfts];
};

export default useGetEldarSfts;
