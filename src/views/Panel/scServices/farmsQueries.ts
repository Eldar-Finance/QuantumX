import { scQuery } from "api/sc/queries";

export const fetchFarmsFees = async () => {
  const res = await scQuery("farms2", "getFees");

  const data = res?.firstValue?.valueOf();
  if (data) {
    return {
      earners: data[0].toNumber(),
      creator: data[1].toNumber(),
      farmCreation: data[2].toNumber(),
    };
  } else {
    return {
      earners: 0,
      creator: 0,
      farmCreation: 0,
    };
  }
};
