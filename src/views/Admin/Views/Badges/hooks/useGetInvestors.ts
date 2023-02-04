import useSwr from "swr";
import { getInvestors } from "../services";
const useGetInvestors = () => {
  const { data, isLoading, error } = useSwr(
    "sftsRewards:investors",
    getInvestors
  );

  return {
    investors: data || [],
    isLoading,
    error,
  };
};

export default useGetInvestors;
