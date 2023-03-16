import useSWR from "swr";
import { fetchIsFarmCreator } from "../scServices/farmsQueries";
const useGetFarmCreators = (config: any = {}) => {
  const { data, isLoading, error } = useSWR(
    "farms2:farmCreators",
    fetchIsFarmCreator,

    { ...config }
  );

  return {
    creators: data || [],
    isLoading: isLoading,
    error: error,
  };
};

export default useGetFarmCreators;
