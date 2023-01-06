import { Center, Heading } from "@chakra-ui/react";

const TitleSection = () => {
  return (
    <Center textAlign={"center"} flexDir="column">
      <Heading mb={8} fontWeight="900" fontSize={"4xl"}>
        QuantumXHub
      </Heading>
      <Heading fontSize={"xl"} color="white.600">
        An exlusive NFT Minter for teams to leverage their projects
      </Heading>
    </Center>
  );
};

export default TitleSection;
