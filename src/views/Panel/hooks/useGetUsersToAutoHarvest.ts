import useSWR from "swr";
import { fetchFarmIds, fetchUsersToAutoHarvest } from "../scServices/farmsQueries";

const useGetUsersToAutoHarvest = (farmId: any) => {
  const { data, isLoading, error } = useSWR(
    "farms2:getUsersToAutoHarvest",
    async () => {
      return await fetchUsersToAutoHarvest(farmId);
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
