import useSWR from "swr";
import { fetchScHubOffers } from "../services";

const useGetOffers = () => {
  const { data, isLoading, error } = useSWR("getAllOffers", fetchScHubOffers);

  return {
    offers: data,
    isLoading: isLoading,
    error: error,
  };
};

export default useGetOffers;
