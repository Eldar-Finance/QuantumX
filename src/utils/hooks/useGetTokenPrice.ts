import { formatTokenI } from "utils/functions/tokens";
import useGetElrondToken from "./useGetElrondToken";
import { useGetFarmsLpPrices } from "./useGetFarmsLpPrices";
const useGetTokenPrice = (tokenIdentifier) => {
  const { prices: lpPrices, isLoading } = useGetFarmsLpPrices();
  const isLpPrice = Boolean(
    lpPrices.find((lpToken) => lpToken.token === formatTokenI(tokenIdentifier))
  );

  const { token } = useGetElrondToken(
    isLpPrice || isLoading ? null : tokenIdentifier
  );
  let tokenPrice = 0;

  if (token) {
    tokenPrice = token.price;
  }
  if (isLpPrice) {
    const price = lpPrices?.find(
      (item) => item.token === formatTokenI(tokenIdentifier)
    );
    if (price) {
      tokenPrice = Number(price.price);
    }
  }
  return [tokenPrice];
};

export default useGetTokenPrice;
