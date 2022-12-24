import axios from "axios";

const axiosEldar2 = axios.create({
  baseURL: "https://admin.21gramsbox.gr/eldar",
});

export default axiosEldar2;

export const fetchApr = async (aprEndpoint) => {
  const res = await axiosEldar2.get(aprEndpoint);
  return res.data;
};
