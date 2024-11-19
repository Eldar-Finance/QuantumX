import { Box, Flex, Grid, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

import { useAppDispatch } from "utils/hooks/redux";
import AddEarner from "./components/AddEarner/AddEarner";
import AddToken from "./components/AddToken/AddToken";
import EarnersTable from "./components/EarnersTable/EarnersTable";
import Fees from "./components/Fees/Fees";
import PuaseButton from "./components/PuaseButton/PuaseButton";
import RemoveEarner from "./components/RemoveEarner/RemoveEarner";
import RemoveToken from "./components/RemoveToken/RemoveToken";
import ResumeButton from "./components/ResumeButton/ResumeButton";

const SmartSwap = () => {

  return (
    <Box flexDir={"column"} gap="50px" w="full">
      <AddToken />
      <RemoveToken />
      <Box w="full" mt={10}>
        <Grid
          templateColumns={{ xs: "1fr", lg: "1fr 1.5fr", xl: "1fr 1fr" }}
          gap={8}
        >
          <Box>
            <Flex gap={8} alignItems="center" mb={4}>
              <Flex gap={4} flexWrap="wrap">
                <PuaseButton />
                <ResumeButton />
              </Flex>
            </Flex>

            <AddEarner />
            <RemoveEarner />
          </Box>
          <Flex flexDir={"column"} rowGap={8}>
            <EarnersTable />
          </Flex>
        </Grid>
        <VStack spacing="20" w="full">
          <Fees />
        </VStack>
      </Box>
    </Box>
  );
};

export default SmartSwap;
