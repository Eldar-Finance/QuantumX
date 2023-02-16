import useSwr from "swr";
import { fetchEarnersInfo, fetchFarmsWhitelistedTokens } from "./services";
export const useGetEarnersInfo = () => {
  const { data, isLoading, error } = useSwr(
    "farms2:getEarnersInfo",
    fetchEarnersInfo
  );

  return {
    earnersInfo: data || [],
    isLoading,
    error,
  };
};

export const useGetFarmsTokens = (
  typeOfTokens: "whitelistedStakedTokens" | "whitelistedRewardTokens"
) => {
  const { data, isLoading, error } = useSwr(
    `farms2:${typeOfTokens}`,
    fetchFarmsWhitelistedTokens
  );

  return {
    tokens: data || [],
    isLoading,
    error,
  };
};
