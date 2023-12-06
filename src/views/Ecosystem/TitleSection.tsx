import { Center, Heading , Image } from "@chakra-ui/react";

const TitleSection = () => {
  return (
    <Center textAlign={"center"} flexDir="column">
      <Heading mb={8} as="h1" fontSize={"3xl"}>
        MultiversX Ecosystem
      </Heading>



              <Image borderRadius={"25px"} width={"50%"}
              src="https://i.postimg.cc/dtHrQxks/Screenshot-2023-12-06-at-4-58-50-PM-copy.jpg" 
              alt="Description of the image content" 
            />
    </Center>
  );
};

export default TitleSection;
