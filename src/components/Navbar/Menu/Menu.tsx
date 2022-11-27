import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { DotsIcon } from "components/Icons/ui";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import ModalMenu from "../ModalMenu/ModalMenu";

const Menu = () => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  return (
    <Flex
      px={{ xs: "20px", lg: "40px" }}
      py="15px"
      bg="black.baseDark"
      gap={{ xs: "30px", md: "50px" }}
      alignItems={"center"}
      borderRadius={"full"}
      position="relative"
      fontSize={{ xs: "xs", md: "inherit" }}
    >
      <Link href={"/"}>
        <Box color="main">Dashboard</Box>
      </Link>
      <Link href={"/jexpress-swap"}>
        <Box>Swap </Box>
      </Link>
      <Link href={"/farms"}>
        <Box>Farms</Box>
      </Link>
      <Flex
        display={{ xs: "none", lg: "flex" }}
        gap={{ xs: "30px", md: "50px" }}
      >
        <Link href={"/proteo-elite"}>
          <Box>Pools</Box>
        </Link>
        <Link href={"/eldar-cost-averaging"}>
          <Box>Dollar Cost Averaging </Box>
        </Link>
      </Flex>
      <DotsIcon cursor={"pointer"} fontSize={"16px"} onClick={onOpen} />

      <AnimatePresence>
        {isOpen && <ModalMenu onClose={onClose} />}
      </AnimatePresence>
    </Flex>
  );
};

export default Menu;
