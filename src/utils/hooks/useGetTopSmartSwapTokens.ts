import { fetchTopSmartSwapTokens } from "api/rest/others/EldarSolutions";
import useSWR from "swr";
const useGetTopSmartSwapTokens = () => {
  const { data, isLoading, error } = useSWR(
    "toptokens.php",
    fetchTopSmartSwapTokens
  );

  return {
    tokens: data || [],
  };
};

export default useGetTopSmartSwapTokens;
