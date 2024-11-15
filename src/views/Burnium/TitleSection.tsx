import { Center, Heading , Image, Link, Text } from "@chakra-ui/react";

const TitleSection = () => {
  return (
    <Center textAlign={"center"} flexDir="column">

      <Heading as="h1" fontSize={"3xl"} mb="1">
        Burnium Membership
      </Heading>
      
      <Text fontSize={"md"} color="white.400" mb="10">
        Burn a QuantumXFlamie , QuantumXHeroes or EldarBadges to become a Burnium Member
      </Text>


    </Center>
  );
};

export default TitleSection;
