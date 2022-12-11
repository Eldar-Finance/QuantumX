import { Center, Divider, Grid, VStack } from "@chakra-ui/react";
import React from "react";
import DepositSproteo from "./Forms/DepositSproteo/DepositSproteo";
import Harvest from "./Forms/Harvest/Harvest";
import UnStakeSProteo from "./Buttons/UnStakeSProteo/UnStakeSProteo";
import WithdrawSproteo from "./Buttons/WithdrawSproteo/WithdrawSproteo";
import Pause from "./Buttons/Pause/Pause";
import Resume from "./Buttons/Resume/Resume";
import HarvestCycle from "./Forms/HarvestCycle/HarvestCycle";
import EliteAddress from "./Forms/EliteAddress/EliteAddress";
import FarmAddress from "./Forms/FarmAddress/FarmAddress";
import MaxTokensPerSProteo from "./Forms/MaxTokensPerSProteo/MaxTokensPerSProteo";
import AddFarmToken from "./Forms/AddFarmToken/AddFarmToken";
import DiustributeRewards from "./Forms/DiustributeRewards/DiustributeRewards";
import SetTokenAsLP from "./Forms/SetTokenAsLP/SetTokenAsLP";
import SetRewardTokenforDualFarm from "./Forms/SetRewardTokenforDualFarm/SetRewardTokenforDualFarm";
import SetFeesCollector from "./Forms/SetFeesCollector/SetFeesCollector";
import BlackList from "./BlackList/BlackList";
import ForceRecoverFunds from "./Forms/ForceRecoverFunds/ForceRecoverFunds";
import ForceWithdraw from "./Forms/ForceWithdraw/ForceWithdraw";
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
        <Harvest />
        <DiustributeRewards />
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
