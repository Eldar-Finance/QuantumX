import { getJexPrice } from "api/rest/others/Jex";
import useSwr from "swr";
const useGetJexPrice = (identifier?: string) => {
  const { data, isLoading, error } = useSwr(
    identifier ? ["jexchange/price", identifier] : null,
    getJexPrice
  );

  return { jexPrice: data, isLoading, error };
};

export default useGetJexPrice;

export const useGetMultiJextPrices = (identifiers: string[]) => {
  const { data, isLoading, error } = useSwr<
    { identifier: string; price: number }[]
  >(
    identifiers ? "jexchange/prices" : null,
    async () => {
      const data = await Promise.all(
        identifiers.map(async (identifier) => {
          const priceData = await getJexPrice(["key", identifier]);

          return {
            identifier,
            price: priceData,
          };
        })
      );
      return data;
    },
    {
      fallback: [],
      fallbackData: [],
    }
  );

  return { jexPrices: data, isLoading, error };
};
