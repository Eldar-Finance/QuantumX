import { scQuery } from "api/sc/queries";

export const fetchFarmsFees = async () => {
  const res = await scQuery("farms2", "getFees");

  const data = res.firstValue.valueOf();
  console.log("data", data);

  return data;
};
