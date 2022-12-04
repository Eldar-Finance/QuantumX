import axiosEldron from "api/rest/axiosEldron";
import { IElrondToken } from "utils/types/elrond.interface";

// export const getFromAllTokens = async () => {
//   return await axiosEldron.get("/tokens?size=10000");
// };
export const getFromAllTokens = async ({
  size = 10000,
  name = undefined,
  identifier = undefined,
  identifiers = undefined,
  search = undefined,
}) => {
  return await axiosEldron.get<IElrondToken[]>("/tokens", {
    params: {
      identifier,
      identifiers,
      name,
      size,
      search,
    },
  });
};

export const getTokenPrice = async (identifier: string) => {
  const res = axiosEldron.get<number>(`/tokens/${identifier}?fields=price`);

  return (await res).data;
};
