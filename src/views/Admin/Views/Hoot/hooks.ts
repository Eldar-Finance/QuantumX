import useSwr from "swr";
import { fetchEarnersInfo } from "./services";

export const useGetEarnersInfo = () => {
  const { data, isLoading, error } = useSwr(
    "hootWsp:getEarnersInfo",
    fetchEarnersInfo
  );

  return {
    earnersInfo: data || [],
    isLoading,
    error,
  };
};

