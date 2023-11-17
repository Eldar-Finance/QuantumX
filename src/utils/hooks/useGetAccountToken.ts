import {
  fetchAccountTokenById,
  getEgldBalance,
} from "api/rest/elrondApi/accounts";
import { useSelector } from "react-redux";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";

import useSWR from "swr";
const useGetAccountToken = (identifier: string) => {
  const address = useSelector(selectUserAddress);
  const {
    data: elrondTokenData,
    error: elrondTokenError,
    isLoading: elrondTokenLoading,
  } = useSWR(
    address !== "" && identifier !== "EGLD" && identifier
      ? [identifier, address]
      : null,
    fetchAccountTokenById,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        try {
          if (error?.response.status === 404) return;
        } catch (error) {
          console.log(error);
        }

        // Only retry up to 10 times.
        if (retryCount >= 10) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );
  const {
    data: egldData,
    error: egldDataError,
    isLoading: egldDataLoading,
  } = useSWR(
    address !== "" && identifier === "EGLD" ? address : null,
    getEgldBalance
  );

  const data =
    identifier === "EGLD"
      ? {
          identifier,
          nonce: 0,
          name: null,
          balance: "0",
          decimals: 18,
          ...egldData,
        }
      : elrondTokenData;

  return {
    accountToken: data || {
      identifier,
      balance: "0",
      nonce: 0,
      decimals: 18,
      name: null,
    },
    error: elrondTokenError || egldDataError,
    isLoading: elrondTokenLoading || egldDataLoading,
  };
};

export default useGetAccountToken;
