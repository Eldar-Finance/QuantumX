import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import Badge from "components/Badge/Badge";
import { DotsIcon } from "components/Icons/ui";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { isActiveRoute, routesArr } from "utils/routes";
import ModalMenu from "../ModalMenu/ModalMenu";
import { ImageQxAshFire } from "views/Swap/Swap";
import { useEffect, useState } from "react";

interface Menu1Props {
  currentPath: string;
}

const Menu1: React.FC<Menu1Props> = ({ currentPath: initialPath }) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    setCurrentPath(router.asPath);
  }, [router.asPath]);

  const isActive = (path) => {
    if (!path || !currentPath) return false;
    return isActiveRoute(path, currentPath);
  };

  const handleNavigation = (e, path) => {
    e.preventDefault();
    router.push(path, undefined, { shallow: true });
  };

  if (!routesArr || routesArr.length === 0) {
    console.error("routesArr is undefined or empty");
    return null;
  }

  return (
    <Flex
      px={{ xs: "20px", lg: "40px" }}
      py="15px"
      bg="black.baseDark"
      gap={{ xs: "30px", md: "50px" }}
      alignItems={"center"}
      borderRadius={"full"}
      position="relative"
      fontSize={{ xs: "sm", md: "inherit" }}
    >
      {routesArr.map((route) => {
        if (!route || route.onModal || route.onModalAndNavbar) {
          return null;
        }
        const active = isActive(route.path);
        return (
          <Link href={route.path} key={route.path} onClick={(e) => handleNavigation(e, route.path)}>
            <Flex position="relative">
              <Box color={active ? "main" : undefined}>{route.name}</Box>

              {route.isNew && (
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

              {route.name === "Swap" && (
                <ImageQxAshFire
                  width={{sm: "20px", md: "30px"}}
                  transform="translate(-80%, -30%)"
                />
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
          if (!route || !route.onModalAndNavbar) {
            return null;
          }

          const active = isActive(route.path);

          return (
            <Link href={route.path} key={route.path}>
              <Flex position={"relative"}>
                <Box color={active ? "main" : undefined}>{route.name}</Box>
                {route.isNew && <Badge text="NEW" />}{" "}
              </Flex>
            </Link>
          );
        })}
      </Flex>
      <DotsIcon cursor={"pointer"} fontSize={"16px"} onClick={onOpen} />

      <AnimatePresence>
        {isOpen && (
          <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            zIndex={9999}
          >
            <ModalMenu key="modal-menu" onClose={onClose} />
          </Box>
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default Menu1;
