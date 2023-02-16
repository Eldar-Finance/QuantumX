import { Center, Heading } from "@chakra-ui/react";

const TitleSection = () => {
  return (
    <Center textAlign={"center"} flexDir="column">
      <Heading mb={8} as="h1" fontSize={"3xl"}>
        QuantumXHub
      </Heading>
      <Heading fontSize={"md"} color="white.400">
        An exclusive NFT Minter for teams to leverage their projects
      </Heading>
    </Center>
  );
};

export default TitleSection;
