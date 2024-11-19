import { formatTokenI } from "utils/functions/tokens";
import { useGetFarmsLpPrices } from "./useGetFarmsLpPrices";
import useGetMultipleElrondTokens from "./useGetMultipleElrondTokens";
import useGetApiTokensPrices from "./useGetApiTokensPrices";

const useGetMultiplePrices = (tokensIdentifiers: string[]) => {
  const { prices: lpPrices, isLoading } = useGetFarmsLpPrices();
  const { tokens } = useGetMultipleElrondTokens(tokensIdentifiers);
  const { apiTokens } = useGetApiTokensPrices();

  const pricesData = tokensIdentifiers.map((idenfier) => {
    let price = 0;
    const lpPrice = lpPrices.find((lp) => lp.token === formatTokenI(idenfier));
    if (lpPrice) {
      price = Number(lpPrice.price);
    } else {
      const elrondToken = tokens.find(
        (etoken) => etoken.identifier === idenfier
      );
      price = elrondToken?.price || 0;

      if (price == 0) {

        const ourApiToken = apiTokens.find(
          (token) => token.tokenA === idenfier
        );

        price = Number(ourApiToken?.tokenAprice) || 0;
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
