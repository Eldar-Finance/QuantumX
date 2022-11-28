import axiosEldar from "api/rest/axiosEldar";

export const getDisplayData = async () => {
  return await axiosEldar.get("/displays/2");
};
