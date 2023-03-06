import useSWR from "swr";
import { fetchFarmsFees } from "../scServices/farmsQueries";
const useGetFarmsFees = () => {
  const { data, isLoading, error } = useSWR("farms2:getFees", fetchFarmsFees);

  return {
    fees: data || {
      earners: 0,
      harvest: 0,
      creator: 0,
      farmCreation: 0,
    },
    isLoading: isLoading,
    error: error,
  };
};

export default useGetFarmsFees;
