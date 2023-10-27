import { Box, Divider, SimpleGrid } from "@chakra-ui/react";
import RunAutoHarvest from "./RunAutoHarvest/RunAutoHarvest";

const AutoHarvest = () => {
  return (
    <Box w="full">
      <RunAutoHarvest
        placeholder="Farm ID"
        title="Run Auto Harvest"
        scFunc="forceHarvestAuto"
        isAmount={false}
      />
    </Box>
  );
};

export default AutoHarvest;
