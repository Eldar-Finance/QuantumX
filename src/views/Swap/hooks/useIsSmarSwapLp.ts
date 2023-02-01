import { selectTokens } from "redux/slices/smartSwaps/smartSwaps";
import { useAppSelector } from "utils/hooks/redux";

const useIsSmarSwapLp = (tokenI: string) => {
  const allTokens = useAppSelector(selectTokens);
  const tokensLp: string[] = [
    ...allTokens.usdcWhitelisted,
    ...allTokens.wegldWhitelisted,
  ];
  return tokensLp.includes(tokenI);
};

export default useIsSmarSwapLp;
