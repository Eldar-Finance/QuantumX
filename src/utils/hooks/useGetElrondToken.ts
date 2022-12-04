import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import useSWR from "swr";

const useGetElrondToken = (tokenIdeniifer: string) => {
  const { data, error } = useSWR(
    {
      identifier: tokenIdeniifer,
    },
    getFromAllTokens
  );

  return {
    token: data?.data.length > 0 && data?.data[0],
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGetElrondToken;
