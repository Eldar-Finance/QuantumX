import { Center, Heading } from "@chakra-ui/react";

const TitleSection = () => {
  return (
    <Center textAlign={"center"} flexDir="column">
      <Heading mb={8} as="h1" fontSize={"3xl"}>
        QuantumXHeroes
      </Heading>
      <Heading fontSize={"md"} color="white.400">
        An AI-Art Based Project
      </Heading>
    </Center>
  );
};

export default TitleSection;
