import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { DotsIcon } from "components/Icons/ui";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import ModalMenu from "../ModalMenu/ModalMenu";

const Menu = () => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  return (
    <Flex
      px="40px"
      py="15px"
      bg="black.baseDark"
      gap="50px"
      alignItems={"center"}
      borderRadius={"full"}
      position="relative"
    >
      <Link href={"/"}>
        <Box fontWeight={"bold"}>Dashboard</Box>
      </Link>
      <Link href={"/jexpress-swap"}>
        <Box>Swap </Box>
      </Link>
      <Link href={"/farms"}>
        <Box>Farms</Box>
      </Link>
      <Link href={"/proteo-elite"}>
        <Box>Pools</Box>
      </Link>
      <Link href={"/eldar-cost-averaging"}>
        <Box>Dollar Cost Averaging </Box>
      </Link>
      <DotsIcon cursor={"pointer"} fontSize={"16px"} onClick={onOpen} />

      <AnimatePresence>
        {isOpen && <ModalMenu onClose={onClose} />}
      </AnimatePresence>
    </Flex>
  );
};

export default Menu;
