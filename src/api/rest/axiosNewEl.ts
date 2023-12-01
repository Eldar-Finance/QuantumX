import axios from "axios";
import { network } from "../net.config";
const BASE_URL = "https://next-api.multiversx.com";

const axiosNewEl = axios.create({
  baseURL: BASE_URL,
});

export default axiosNewEl;
