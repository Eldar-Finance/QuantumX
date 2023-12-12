// import logo from "assets/logos/quantumx.png";
import { Box, Flex, Icon, Text, useBreakpoint, useBreakpointValue, useMediaQuery,Divider, VStack, HStack, Center } from "@chakra-ui/react";
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
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { getWebUrl } from "utils/routes";
import Menu1 from "./Menu/Menu";
import { breakpoints } from "theme/chakra";
import React, { useState } from 'react';
import CoinTab2 from "views/Dashboard/components/Dashtabs/WalletTab/CoinTab2";
import { FiLogOut } from 'react-icons/fi'; // Assuming you're using react-icons for the icon
import { Modal, ModalOverlay, ModalContent, useDisclosure } from "@chakra-ui/react";
import BuyTab from "views/Dashboard/components/Dashtabs/BuyTab/BuyTab"; //
import { AiTwotoneEuroCircle } from "react-icons/ai";
import { FaExternalLinkAlt, FaHashtag } from "react-icons/fa";
import { PiBridgeThin } from "react-icons/pi";




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
import TotalAmount from "views/Dashboard/components/TotalAmount/TotalAmount";
import BuyTab2 from "views/Dashboard/components/Dashtabs/BuyTab/BuyTab2";
import OwnedNfts from "views/Dashboard/components/Dashtabs/NftsTab/OwnedNfts/OwnedNfts";
import OwnedNftsModal from "views/Dashboard/components/Dashtabs/NftsTab/OwnedNfts/OwnedNftsModal/OwnedNfts";

interface IProps {
  onlyConnectButton?: boolean;
}

const Navbar = ({ onlyConnectButton }: IProps) => {
  const dispatch = useAppDispatch();
  const location = useRouter().asPath;
  const { isLoggedIn } = useGetLoginInfo();
  const [isLargerThanLg] = useMediaQuery(`(min-width: ${breakpoints["md"]})`);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isBuyCryptoModalOpen, setIsBuyCryptoModalOpen] = useState(false);
  const [isBridgeModalOpen, setIsBridgeModalOpen] = useState(false);

  const { onClose, onOpen, isOpen } = useDisclosure();

  const handleLogout = () => {
    logout(getWebUrl(location));
  };
  const handleConnect = () => {
    dispatch(openLogin(true));
  };

  const [nrOfNfts, setNrOfNfts] = useState(0);

  const LoggedInMenu = () => {
    return (
      <Menu onOpen={() => setMenuOpen(true)} onClose={() => setMenuOpen(false)}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          size="md"
          bg={"black.baseDark"}
          color={isMenuOpen ? "black" : "white"}
          alignItems={"center"}
          justifyItems={"space-between"}
          borderRadius={"full"}
          position="relative"
          fontSize={{ xs: "sm", md: "inherit" }}
          py={{ xs: 4, md: 6 }}
          px={5}
          gap={2}
        >
          <AddressSection2/>
        </MenuButton>
        
        <MenuList
          bg={"black.baseDark"}
          minWidth="240px"
          width="full"
          px={4}
          mt={2}
          border={"none"}
          // mx={"15"}
          borderRadius={"xl"}
          boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.8)"}
          fontSize={"md"}
          position={{sm: "relative", md: "relative"}}
          left={{sm: "14px", md: "62px"}}
          zIndex={"1000"}
        >

          <Box
            alignContent={"center"}
            px={4}
            py={3}
            borderRadius={"xl"}
            bg={"black.base"}
            mb={3}
            mt={2}
          >
            <AddressSection3/>
          </Box>

          <Box
            alignContent={"center"}
            px={4}
            pt={6}
            borderRadius={"xl"}
            bg={"black.base"}
            my={3}
          >
            <TotalAmount />
            <Divider mb={4} mt={3}/>
            <CoinTab2/>
          </Box>

          <VStack
            align={"flex-start"}
            pt={2}
          >
            <Button pt={1} leftIcon={<Icon as={AiTwotoneEuroCircle} mb={1} boxSize={"20px"}/>} variant={"ghost"} onClick={() => setIsBuyCryptoModalOpen(true)}>Buy Crypto</Button>                    
            <Button pt={1} leftIcon={<Icon as={PiBridgeThin} mb={1} boxSize={"20px"}/>} variant={"ghost"} onClick={() => setIsBridgeModalOpen(true)}>Bridge</Button>
            <QTagButton leftIcon={<Icon as={FaHashtag} mb={1} boxSize={"20px"}/>}/>
            <Button pt={1} leftIcon={<Icon as={FiLogOut} mb={1} boxSize={"20px"}/>} variant={"ghost"} onClick={handleLogout}>Disconnect</Button>
          </VStack>

          <Modal isOpen={isBuyCryptoModalOpen} onClose={() => setIsBuyCryptoModalOpen(false)} isCentered>
            <ModalOverlay />
            <ModalContent>
              <BuyTab />
            </ModalContent>
          </Modal>

          <Modal isOpen={isBridgeModalOpen} onClose={() => setIsBridgeModalOpen(false)} isCentered>
            <ModalOverlay />
            <ModalContent>
              <BuyTab2 />
            </ModalContent>
          </Modal>
        </MenuList>
      </Menu>
    )
  }

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
                LoggedInMenu()
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
                LoggedInMenu()
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
