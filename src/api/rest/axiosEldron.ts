import axios from "axios";
import { network } from "../net.config";

const BASE_URL = network.apiAddress;

const axiosEldron = axios.create({
  baseURL: BASE_URL,
});

export default axiosEldron;
