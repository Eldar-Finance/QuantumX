import axiosEldron from "api/rest/axiosEldron";
import { IElrondNFT } from "utils/types/elrond.interface";

// export const getFromAllTokens = async () => {
//   return await axiosEldron.get("/tokens?size=10000");
// };
export const getNFTs = async ({
  size = 10000,
  name = undefined,
  identifier = undefined,
  identifiers = undefined,
  search = undefined,
}) => {
  const res = await axiosEldron.get<IElrondNFT[]>("/nfts", {
    params: {
      identifier,
      identifiers,
      name,
      size,
      search,
    },
  });

  return res.data;
};
