import useSwr from "swr";
import { IScPayment } from "utils/types/sc.interface";
import { fetchUserNameUpdateCost } from "../services/queries";

export const useGetUserNameUpdateCost = () => {
  const { data, isLoading, error } = useSwr<IScPayment>(
    `tagsWsp:usernameUpdateCost`,
    async () => {
      return await fetchUserNameUpdateCost();
    }
  );

  return {
    usernameUpdateCost: data,
    isLoading,
    error,
  };
};
