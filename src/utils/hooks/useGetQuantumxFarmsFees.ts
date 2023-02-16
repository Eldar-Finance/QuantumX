import { fetchFarmsFees } from "api/sc/queries/farms2";
import useSWR from "swr";

const useGetQuantumxFarmsFees = (id?: number) => {
  const { data, isLoading, error } = useSWR(
    "farms2:getFarmFees",
    fetchFarmsFees
  );
  const finalData = data || [];
  return {
    farmFees: finalData,
    farmFee: finalData.find((item) => item.farmId === id),
    isLoading: isLoading,
    error: error,
  };
};

export default useGetQuantumxFarmsFees;
