import { toknesID } from "api/net.config";
import { fetchSmartSwap } from "api/rest/others/EldarSolutions";
import {
  selectFromToken,
  selectFromTokenValue,
  selectToToken,
} from "redux/slices/smartSwaps/smartSwaps";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import { useAppSelector } from "utils/hooks/redux";
import useIsSmarSwapLp from "./useIsSmarSwapLp";
const useGetSwapInfo = () => {
  const fromToken = useAppSelector(selectFromToken);
  const toToken = useAppSelector(selectToToken);
  const fromTokenValue = useAppSelector(selectFromTokenValue);
  const isSapwToLp = useIsSmarSwapLp(toToken);
  const [value] = useDebounce(fromTokenValue, 800);

  const { data, error, isLoading } = useSWR(
    fromToken && fromTokenValue && toToken
      ? [
          fromToken === "EGLD" ? toknesID.wegld : fromToken,
          value,
          toToken === "EGLD" ? toknesID.wegld : toToken,
          isSapwToLp,
        ]
      : null,
    fetchSmartSwap
  );

  return {
    data,
    error,
    isLoading,
    isSapwToLp,
  };
};

export default useGetSwapInfo;
