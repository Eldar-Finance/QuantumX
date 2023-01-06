import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import useSWR from "swr";

const useGetMultipleElrondTokens = (tokensIdentifiers: string[]) => {
  console.log("tokensIdentifiers", tokensIdentifiers);

  const { data, error } = useSWR(
    tokensIdentifiers.length !== 0
      ? {
          identifiers: tokensIdentifiers.join(","),
        }
      : null,
    getFromAllTokens
  );

  return {
    tokens: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGetMultipleElrondTokens;
