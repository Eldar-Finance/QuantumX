import axiosEldron from "api/rest/axiosEldron";

export const getTokens = async (address: string, size?: number) => {
  return await axiosEldron.get(
    `/accounts/${address}/tokens?size=${size || 200}`
  );
};
export const getTokenByAccount = async (address, token) => {
  return await axiosEldron.get(`/accounts/${address}/tokens/${token}`);
};
export const getTokensByNfts = async (address, nfts) => {
  return await axiosEldron.get(`/accounts/${address}/nfts/${nfts}`);
};
export const getMexPairs = async () => {
  return await axiosEldron.get("/mex-pairs");
};
export const getEgldBalance = async (address) => {
  return await axiosEldron.get(`/accounts/${address}`);
};
export const getNfts = async (address: string, size?: number) => {
  // const address =
  //   "erd1jz3hz44njq2cnveqd7r2m8x4p8m283lz3mj9h3am4747fddg9syspp8xd5";
  // const address =
  //   "erd1en90783mdh9kt928qfrt35e7lzqsu9h557j24p3lreu9alkc094qsy4z52";
  return await axiosEldron.get(
    `/accounts/${address}/nfts?size=${size || 1000}`
  );
};
