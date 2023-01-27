import useSWR from "swr";
import { fetchStakersReport } from "../scServices/farmsQueries";
const useGetStakersReport = (id: number) => {
  const { data, isLoading, error } = useSWR(
    ["farms2:getStakersReport", id],
    fetchStakersReport
  );

  return {
    report: data || [],
    isLoading: isLoading,
    error: error,
  };
};

export default useGetStakersReport;
