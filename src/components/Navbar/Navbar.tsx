// import logo from "assets/logos/quantumx.png";
import { Box, Flex, Icon } from "@chakra-ui/react";
import logo from "assets/logos/quantumx.svg";
import ActionButton from "components/ActionButton/ActionButton";
import MyContainer from "components/Container/Container";
import { LightningIcon } from "components/Icons/ui";
import NextImage from "components/NextImage/NextImage";
import Link from "next/link";
import Menu from "./Menu/Menu";
const Navbar = () => {
  return (
    <MyContainer
      bg="black.light"
      borderRadius={{ xs: "xl", lg: "3xl" }}
      py={{ xs: "30px", "2xl": "40px" }}
      px={{ xs: "30px", xl: "80px" }}
      display="flex"
      justifyContent={"space-between"}
      fontSize={{ xs: "sm", "2xl": "md" }}
      flexDir={{ xs: "column", md: "row" }}
      rowGap={3}
    >
      <Flex w="ful" alignItems={"center"} justifyContent="space-between">
        <Link href={"/"}>
          <NextImage src={logo} alt="QuantumX" width={128} height={38} />
        </Link>

        <ActionButton
          fontSize={{ xs: "14px", "2xl": "md" }}
          fontWeight="600"
          display={{ xs: "block", md: "none" }}
        >
          <Icon as={LightningIcon} />
        </ActionButton>
      </Flex>
      <Box w="fit-content">
        <Menu />
      </Box>
      <ActionButton
        px={{ xs: "30px", "2xl": "40px" }}
        fontSize={{ xs: "14px", "2xl": "md" }}
        fontWeight="600"
        display={{ xs: "none", md: "block" }}
      >
        Connect
      </ActionButton>
    </MyContainer>
  );
};

export default Navbar;
