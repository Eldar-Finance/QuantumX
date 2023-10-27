import useSWR from "swr";
import { fetchFarmIds } from "../scServices/farmsQueries";

const useGetFarmIds = (config: any = {}) => {
  const { data, isLoading, error } = useSWR(
    "farms2:farmIds",
    fetchFarmIds,

    { ...config }
  );

  return {
    farmIds: data || [],
    isLoading: isLoading,
    error: error,
  };
};

export default useGetFarmIds;
