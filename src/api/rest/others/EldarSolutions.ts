import axios from "axios";
import { ISmartSwapData } from "utils/types/others.interface";
const BASE_URL = "https://eldar.solutions/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;

interface ILpPrice {
  token: string;
  tokenvalue: string;
}
export const fetchSmartSwap = async ([tokenA, amountA, tokenB]: [
  string,
  string,
  string
]) => {
  const { data } = await api.get<ISmartSwapData[]>(`/pathfinder.php`, {
    params: {
      tokenA,
      amountA,
      tokenB,
    },
  });
  return data;
};
