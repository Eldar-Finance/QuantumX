import { toknesID } from "api/net.config";
import { formatTokenI } from "utils/functions/tokens";
import { useGetFarmsLpPrices } from "./useGetFarmsLpPrices";
import useGetJexPrice from "./useGetJexPrice";
import useGetMultipleElrondTokens from "./useGetMultipleElrondTokens";

const useGetMultiplePrices = (tokensIdentifiers: string[]) => {
  const { prices: lpPrices, isLoading } = useGetFarmsLpPrices();
  const { tokens } = useGetMultipleElrondTokens(tokensIdentifiers);
  const { jexPrice } = useGetJexPrice(
    tokensIdentifiers.find((id) => id === toknesID.jex)
  );

  const pricesData = tokensIdentifiers.map((idenfier) => {
    let price = 0;
    const lpPrice = lpPrices.find((lp) => lp.token === formatTokenI(idenfier));
    if (lpPrice) {
      price = Number(lpPrice.price);
    } else {
      if (idenfier === toknesID.jex) {
        price = jexPrice;
      } else {
        const elrondToken = tokens.find(
          (etoken) => etoken.identifier === idenfier
        );
        price = elrondToken?.price || 0;
      }
    }
    const data = {
      tokenI: idenfier,
      price: price,
    };

    return data;
  });

  return [pricesData];
};

export default useGetMultiplePrices;
