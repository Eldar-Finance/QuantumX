import { fetchSrbNftsByUser } from "api/rest/others/EldarSolutions";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import useSwr from "swr";
import { useAppSelector } from "utils/hooks/redux";
import { fetchCanUserClaim, fetchFarmunbondingPeriod } from "./sc";

export const useSrbStaker = () => {
  const address = useAppSelector(selectUserAddress);

  const { data, isLoading, error } = useSwr(
    "srbnftapi.php",
    fetchSrbNftsByUser
  );

  const userSrbNfts = data?.find((item) => item.address === address);

  return {
    isStaker: Boolean(userSrbNfts),
    userSrbNfts,
    isLoading,
    error,
  };
};

export const useUserCanClaim = () => {
  const address = useAppSelector(selectUserAddress);
  const { data, isLoading, error } = useSwr<boolean>(
    ["hypezoneWsp:canUserClaim", address],
    fetchCanUserClaim
  );

  return {
    canUserClaim: data || false,
    isLoading,
    error,
  };
};

export const useGetFarmUnbondingPeriod = (farmId: number) => {
  const { data, isLoading, error } = useSwr<number>(
    ["farms2:unbondingPeriod", farmId],
    fetchFarmunbondingPeriod
  );

  return {
    unbondingPeriod: data || 0,
    isLoading,
    error,
  };
};
