import { Box, Flex, Grid } from "@chakra-ui/react";
import AddEarner from "./components/AddEarner/AddEarner";
import AddToken from "./components/AddToken/AddToken";
import EarnersTable from "./components/EarnersTable/EarnersTable";
import FeesTable from "./components/FeesTable/FeesTable";
import PuaseButton from "./components/PuaseButton/PuaseButton";
import RemoveEarner from "./components/RemoveEarner/RemoveEarner";
import RemoveToken from "./components/RemoveToken/RemoveToken";
import ResumeButton from "./components/ResumeButton/ResumeButton";

const FastSwap = () => {
  return (
    <Box w="full">
      <Grid
        width={"full"}
        gap={8}
        flexWrap="wrap"
        templateColumns={{
          xs: "auto",
          lg: "auto auto",
        }}
        mb={8}
      >
        <Flex flexDir={"column"} gap={8}>
          <PuaseButton />
          <ResumeButton />

          <AddEarner />
          <RemoveEarner />
          <AddToken />
          <RemoveToken />
        </Flex>
        <Box>
          <EarnersTable />
        </Box>
      </Grid>
      <FeesTable />
    </Box>
  );
};

export default FastSwap;
