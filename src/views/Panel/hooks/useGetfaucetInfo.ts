import useSWR from "swr";
import { IScHypeFauctetAdminInfo } from "utils/types/sc.interface";
import { fetchAdminInfo } from "../scServices/faucetQueries";
const useGetfaucetInfo = () => {
  const { data, isLoading, error } = useSWR<IScHypeFauctetAdminInfo>(
    "hypezoneWsp:adminInfo",
    fetchAdminInfo
  );

  return {
    info: data || {
      currentBalance: {
        token: "",
        amount: "",
        nonce: 0,
      },
      reward: {
        token: "",
        amount: "",
        nonce: 0,
      },
      cost: {
        token: "",
        amount: "",
        nonce: 0,
      },
    },
    isLoading: isLoading,
    error: error,
  };
};

export default useGetfaucetInfo;
