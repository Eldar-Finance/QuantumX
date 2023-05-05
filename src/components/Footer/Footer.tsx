import { Box, Center, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import footerImage from "assets/ui-elemts/footer-bg.png";
import MyContainer from "components/Container/Container";
import { BookIcon, TelegramIcon, TwitterIcon } from "components/Icons/ui";
import NextImage from "components/NextImage/NextImage";
import { breakpoints } from "theme/chakra";
import SocialBox from "./SocialBox";
const Footer = () => {
  const [isLargerThanLg] = useMediaQuery(`(min-width: ${breakpoints["xl"]})`);

  return (
    <Center
      as="footer"
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
        display={isLargerThanLg ? "block" : "none"}
      >
        <NextImage
          src={footerImage}
          alt=""
          layout="responsive"
          style={{
            height: "100%",
          }}
        />
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
          justifyContent={"space-around"}
          w="full"
          maxW={"600px"}
          flexWrap={"wrap"}
        >
          <SocialBox
            name="Twitter"
            href="https://twitter.com/QuantumXnetwork"
            icon={<TwitterIcon fontSize={{ xs: "13px", md: "15px" }} />}
          />
          <SocialBox
            name="Telegram"
            href="https://t.me/quantumxnetwork"
            icon={<TelegramIcon fontSize={{ xs: "13px", md: "15px" }} />}
          />
          <SocialBox
            name="Documentation"
            href="http://docs.quantumx.network"
            icon={<BookIcon fontSize={{ xs: "13px", md: "15px" }} />}
          />
        </Flex>

        <Text fontWeight={"500"} fontSize={"30px"}>
          Quantum X{" "}
        </Text>
      </MyContainer>
    </Center>
  );
};

export default Footer;
