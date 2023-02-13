import { Box, Divider, SimpleGrid } from "@chakra-ui/react";
import CurrentFees from "./CurrentFees/CurrentFees";
import SetFee from "./SetFee/SetFee";

const Fees = () => {
  return (
    <Box w="full">
      <CurrentFees />
      <Divider mt={6} mb={4} />

      <SimpleGrid columns={{ xs: 1, lg: 3 }} gap={14}>
        <SetFee feeLabel="Fee" title="Fee" scFunc="setFee" />
        <SetFee feeLabel="LP Fee" title="LP Fee" scFunc="setLpFee" />
      </SimpleGrid>
    </Box>
  );
};

export default Fees;
