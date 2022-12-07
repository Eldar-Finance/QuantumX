import { EldarSftCollection } from "api/net.config";
import { useEffect, useState } from "react";
import { fetchNfts } from "redux/slices/userAcount/funcs";
import { useAppDispatch, useAppSelector } from "./redux";

const useGetEldarSfts = (initialValue = undefined) => {
  const nfts = useAppSelector((state) => state.userAccount.nfts.data);
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
    if (nfts.length > 0) {
      const sftsList = [];

      nfts.forEach((nft) => {
        if (nft.collection === EldarSftCollection) {
          sftsList.push(nft);
        }
      });

      setSfts(sftsList);
    }
  }, [nfts]);

  return [sfts, setSfts];
};

export default useGetEldarSfts;
