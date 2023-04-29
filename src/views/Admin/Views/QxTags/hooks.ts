import useSwr from "swr";
import { fetchEarnersInfo } from "./services";
export const useGetEarnersInfo = () => {
  const { data, isLoading, error } = useSwr(
    "tagsWsp:getEarnersInfo",
    fetchEarnersInfo
  );

  return {
    earnersInfo: data || [],
    isLoading,
    error,
  };
};
