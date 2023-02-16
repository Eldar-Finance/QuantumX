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
