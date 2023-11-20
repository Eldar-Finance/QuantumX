import { fetchAshSwapFee } from "api/sc/queries/ashswap";
import { fetchFarmsFees } from "api/sc/queries/farms2";
import useSWR from "swr";

const useGetAshSwapFee = () => {
  const { data, isLoading, error } = useSWR(
    "ashswap:feePercentage",
    fetchAshSwapFee
  );

  const finalData = data || 0;

  return {
    fee: finalData,
    isLoadingFee: isLoading,
    errorOnFee: error,
  };
};

export default useGetAshSwapFee;
