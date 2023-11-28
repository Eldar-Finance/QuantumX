// import logo from "assets/logos/quantumx.png";
import { Box, Flex, Icon, Text, useBreakpoint, useBreakpointValue, useMediaQuery,Divider } from "@chakra-ui/react";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import { logout } from "@multiversx/sdk-dapp/utils";
import logo from "assets/logos/quantumx.svg";
import ActionButton from "components/ActionButton/ActionButton";
import MyContainer from "components/Container/Container";
import { LightningIcon } from "components/Icons/ui";
import NextImage from "components/NextImage/NextImage";
import QTagButton from "components/QTagButton/QTagButton";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { openLogin } from "redux/slices/settings/settings-reducer";
import { useAppDispatch } from "utils/hooks/redux";
import { getWebUrl } from "utils/routes";
import Menu1 from "./Menu/Menu";
import { breakpoints } from "theme/chakra";
import React, { useState } from 'react';
import CoinTab2 from "views/Dashboard/components/Dashtabs/WalletTab/CoinTab2";
import { FiLogOut } from 'react-icons/fi'; // Assuming you're using react-icons for the icon
import { Modal, ModalOverlay, ModalContent, useDisclosure } from "@chakra-ui/react";
import BuyTab from "views/Dashboard/components/Dashtabs/BuyTab/BuyTab"; //
import { AiTwotoneEuroCircle } from "react-icons/ai";
import { FaHashtag } from "react-icons/fa";



import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import AddressSection2 from "views/Dashboard/components/AddressSection/AddessSection2";
import AddressSection3 from "views/Dashboard/components/AddressSection/AdressSection3";

interface IProps {
  onlyConnectButton?: boolean;
}

