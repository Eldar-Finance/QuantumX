import axiosEldron from "api/rest/axiosEldron";

export const getCollectionsCount = async (colectionIdentifier: string) => {
  const res = await axiosEldron.get<number>(
    `/collections/${colectionIdentifier}/nfts/count`
  );

  return res.data;
};
