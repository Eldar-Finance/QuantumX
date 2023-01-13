import { Box, Text } from "@chakra-ui/react";
import BadgesCard from "./components/BadgesCard/BadgesCard";

const SftsStaking = () => {
  return (
    <Box width={"full"}>
      <Text
        as={"h1"}
        fontSize="4xl"
        fontWeight={"extrabold"}
        textAlign="center"
      >
        QuantumX Rewards
      </Text>
      <Text
        as={"h3"}
        fontWeight="extrabold"
        fontSize="xl"
        mb={5}
        textAlign="center"
      >
        Support QuantumX and earn rewards just by holding your SFTs forever.
      </Text>
      <BadgesCard />
    </Box>
  );
};

export default SftsStaking;
