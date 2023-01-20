import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import useSwr from "swr";
import { useAppSelector } from "utils/hooks/redux";
import { fetchInfoForNumber7Pool } from "../services";
import { isOneOfTheNumbersInArray } from "../utils";
const useCanUsePool7 = (poolId: number) => {
  const addres = useAppSelector(selectUserAddress);
  const { data, isLoading, error } = useSwr(
    poolId === 7 ? ["xoxnoSrbPoolsInfoWsp:getWalletPools", addres] : null,
    fetchInfoForNumber7Pool
  );

  return {
    canUsePool: isOneOfTheNumbersInArray([3, 4, 5, 6, 7], data || []),
    isLoading,
    error,
  };
};

export default useCanUsePool7;
