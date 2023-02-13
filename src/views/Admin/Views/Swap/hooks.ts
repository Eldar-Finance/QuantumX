import useSwr from "swr";
import { fetchEarnersInfo, fetchSmartSwapFees } from "./services";
export const useGetEarnersInfo = () => {
  const { data, isLoading, error } = useSwr(
    "smartSwap:getEarnersInfo",
    fetchEarnersInfo
  );

  return {
    earnersInfo: data || [],
    isLoading,
    error,
  };
};

export const useGetFees = () => {
  const { data, isLoading, error } = useSwr(
    "smartSwap:getFees",
    fetchSmartSwapFees
  );

  return {
    fees: data || {
      fee: 0,
      lpFee: 0,
    },
    isLoading: isLoading,
    error: error,
  };
};
