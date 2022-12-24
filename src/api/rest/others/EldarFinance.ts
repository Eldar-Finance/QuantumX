import axios from "axios";
const BASE_URL = "https://eldar.finance/api";

const eldarFinanceApi = axios.create({
  baseURL: BASE_URL,
});

export default eldarFinanceApi;

interface ILpPrice {
  token: string;
  tokenvalue: string;
}
export const fetchLpPrices = async () => {
  const { data } = await eldarFinanceApi.get<ILpPrice[]>("/lpapi.php");
  return data;
};
