import useSWR from "swr";
import { fetchIsFarmCreator } from "../scServices/farmsQueries";
const useGetFarmCreators = () => {
  const { data, isLoading, error } = useSWR(
    "farms2:farmCreators",
    fetchIsFarmCreator
  );

  return {
    creators: data || [],
    isLoading: isLoading,
    error: error,
  };
};

export default useGetFarmCreators;
