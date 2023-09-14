import { Box, Flex, Grid, VStack } from "@chakra-ui/react";
import AddEarner from "./AddEarner/AddEarner";
import EarnersTable from "./EarnersTable/EarnersTable";
import PuaseButton from "./PuaseButton/PuaseButton";
import RemoveEarner from "./RemoveEarner/RemoveEarner";
import ResumeButton from "./ResumeButton/ResumeButton";

const Hoot = () => {
  return (
    <Box w="full">
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
    </Box>
  );
};

export default Hoot;
