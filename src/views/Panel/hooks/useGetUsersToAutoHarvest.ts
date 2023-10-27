import useSWR from "swr";
import { fetchFarmIds, fetchUsersToAutoHarvest } from "../scServices/farmsQueries";

const useGetUsersToAutoHarvest = (farmIds: Number[]) => {
  const { data, isLoading, error } = useSWR(
    "farms2:getUsersToAutoHarvest",
    async () => {
      return await fetchUsersToAutoHarvest(farmIds);
    },
    {
      fallbackData: [],
    }
  );

  return {
    usersToAutoHarvest: data || [],
    isLoading: isLoading,
    error: error,
  };
};

export default useGetUsersToAutoHarvest;
