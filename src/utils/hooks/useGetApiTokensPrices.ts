import { fetchAllApiPrices } from "api/rest/others/EldarSolutions";
import useSWR from "swr";
const useGetApiTokensPrices = () => {
  const { data, isLoading, error } = useSWR(
    "pairs.php",
    fetchAllApiPrices
  );

  return {
    apiTokens: data || [],
  };
};

export default useGetApiTokensPrices;
