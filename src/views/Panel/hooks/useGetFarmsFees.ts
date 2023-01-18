import useSWR from "swr";
import { fetchFarmsFees } from "../scServices/farmsQueries";
const useGetFarmsFees = () => {
  const { data, isLoading, error } = useSWR("farms2:getFees", fetchFarmsFees);

  return {
    fees: data,
    isLoading: isLoading,
    error: error,
  };
};

export default useGetFarmsFees;
