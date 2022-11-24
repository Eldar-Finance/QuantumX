import { Box, Center, Grid, Heading } from "@chakra-ui/react";
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
          <IconAndButtonBox />
          <IconAndButtonBox />
          <IconAndButtonBox />
          <IconAndButtonBox />
        </Grid>
      </Center>
    </Box>
  );
};

export default QuantumXFeatures;
