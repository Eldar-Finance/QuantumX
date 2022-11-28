import axios from "axios";
import { IElrondnftswapNFT } from "utils/types/others.interface";
const BASE_URL = "https://elrondswap.app/api";

const axiosSwap = axios.create({
  baseURL: BASE_URL,
});

export default axiosSwap;

export const getPairs = async () => {
  return await axiosSwap.get("/pairs");
};

export const getNftData = (nftIdentifier: string) => {
  return axiosSwap
    .get<IElrondnftswapNFT>(`/main/nft/${nftIdentifier}`)
    .then((res) => res.data);
};
