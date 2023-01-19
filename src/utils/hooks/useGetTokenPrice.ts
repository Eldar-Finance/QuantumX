import { getMaiarTokens } from "api/rest/others/MaiarTokens";
import useSwr from "swr";
import { useGetFarmsLpPrices } from "./useGetFarmsLpPrices";
const useGetTokenPrice = (token, secondToken = "USDC") => {
  const { prices } = useGetFarmsLpPrices();
  const { data, error } = useSwr([token, secondToken], getMaiarTokens, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      console.log(error);
      console.log("key", key);

      // Never retry on 400.
      if (error.response.status === 400) return;

      // Only retry up to 10 times.
      if (retryCount >= 2) return;

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  let tokenPrice = 0;

  if (data) {
    tokenPrice = data.data.value;
  }
  if (error && secondToken === "USDC") {
    const price = prices?.find((item) => item.token === token);
    if (price) {
      tokenPrice = Number(price.price);
    }
  }
  return [tokenPrice];
};

export default useGetTokenPrice;
