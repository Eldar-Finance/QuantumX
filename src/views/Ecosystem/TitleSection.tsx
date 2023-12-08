import { Center, Heading , Image, Link } from "@chakra-ui/react";

const TitleSection = () => {
  return (
    <Center textAlign={"center"} flexDir="column">
      <Heading mb={8} as="h1" fontSize={"3xl"}>
        MultiversX Ecosystem
      </Heading>

      

      <Link href="https://bop.ashswap.io?ref=VzYUCcDZFt" isExternal>
      <img
        src="https://i.postimg.cc/dtHrQxks/Screenshot-2023-12-06-at-4-58-50-PM-copy.jpg"
        alt="Description of the image content"
        style={{ borderRadius: '25px', width: '100%' }}
      />
    </Link>
    </Center>
  );
};

export default TitleSection;
