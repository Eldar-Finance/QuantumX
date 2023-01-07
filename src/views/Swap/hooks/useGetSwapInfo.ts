import { toknesID } from "api/net.config";
import { fetchSmartSwap } from "api/rest/others/EldarSolutions";

import useSWR from "swr";
import { useDebounce } from "use-debounce";
const useGetSwapInfo = (
  fromToken: string,
  toToken: string,
  fromTokenValue: string
) => {
  const [value] = useDebounce(fromTokenValue, 800);

  const { data, error, isLoading } = useSWR(
    fromToken && fromTokenValue && toToken
      ? [fromToken === "EGLD" ? toknesID.wegld : fromToken, value, toToken]
      : null,
    fetchSmartSwap
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useGetSwapInfo;
