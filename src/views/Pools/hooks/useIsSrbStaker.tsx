import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import useSwr from "swr";
import { useAppSelector } from "utils/hooks/redux";
import { fetchInfoForNumber7Pool } from "../services";
import { isOneOfTheNumbersInArray } from "../utils";
const useIsSrbStaker = () => {
  const addres = useAppSelector(selectUserAddress);
  const { data, isLoading, error } = useSwr(
    ["xoxnoSrbPoolsInfoWsp:getWalletPools", addres],
    fetchInfoForNumber7Pool
  );

  return {
    isSrbStaker: isOneOfTheNumbersInArray([3, 4, 5, 6, 7], data || []),
    isLoading,
    error,
  };
};

export default useIsSrbStaker;
