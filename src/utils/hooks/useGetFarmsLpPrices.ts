import { fetchLpPrices } from "api/rest/others/EldarSolutions";
import useSwr from "swr";
import { formatTokenI } from "utils/functions/tokens";
//hook for getting the price of LP tokens in USD

export const useGetFarmsLpPrices = () => {
  const { data, error, isLoading } = useSwr("lpapi.php", fetchLpPrices);

  const finalData = data?.map((item) => {
    return {
      token: formatTokenI(item.token),
      price: item.tokenvalue,
    };
  });
  return {
    prices: finalData || [],
    isLoading,
    isError: error,
  };
};
