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
export const fetchSmartSwap = async ([tokenA, amountA, tokenB, isSapwToLp]: [
  string,
  string,
  string,
  boolean
]) => {
  const { data } = await api.get<ISmartSwapData[]>(
    isSapwToLp
      ? "https://eldar.solutions/api/pathfinderlp.php"
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
