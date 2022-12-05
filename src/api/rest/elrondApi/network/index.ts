import axiosEldron from "api/rest/axiosEldron";
import { IElrondEconomics, IElrondStats } from "utils/types/elrond.interface";

export const getNetworkStats = async () => {
  return await axiosEldron.get<IElrondStats>("/stats");
};
export const getEconomics = async () => {
  return await axiosEldron.get<IElrondEconomics>("/economics");
};
