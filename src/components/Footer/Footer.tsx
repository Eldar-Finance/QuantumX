import { Box, Center, Flex, Text } from "@chakra-ui/react";
import footerImage from "assets/ui-elemts/footer-bg.png";
import NextImage from "components/NextImage/NextImage";
import SocialBox from "./SocialBox";
const Footer = () => {
  return (
    <Center
      flexDir={"column"}
      w="full"
      pt={"100px"}
      pb={"50px"}
      position="relative"
    >
      <Box w="full" bottom={0} position="absolute" zIndex={-1}>
        <NextImage src={footerImage} alt="" />
      </Box>
      <Flex gap={"50px"} mb="40px">
        <SocialBox />
        <SocialBox />
        <SocialBox />
      </Flex>

      <Text fontWeight={"500"} fontSize={"30px"}>
        Quantum X{" "}
      </Text>
    </Center>
  );
};

export default Footer;