const Navbar = ({ onlyConnectButton }: IProps) => {
  const dispatch = useAppDispatch();
  const location = useRouter().asPath;
  const { isLoggedIn } = useGetLoginInfo();
  const [isLargerThanLg] = useMediaQuery(`(min-width: ${breakpoints["md"]})`);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    logout(getWebUrl(location));
  };
  const handleConnect = () => {
    dispatch(openLogin(true));
  };

  return (
    <motion.div initial={{ y: -100 }} whileInView={{ y: 0 }}>
      <MyContainer
        bg="black.light"
        borderRadius={{ xs: "xl", "2xl": "3xl" }}
        py={{ xs: "15px", "lg": "40px" }}
        px={!isLargerThanLg ? "15px" : "80px"}
        display="flex"
        justifyContent={onlyConnectButton ? "flex-end" : "space-between"}
        fontSize={{ xs: "sm", "2xl": "md" }}
        flexDir={{ xs: "column", md: "row" }}
        rowGap={1.5}
        columnGap={3}
        alignItems={"center"}
      >
        {!isLargerThanLg && (
          <Flex w="full" alignItems="center" justifyContent="space-between" direction="column" gap="20px">
            <Flex w="full" alignItems="center" justifyContent="space-between">
              <Link href="/">
                <NextImage src={logo} alt="QuantumX" width={100} />
              </Link>
              <Flex alignItems="center" justifyContent="flex-end" flex="1" gap={2}>
              <Box>
              {isLoggedIn ? (
                // Dropdown for the logged-in state
                <Menu onOpen={() => setMenuOpen(true)} onClose={() => setMenuOpen(false)}>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    size="sm"
                    bg={"black.baseDark"}
                    color={isMenuOpen ? "black" : "white"}
                    alignItems={"center"}
                    borderRadius={"full"}
                    position="relative"
                    fontSize={{ xs: "sm", md: "inherit" }}
                  >
                    <AddressSection2/>
                  </MenuButton>
                  <MenuList
                  zIndex={"6"}
                    bg={"black.base"}
                    minWidth="260px"
                    width="auto"
                    p={4}
                    ml={-5}
                    border={"none"}
                  >
                    <Box alignContent={"center"}>
                      <AddressSection3/>
                      <Divider marginBottom={"20px"} paddingTop={"20px"}/>
                    </Box>
                    <Box my={5}>
                      <CoinTab2/>
                      <Divider marginBottom={"20px"} paddingTop={"20px"}/>
                    </Box> 
                    <Button  leftIcon={<Icon as={AiTwotoneEuroCircle} />} fontWeight={"500"}
                    fontSize={{ xs: "14px", "2xl": "md" }}
                    h={{xs: "32px", md: "40px"}} variant={"ghost"} onClick={onOpen}>Buy Crypto</Button>
                    <QTagButton leftIcon={<Icon as={FaHashtag} />}/>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <BuyTab />
                    </ModalContent>
                  </Modal>
                    <Box pl={4} gap={2} as="button" fontWeight={"500"}
                    fontSize={{ xs: "14px", "2xl": "md" }}
                    h={{xs: "32px", md: "40px"}} display="flex" alignItems="center" onClick={handleLogout} width="100%" textAlign="left" paddingY="2">
                    <Box as={FiLogOut} />
                    <Text>Disconnect</Text>
                    </Box>
                  </MenuList>
                </Menu>
              ) : (
                // Regular button for the logged-out state
                <ActionButton
                  onClick={handleConnect}
                  px={5}
                  // size="md"
                >
                  Connect
                </ActionButton>
              )}
            </Box>
              </Flex>
            </Flex>
            <Box w="fit">
              <Menu1 />
            </Box>
          </Flex>  
        )}
        {isLargerThanLg && (
          <Flex w="full" alignItems="center" justifyContent="space-between" gap="10px">
            <Link href={"/"}>
              <NextImage src={logo} alt="QuantumX" width={128} height={38} />
            </Link>
            {isLoggedIn && <Box ml="80px" />}
            <Box w="fit-content" m="auto" flex="1" display="flex" justifyContent="center">
              <Menu1 />
            </Box>
            <Box>
              {isLoggedIn ? (
                // Dropdown for the logged-in state
                <Menu onOpen={() => setMenuOpen(true)} onClose={() => setMenuOpen(false)}>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    size="md"
                    bg={"black.baseDark"}
                    color={isMenuOpen ? "black" : "white"}
                    px={5}
                    py={6}
                    gap={5}
                    alignItems={"center"}
                    borderRadius={"full"}
                    position="relative"
                    fontSize={{ xs: "sm", md: "inherit" }}
                  >
                    <AddressSection2 />
                  </MenuButton>
                  <MenuList
                    bg={"black.base"}
                    minWidth="260px"
                    width="auto"
                    p={4}
                    ml={-5}
                    border={"none"}
                  >
                    <Box alignContent={"center"}>
                      <AddressSection3/>
                      <Divider marginBottom={"20px"} paddingTop={"20px"}/>
                    </Box>
                    <Box my={5}>
                      <CoinTab2/>
                      <Divider marginBottom={"20px"} paddingTop={"20px"}/>
                    </Box> 
                    <Button  leftIcon={<Icon as={AiTwotoneEuroCircle} />} variant={"ghost"} onClick={onOpen}>Buy Crypto</Button>
                    <QTagButton leftIcon={<Icon as={FaHashtag} />}/>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <BuyTab />
                    </ModalContent>
                  </Modal>
                    <Box pl={4} gap={2} as="button" display="flex" alignItems="center" onClick={handleLogout} width="100%" textAlign="left" paddingY="2">
                    <Box as={FiLogOut} />
                    <Text>Disconnect</Text>
                    </Box>
                  </MenuList>
                </Menu>
              ) : (
                // Regular button for the logged-out state
                <ActionButton
                  onClick={handleConnect}
                  px={5}
                  // size="md"
                >
                  Connect
                </ActionButton>
              )}
            </Box>
          </Flex>
        )}
      </MyContainer>
    </motion.div>
  );
};

export default Navbar;
