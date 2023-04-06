import useSWR from "swr";
import { fetchStakersReport } from "../scServices/farmsQueries";
const useGetStakersReport = (id: number) => {
  const swrConfig = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  };
  const { data, isLoading, error } = useSWR(
    ["farms2:getStakersReport", id],
    fetchStakersReport,
    swrConfig
  );

  return {
    report: data || [],
    isLoading: isLoading,
    error: error,
  };
};

export default useGetStakersReport;
