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

const useGetSwapInfo = (
  fromTokenProp?: string,
  toTokenProp?: string,
  fromTokenValueProp?: string,
  lp?: boolean
) => {
  const swapFromToken = useAppSelector(selectFromToken);
  const swapToToken = useAppSelector(selectToToken);
  const swapFromTokenValue = useAppSelector(selectFromTokenValue);

  const toToken = toTokenProp ?? swapToToken;
  const fromToken = fromTokenProp ?? swapFromToken;
  const fromTokenValue = fromTokenValueProp ?? swapFromTokenValue;

  const isToTokenLp = useIsSmarSwapLp(toToken);
  const isSwapToLp = lp || isToTokenLp;

  const [value] = useDebounce(fromTokenValue, 800);

  const { data, error, isLoading } = useSWR(
    fromToken && fromTokenValue && toToken
      ? [
          fromToken === "EGLD" ? toknesID.wegld : fromToken,
          value,
          toToken === "EGLD" ? toknesID.wegld : toToken,
          isSwapToLp,
        ]
      : null,
    fetchSmartSwap
  );

  return {
    data,
    error,
    isLoading,
    isSwapToLp,
  };
};

export default useGetSwapInfo;
