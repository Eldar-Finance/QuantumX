import {
  fetchAccountTokenById,
  fetchAccountTokensByIds,
  getEgldBalance,
} from "api/rest/elrondApi/accounts";
import { useSelector } from "react-redux";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";

import useSWR from "swr";

const useGetAccountTokens = (identifiers: string[]) => {
  const address = useSelector(selectUserAddress);
  let {
    data: elrondTokenData,
    error: elrondTokenError,
    isLoading: elrondTokenLoading,
  } = useSWR(
    address !== "" && identifiers.length > 0
      ? [address, identifiers]
      : ["", []],
      fetchAccountTokensByIds,
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

  // const {
  //   data: egldData,
  //   error: egldDataError,
  //   isLoading: egldDataLoading,
  // } = useSWR(
  //   address !== "" && identifiers.includes("EGLD") ? address : null,
  //   getEgldBalance
  // );

  // const data = identifiers.includes("EGLD")
  //   ? {
  //       identifier: "EGLD",
  //       nonce: 0,
  //       name: null,
  //       balance: "0",
  //       decimals: 18,
  //       ...egldData,
  //     }
  //   : elrondTokenData;

  // // const finalData = [...elrondTokenData, data];
  // elrondTokenData.push(data);

  return {
    accountTokens: elrondTokenData,
    errorAccountTokens: elrondTokenError,
    isLoadingAccountTokens: elrondTokenLoading,
  };
};

export default useGetAccountTokens;
