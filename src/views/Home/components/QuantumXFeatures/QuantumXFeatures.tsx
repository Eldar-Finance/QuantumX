import { Box, Center, Grid, Heading } from "@chakra-ui/react";
import { FarmIcon, RocketIcon, SwapIcon, ToolIcon } from "components/Icons/ui";
import IconAndButtonBox from "components/InfoBox/IconAndButtonBox";

const QuantumXFeatures = () => {
  return (
    <Box px="20px">
      <Center
        bg="black.dark"
        p="70"
        flexDir={"column"}
        maxW="1320px"
        mx="auto"
        borderRadius="7xl"
      >
        <Heading
          as="h5"
          fontSize={"18px"}
          textAlign="center"
          fontWeight={"400"}
          mb="54px"
        >
          QuantumX is a decentralised platform that provides a tightly
          integrated ecosystem of dApps <br /> aiming to get full advantage of
          the power of MultiversX.
        </Heading>

        <Grid templateColumns={"repeat(4, 1fr)"} gap="20px">
          <IconAndButtonBox
            title="Tools"
            desc="The Ultimate tools forinvestors, traders or fans."
            icon={<ToolIcon fontSize={"24px"} />}
          />

          <IconAndButtonBox
            title="Swap"
            desc="Safe, direct and
            straightforward Swap
            of ESDT tokens."
            icon={<SwapIcon fontSize={"24px"} />}
          />

          <IconAndButtonBox
            title="Farms"
            desc="Access, Manage and Harvest farms
            instantly."
            icon={<FarmIcon fontSize={"24px"} />}
          />

          <IconAndButtonBox
            title="DCA"
            desc="One-click Personalised
            or Predefined DCA Portfolios."
            icon={<RocketIcon fontSize={"24px"} />}
          />
        </Grid>
      </Center>
    </Box>
  );
};

export default QuantumXFeatures;
