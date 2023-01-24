import { Box, Flex, Grid, useDisclosure, VStack } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import NewFarmModal from "views/Panel/components/PanelTable/NewFarmModal";
import AddEarner from "./AddEarner/AddEarner";
import Creators from "./Creators/Creators";
import EarnersTable from "./EarnersTable/EarnersTable";
import Fees from "./Fees/Fees";
import PuaseButton from "./PuaseButton/PuaseButton";
import RemoveEarner from "./RemoveEarner/RemoveEarner";
import ResumeButton from "./ResumeButton/ResumeButton";
import RewardToken from "./RewardToken/RewardToken";
import StakedTokens from "./StakedTokens/Tokens";

const Farms = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box w="full">
      <Grid
        templateColumns={{ xs: "1fr", lg: "1fr 1.5fr", xl: "1fr 1fr" }}
        gap={8}
      >
        <Box>
          <Flex gap={8} alignItems="center" mb={4}>
            <Flex gap={4}>
              <PuaseButton />
              <ResumeButton />
              <ActionButton onClick={onToggle} my={4}>
                New Pool/Farm
              </ActionButton>
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
        <StakedTokens />
        <RewardToken />
        <Creators />
      </VStack>
      <NewFarmModal isOpen={isOpen} onClose={onToggle} />
    </Box>
  );
};

export default Farms;
