import { getNfts } from "api/rest/elrondApi/accounts";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import useSWR from "swr";
import { useAppSelector } from "./redux";

const useGetUserNfts = (collections?: string) => {
  const address = useAppSelector(selectUserAddress);
  const { data, error } = useSWR(
    address
      ? {
          address: address,
          parameters: { collections: collections },
        }
      : null,
    getNfts,
    {}
  );

  return {
    nfts: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGetUserNfts;
