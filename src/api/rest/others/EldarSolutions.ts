import axios from "axios";
import { ISmartSwapData } from "utils/types/others.interface";
const BASE_URL = "https://api.web3ninja.eu/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;

interface ILpPrice {
  token: string;
  tokenvalue: string;
}

interface ITokenPrice {
  tokenA: string;
  tokenAprice: string;
  tokenB: string;
  tokenBprice: string;
  contract: string;
}

interface IEligibleAddr {
  address: string;
}

export const fetchSmartSwap = async ([tokenA, amountA, tokenB, isSapwToLp]: [
  string,
  string,
  string,
  boolean
]) => {

  const { data } = await api.get<ISmartSwapData[]>(
    isSapwToLp
      ? "https://api.web3ninja.eu/api/pathfinderlp2.php"
      : `/pathfinder.php`,
    {
      params: {
        tokenA,
        amountA,
        tokenB,
      },
    }
  );

  return data;
};

export const fetchLpPrices = async () => {
  const { data } = await api.get<ILpPrice[]>("/lpapi.php");
  return data;
};

export const fetchSrbNftsByUser = async () => {
  const { data } = await api.get<{ address: string; totalnft: string }[]>(
    "/srbnftapi.php"
  );
  return data;
};
export const fetchTopSmartSwapTokens = async () => {
  const { data } = await api.get<string[]>("/toptokens.php");
  return data;
};

export const fetchAllApiPrices = async () => {
  const { data } = await api.get<ITokenPrice[]>("/pairs.php");
  return data;
};

export const fetchEligibleAddresses = async () => {
  const { data } = await api.get<IEligibleAddr[]>("/eligibilityapi.php");
  return data;
};