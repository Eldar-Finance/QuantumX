import axiosEldron from "api/rest/axiosEldron";
import { IElrondEconomics } from "utils/types/elrond.interface";

export const getNetworkStats = async () => {
  return await axiosEldron.get("/stats");
};
export const getEconomics = async () => {
  return await axiosEldron.get<IElrondEconomics>("/economics");
};
