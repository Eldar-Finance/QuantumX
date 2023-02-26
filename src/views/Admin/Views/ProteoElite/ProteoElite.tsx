import { Center, Divider, Grid, VStack } from "@chakra-ui/react";
import BlackList from "./BlackList/BlackList";
import Pause from "./Buttons/Pause/Pause";
import Resume from "./Buttons/Resume/Resume";
import UnStakeSProteo from "./Buttons/UnStakeSProteo/UnStakeSProteo";
import WithdrawSproteo from "./Buttons/WithdrawSproteo/WithdrawSproteo";
import AddFarmToken from "./Forms/AddFarmToken/AddFarmToken";
import DepositSproteo from "./Forms/DepositSproteo/DepositSproteo";
import DiustributeRewards from "./Forms/DiustributeRewards/DiustributeRewards";
import EliteAddress from "./Forms/EliteAddress/EliteAddress";
import FarmAddress from "./Forms/FarmAddress/FarmAddress";
import ForceRecoverFunds from "./Forms/ForceRecoverFunds/ForceRecoverFunds";
import ForceWithdraw from "./Forms/ForceWithdraw/ForceWithdraw";
import Harvest from "./Forms/Harvest/Harvest";
import HarvestCycle from "./Forms/HarvestCycle/HarvestCycle";
import MaxTokensPerSProteo from "./Forms/MaxTokensPerSProteo/MaxTokensPerSProteo";
import PrepareUserClaming from "./Forms/PrepareUserClaming/PrepareUserClaming";
import SetFeesCollector from "./Forms/SetFeesCollector/SetFeesCollector";
import SetRewardTokenforDualFarm from "./Forms/SetRewardTokenforDualFarm/SetRewardTokenforDualFarm";
import SetTokenAsLP from "./Forms/SetTokenAsLP/SetTokenAsLP";
const ProteoElite = () => {
  return (
    <Grid
      width={"full"}
      gap={8}
      flexWrap="wrap"
      templateColumns={{
        xs: "auto",
        lg: "auto auto",
      }}
    >
      <VStack spacing={8} divider={<Divider />}>
        <VStack spacing={5}>
          <DiustributeRewards />
          <Harvest />
          <PrepareUserClaming />
        </VStack>
        <DepositSproteo />
        <AddFarmToken />
        <FarmAddress />
        <MaxTokensPerSProteo />
        <SetTokenAsLP />
        <SetRewardTokenforDualFarm />
        <SetFeesCollector />
        <EliteAddress />
        <HarvestCycle />
      </VStack>
      <VStack spacing={8} divider={<Divider />}>
        <ForceRecoverFunds />
        <ForceWithdraw />
        <Center flexDir={"column"}>
          <UnStakeSProteo />
          <WithdrawSproteo />
          <Pause />
          <Resume />
        </Center>
        <BlackList />
      </VStack>
    </Grid>
  );
};

export default ProteoElite;
