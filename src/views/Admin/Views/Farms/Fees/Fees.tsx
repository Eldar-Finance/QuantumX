import { Box, Divider, SimpleGrid } from "@chakra-ui/react";
import CurrentFees from "./CurrentFees/CurrentFees";
import SetFee from "./SetFee/SetFee";
import CustomHarvestFees from "./CustomHarvestFees/CustomHarvestFees";
import SetCustomHarvestFee from "./CustomHarvestFees/SetCustomHarvestFee";

const Fees = () => {
  return (
    <Box w="full">
      <CurrentFees />
      <Divider mt={6} mb={4} />

      <SimpleGrid columns={{ xs: 1, lg: 3 }} gap={14}>
        <SetFee feeLabel="general" title="General Fee" scFunc="setFee" />
        <SetFee feeLabel="harvest" title="Harvest Fee" scFunc="setHarvestFee" />
        <SetFee
          feeLabel="creator"
          title="Creator Fee"
          scFunc="setCreatorCharge"
          isAmount
        />
        <SetFee
          feeLabel="creation"
          title="Farm Creation Fee"
          scFunc="setFarmCreationCharge"
          isAmount
        />
        <CustomHarvestFees />
        <SetCustomHarvestFee
          feeLabel="customHarvest"
          title="Set Custom Harvest Fee"
        />
      </SimpleGrid>
    </Box>
  );
};

export default Fees;
