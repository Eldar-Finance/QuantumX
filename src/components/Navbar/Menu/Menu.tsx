import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { DotsIcon } from "components/Icons/ui";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { isActiveRoute, routesArr } from "utils/routes";
import ModalMenu from "../ModalMenu/ModalMenu";

const Menu = () => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const location = useRouter().asPath;

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
      {routesArr.map((route) => {
        if (route.onModal || route.onModalAndNavbar) {
          return null;
        }
        const isActive = isActiveRoute(route.path, location);
        return (
          <Link href={route.path} key={route.path}>
            <Flex position="relative">
              <Box color={isActive && "main"}>{route.name}</Box>

              {route.new && (
                <Box
                  position={"absolute"}
                  top={"-10px"}
                  right={"-20px"}
                  bg="main"
                  color="black"
                  fontSize={"xs"}
                  rounded={"full"}
                  px={1}
                  fontWeight="bold"
                >
                  NEW
                </Box>
              )}
            </Flex>
          </Link>
        );
      })}

      <Flex
        display={{ xs: "none", lg: "flex" }}
        gap={{ xs: "30px", md: "50px" }}
        alignItems="center"
      >
        {routesArr.map((route) => {
          if (!route.onModalAndNavbar) {
            return null;
          }

          const isActive = isActiveRoute(route.path, location);

          return (
            <Link href={route.path} key={route.path}>
              <Flex position={"relative"}>
                <Box color={isActive && "main"}>{route.name}</Box>
                {route.new && (
                  <Box
                    position={"absolute"}
                    top={"-10px"}
                    right={"-20px"}
                    bg="main"
                    color="black"
                    fontSize={"xs"}
                    rounded={"full"}
                    px={1}
                    fontWeight="bold"
                  >
                    NEW
                  </Box>
                )}{" "}
              </Flex>
            </Link>
          );
        })}
      </Flex>
      <DotsIcon cursor={"pointer"} fontSize={"16px"} onClick={onOpen} />

      <AnimatePresence>
        {isOpen && <ModalMenu onClose={onClose} />}
      </AnimatePresence>
    </Flex>
  );
};

export default Menu;
