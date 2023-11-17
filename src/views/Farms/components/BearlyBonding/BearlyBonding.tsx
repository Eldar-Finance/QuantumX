import { Stack } from "@chakra-ui/react";
import {
  selectAllFarms2,
  selectMultiFarms2RewardsLeft,
} from "redux/slices/farms2/farms2-slice";
import { useAppSelector } from "utils/hooks/redux";
import BearlyCard from "./BearlyCard";

const BearlyBonding = () => {
  const { data: allFarms } = useAppSelector(selectAllFarms2);
  const { data: multifarmRewardsLeft } = useAppSelector(
    selectMultiFarms2RewardsLeft
  );
  const bearlyFarms = allFarms.filter((f) => {
    return f.farm.farmId === 8 && f.farm.rewardToken === "" && f.extraPools.length === 0;
  });

  return (
    <Stack spacing={10}>
      {bearlyFarms.map((farm) => {
        return (
          <BearlyCard
            key={farm.farm.farmId}
            farm={farm}
            multifarmRewardsLeft={multifarmRewardsLeft.find(
              (r) => r.farmId === farm.farm.farmId
            )}
          />
        );
      })}
    </Stack>
  );
};

export default BearlyBonding;
