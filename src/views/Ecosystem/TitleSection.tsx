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

      <Link marginTop={"30px"} href="https://valoro.fund?referral=cryptomurmura20" isExternal>
            <Image
              src="https://i.postimg.cc/ZqVRrKv2/valoro-banner.png"
              alt="Description of the image content"
              style={{ borderRadius: '25px', width: '100%'}}
              height={{sm: "50px", md: "130px"}}
            />
          </Link>

    </Center>
  );
};

export default TitleSection;
