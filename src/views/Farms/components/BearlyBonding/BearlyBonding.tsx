import { Stack } from "@chakra-ui/react";
import { selectAllFarms2 } from "redux/slices/farms2/farms2-slice";
import { useAppSelector } from "utils/hooks/redux";
import BearlyCard from "./BearlyCard";

const BearlyBonding = () => {
  const { data: allFarms } = useAppSelector(selectAllFarms2);
  const bearlyFarms = allFarms.filter((f) => {
    return f.farm.rewardToken === "";
  });

  return (
    <Stack>
      {bearlyFarms.map((farm) => {
        return <BearlyCard key={farm.farm.farmId} farm={farm} />;
      })}
    </Stack>
  );
};

export default BearlyBonding;
