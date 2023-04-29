import useSwr from "swr";
import { fetchUserNameUpdateCost } from "../services/queries";

export const useGetUserNameUpdateCost = () => {
  const { data, isLoading, error } = useSwr<any>(
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
