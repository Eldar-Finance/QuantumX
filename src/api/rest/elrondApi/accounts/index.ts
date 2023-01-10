import axiosEldron from "api/rest/axiosEldron";
import {
  IElrondAccountToken,
  IElrondNFT,
  IElrondUserAccount,
} from "utils/types/elrond.interface";

export const getTokens = async (address: string, size?: number) => {
  return await axiosEldron.get(
    `/accounts/${address}/tokens?size=${size || 200}`
  );
};
export const fetchAccountTokenById = async ([identifier, address]: [
  string,
  string
]): Promise<IElrondAccountToken> => {
  const res = await axiosEldron.get<IElrondAccountToken>(
    `/accounts/${address}/tokens/${identifier}`
  );
  return res.data;
};
export const getTokensByNfts = async (address, nfts) => {
  return await axiosEldron.get(`/accounts/${address}/nfts/${nfts}`);
};
export const getMexPairs = async () => {
  return await axiosEldron.get("/mex-pairs");
};
export const getEgldBalance = async (address): Promise<IElrondUserAccount> => {
  const res = await axiosEldron.get<IElrondUserAccount>(`/accounts/${address}`);
  return res.data;
};
export const getNfts = async ({
  address,
  parameters,
}: {
  address: string;
  parameters?: {
    collections?: string;
    size?: number;
  };
}) => {
  const res = await axiosEldron.get<IElrondNFT[]>(`/accounts/${address}/nfts`, {
    params: {
      size: parameters?.size || 1000,
      ...parameters,
    },
  });
  return res.data;
};
