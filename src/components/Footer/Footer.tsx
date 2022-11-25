import { Box, Center, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import footerImage from "assets/ui-elemts/footer-bg.png";
import MyContainer from "components/Container/Container";
import NextImage from "components/NextImage/NextImage";
import { breakpoints } from "theme/chakra";
import SocialBox from "./SocialBox";
const Footer = () => {
  const [isLargerThanLg] = useMediaQuery(`(min-width: ${breakpoints["xl"]})`);

  return (
    <Center
      flexDir={"column"}
      w="full"
      pt={"230px"}
      pb={"30px"}
      position="relative"
    >
      <Box
        w="full"
        bottom={0}
        position={isLargerThanLg ? "absolute" : "static"}
        zIndex={-1}
      >
        <NextImage src={footerImage} alt="" fill={!isLargerThanLg} />
      </Box>
      <MyContainer
        justifyContent={"center"}
        display="flex"
        flexDir={"column"}
        alignItems="center"
      >
        <Flex
          gap={{ xs: "20px", lg: "70px" }}
          mb="20px"
          justifyContent={"space-between"}
          w="full"
          maxW={"600px"}
        >
          <SocialBox />
          <SocialBox />
          <SocialBox />
        </Flex>

        <Text fontWeight={"500"} fontSize={"30px"}>
          Quantum X{" "}
        </Text>
      </MyContainer>
    </Center>
  );
};

export default Footer;
