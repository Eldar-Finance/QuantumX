import { fetchFarmsFees } from "api/sc/queries/farms2";
import useSWR from "swr";

const useGetQuantumxFarmsFees = () => {
  const { data, isLoading, error } = useSWR(
    "farms2:getFarmFees",
    fetchFarmsFees
  );

  return {
    farmFees: data || [],
    isLoading: isLoading,
    error: error,
  };
};

export default useGetQuantumxFarmsFees;
