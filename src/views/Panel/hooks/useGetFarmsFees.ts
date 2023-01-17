import useSWR from "swr";
import { fetchFarmsFees } from "../scServices/farmsQueries";
const useGetFarmsFees = () => {
  const { data, isLoading, error } = useSWR("farms2:getFees", fetchFarmsFees);

  const fees = {
    earnes: 0,
    creator: 0,
    farmCreation: 0,
  };
  return {
    fees: fees,
    isLoading: isLoading,
    error: error,
  };
};

export default useGetFarmsFees;
