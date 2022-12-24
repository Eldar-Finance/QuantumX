import { getMaiarTokens } from "api/rest/others/MaiarTokens";
import useSwr from "swr";
import { useGetFarmsLpPrices } from "./useGetFarmsLpPrices";
const useGetTokenPrice = (token, secondToken = "USDC") => {
  const { prices } = useGetFarmsLpPrices();
  const { data, error } = useSwr([token, secondToken], getMaiarTokens);

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
