import { Center, Heading , Image, Link, Text } from "@chakra-ui/react";

const TitleSection = () => {
  return (
    <Center textAlign={"center"} flexDir="column">

      <Heading as="h1" fontSize={"3xl"} mb="1">
        MultiversX Ecosystem
      </Heading>
      
      <Text fontSize={"md"} color="white.400" mb="10">
        A quick view into the ecosystem&apos;s tokens (excluding EGLD).
      </Text>

      <Link  href="https://bop.ashswap.io?ref=VzYUCcDZFt" isExternal>
        <Image
          src="https://i.postimg.cc/dtHrQxks/Screenshot-2023-12-06-at-4-58-50-PM-copy.jpg"
          alt="Description of the image content"
          style={{ borderRadius: '25px', width: '100%'}}
          height={{sm: "50px", md: "130px"}}
        />
      </Link>

    </Center>
  );
};

export default TitleSection;
