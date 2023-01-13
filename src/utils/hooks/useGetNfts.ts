import { getNFTs } from "api/rest/elrondApi/nfts";
import useSWR from "swr";

const useGetNfts = (identifiers?: string) => {
  const { data, error, isLoading } = useSWR(
    identifiers
      ? {
          identifiers,
        }
      : null,
    getNFTs
  );

  return {
    nfts: data,
    isLoading: isLoading,
    isError: error,
  };
};

export default useGetNfts;
