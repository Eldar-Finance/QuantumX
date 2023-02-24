import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import useSWR from "swr";
import { useAppSelector } from "utils/hooks/redux";
import { fetchAdmins } from "../scServices/faucetQueries";
const useIsFaucetAdmin = () => {
  const userAddress = useAppSelector(selectUserAddress);
  const { data, isLoading, error } = useSWR<string[]>(
    "hypezoneWsp:withOwnerRights",
    fetchAdmins
  );
  let isAdmin = false;
  console.log("data", data);
  console.log("userAddress", userAddress);

  if (data) {
    isAdmin = data.includes(userAddress);
  }
  return {
    isFaucetAdmin: isAdmin || false,
    isLoading: isLoading,
    error: error,
  };
};

export default useIsFaucetAdmin;
