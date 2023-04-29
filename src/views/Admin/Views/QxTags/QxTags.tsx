import { Box, Flex, Grid, VStack } from "@chakra-ui/react";
import AddEarner from "./AddEarner/AddEarner";
import EarnersTable from "./EarnersTable/EarnersTable";
import StakedTokens from "./Extensions/Extensions";
import PuaseButton from "./PuaseButton/PuaseButton";
import RegisterExtension from "./RegisterExtension/RegisterExtension";
import RegisterTag from "./RegisterTag/RegisterTag";
import RegisterUsername from "./RegisterUsername/RegisterUsername";
import RemoveEarner from "./RemoveEarner/RemoveEarner";
import ResumeButton from "./ResumeButton/ResumeButton";
import UsernameUpdateCost from "./UsernameUpdateCost/UsernameUpdateCost";

const QxTags = () => {
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
          <RegisterTag />
          <RegisterUsername />
          <RegisterExtension />
        </Box>
        <Flex flexDir={"column"} rowGap={8}>
          <EarnersTable />
          <UsernameUpdateCost />
        </Flex>
      </Grid>

      <VStack spacing="20" w="full">
        <StakedTokens />
      </VStack>
    </Box>
  );
};

export default QxTags;
