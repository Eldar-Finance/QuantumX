import { Box, Flex, Text } from "@chakra-ui/react";
import BadgesCard from "./components/BadgesCard/BadgesCard";
import TitlePage from "components/TitlePage/TitlePage";

const SftsStaking = () => {
  return (
    <Box width={"full"}>
      <TitlePage
          title="QuantumX Rewards"
          subtitle={
            <Flex
              as="span"
              alignItems={"center"}
              justifyContent="center"
              textAlign="center"
              flexWrap={"wrap"}
            >
              <Text>
                Support QuantumX and earn rewards just by holding your SFTs forever.
              </Text>
            </Flex>
          }
          mb={{sm: 8, md: 8}}
        />
      <BadgesCard />
    </Box>
  );
};

export default SftsStaking;
