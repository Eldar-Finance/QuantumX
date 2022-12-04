import { getTokenPrice } from "api/rest/elrondApi/tokens";
import useSWR from "swr";

const useGetUsdTokenPrice = (tokenIdeniifer: string) => {
  const { data, error } = useSWR(tokenIdeniifer, getTokenPrice);

  return {
    price: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGetUsdTokenPrice;
