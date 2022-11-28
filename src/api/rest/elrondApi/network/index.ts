import axiosEldron from "api/rest/axiosEldron";

export const getNetworkStats = async () => {
  return await axiosEldron.get("/stats");
};
export const getEconomics = async () => {
  return await axiosEldron.get("/economics");
};
