import { getNFTs } from "api/rest/elrondApi/nfts";
import useSWR from "swr";

const useGetNfts = (identifiers?: string) => {
  const { data, error, isLoading } = useSWR(
    {
      identifiers,
    },
    getNFTs
  );

  console.log("data", data);

  return {
    nfts: data,
    isLoading: isLoading,
    isError: error,
  };
};

export default useGetNfts;
