import useSwr from "swr";
import { getStakers } from "../services";
const useGetStakers = () => {
  const { data, isLoading, error } = useSwr(
    "sftsRewards:getStakers",
    getStakers
  );

  return {
    stakers: data || [],
    isLoading,
    error,
  };
};

export default useGetStakers;
