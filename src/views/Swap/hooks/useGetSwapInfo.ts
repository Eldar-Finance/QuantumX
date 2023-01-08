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
const useGetSwapInfo = () => {
  const fromToken = useAppSelector(selectFromToken);
  const toToken = useAppSelector(selectToToken);
  const fromTokenValue = useAppSelector(selectFromTokenValue);

  const [value] = useDebounce(fromTokenValue, 800);

  const { data, error, isLoading } = useSWR(
    fromToken && fromTokenValue && toToken
      ? [
          fromToken === "EGLD" ? toknesID.wegld : fromToken,
          value,
          toToken === "EGLD" ? toknesID.wegld : toToken,
        ]
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
