import useSWR from "swr";
import { fetchStakersReport } from "../scServices/farmsQueries";
const useGetStakersReport = (id: number) => {
  const { data, isLoading, error } = useSWR(
    ["farms2:getStakersReport", id],
    fetchStakersReport
  );

  return {
    fees: data || {
      earners: 0,
      creator: 0,
      farmCreation: 0,
    },
    isLoading: isLoading,
    error: error,
  };
};

export default useGetStakersReport;
