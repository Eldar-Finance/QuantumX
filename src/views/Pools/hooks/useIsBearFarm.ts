import { scQuery } from "api/sc/queries";
import useSwr from "swr";
import { IScFarmItem } from "utils/types/sc.interface";
const useIsBearFarm = (farm: IScFarmItem): boolean => {
  const { data } = useSwr<number[]>("farms2:srbBoostedFarms", async () => {
    const res = await scQuery("farms2", "srbBoostedFarms");
    const resData = res.firstValue?.valueOf()?.map((farmId) => {
      return farmId?.toNumber();
    });

    return resData as number[];
  });

  return data?.includes(farm.farm.farmId);
};

export default useIsBearFarm;
