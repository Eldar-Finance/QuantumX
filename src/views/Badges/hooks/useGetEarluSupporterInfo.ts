import { fetchSuppoertersInfo } from "../services";

import useSWR from "swr";
const useGetEarluSupporterInfo = () => {
  const { data, isLoading, error } = useSWR(
    "sftsRewards:retrieveInvestorRewards",
    fetchSuppoertersInfo
  );

  return {
    offers: data,
    isLoading: isLoading,
    error: error,
  };
};

export default useGetEarluSupporterInfo;
