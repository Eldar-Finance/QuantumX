import { Box, Flex, Grid, useDisclosure, VStack } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import AddEarner from "./AddEarner/AddEarner";
import Creators from "./Creators/Creators";
import EarnersTable from "./EarnersTable/EarnersTable";
import Fees from "./Fees/Fees";
import NewFarmModal from "./NewFarmModal/NewFarmModal";
import PuaseButton from "./PuaseButton/PuaseButton";
import RemoveEarner from "./RemoveEarner/RemoveEarner";
import ResumeButton from "./ResumeButton/ResumeButton";
import RewardToken from "./RewardToken/RewardToken";
import StakedTokens from "./StakedTokens/Tokens";
import AutoHarvest from "./AutoHarvest/AutoHarvest";

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
            <Flex gap={4} flexWrap="wrap">
              <PuaseButton />
              <ResumeButton />
              <ActionButton onClick={onToggle} my={4}>
                New Pool/Farm
              </ActionButton>
              {/* <ClaimFeeButton /> */}
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
        <AutoHarvest/>
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
