import { Box, Flex, Icon, Text, useBreakpoint, useBreakpointValue, useMediaQuery,Divider, VStack, HStack, Center, Portal, Grid, GridItem } from "@chakra-ui/react";
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
import React, { useState, useEffect } from 'react';
import CoinTab2 from "views/Dashboard/components/Dashtabs/WalletTab/CoinTab2";
import { FiLogOut } from 'react-icons/fi'; // Assuming you're using react-icons for the icon
import { Modal, ModalOverlay, ModalContent, useDisclosure } from "@chakra-ui/react";
import BuyTab from "views/Dashboard/components/Dashtabs/BuyTab/BuyTab"; //
import { AiTwotoneEuroCircle } from "react-icons/ai";
import { FaExternalLinkAlt, FaHashtag } from "react-icons/fa";
import { PiBridgeThin } from "react-icons/pi";

import MobileMenu from './MobileMenu';

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
  const router = useRouter();
  
  useEffect(() => {
    console.log("Navbar component mounted");
  }, []);

  const dispatch = useAppDispatch();
  const location = useRouter().asPath;
  const { isLoggedIn } = useGetLoginInfo();
  const [isLargerThanLg] = useMediaQuery(`(min-width: ${breakpoints["md"]})`);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isBuyCryptoModalOpen, setIsBuyCryptoModalOpen] = useState(false);
  const [isBridgeModalOpen, setIsBridgeModalOpen] = useState(false);
  const [isMobile] = useMediaQuery(`(max-width: ${breakpoints.md})`);

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
        
        <Portal>
          <MenuList
            bg={"black.baseDark"}
            minWidth="340px"
            width="full"
            px={4}
            mt={2}
            border={"none"}
            borderRadius={"xl"}
            boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.8)"}
            fontSize={"md"}
            position="absolute"
            left={{sm: "-150px", md: "-85px"}}
            zIndex={99999}  // Increased z-index even further
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

            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={2}
              pt={2}
              width="100%"
            >
              <GridItem>
                <Button pt={1} leftIcon={<Icon as={AiTwotoneEuroCircle} mb={1} boxSize={"20px"}/>} variant={"ghost"} onClick={() => setIsBuyCryptoModalOpen(true)} width="100%">Buy Crypto</Button>
              </GridItem>
              <GridItem>
                <Button pt={1} leftIcon={<Icon as={PiBridgeThin} mb={1} boxSize={"20px"}/>} variant={"ghost"} onClick={() => setIsBridgeModalOpen(true)} width="100%">Bridge</Button>
              </GridItem>
              <GridItem>
                <QTagButton leftIcon={<Icon as={FaHashtag} mb={1} boxSize={"20px"}/>} width="100%"/>
              </GridItem>
              <GridItem>
                <Button pt={1} leftIcon={<Icon as={FiLogOut} mb={1} boxSize={"20px"}/>} variant={"ghost"} onClick={handleLogout} width="100%">Disconnect</Button>
              </GridItem>
            </Grid>

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
        </Portal>
      </Menu>
    )
  }

  // Force re-render on route change
  useEffect(() => {
    const handleRouteChange = () => {
      // This empty function will trigger a re-render
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <Box 
      position="relative" 
      zIndex={0} 
      width="100%" 
      bg="black.light"
      borderRadius={{ base: "xl", "2xl": "3xl" }}
    >
      <motion.div initial={{ y: 0 }} animate={{ y: 0 }}>
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
                <Link href="/home">
                  <NextImage src={logo} alt="QuantumX" width={120} />
                </Link>
                <Flex alignItems="center" justifyContent="flex-end" flex="1" gap={2}>
                  <Box>
                    {isLoggedIn ? (
                      LoggedInMenu()
                    ) : (
                      <ActionButton
                        onClick={handleConnect}
                        px={12}
                      >
                        Connect
                      </ActionButton>
                    )}
                  </Box>
                </Flex>
              </Flex>
              {/* Keep Menu1 for non-mobile devices */}
              {!isMobile && <Box w="fit"><Menu1 currentPath={router.asPath} /></Box>}
            </Flex>  
          )}
          {isLargerThanLg && (
            <Flex w="full" alignItems="center" justifyContent="space-between" gap="10px">
              <Link href={"/home"}>
                <NextImage src={logo} alt="QuantumX" width={168} height={38}/>
              </Link>
              {/* {isLoggedIn && <Box ml="20px" />} */}
              <Box 
                w="fit-content" 
                m="auto" 
                flex="1" 
                display="flex" 
                justifyContent="center"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex={10000}
              >
                <Menu1 currentPath={router.asPath} />
              </Box>
              <Box>
                {isLoggedIn ? (
                  LoggedInMenu()
                ) : (
                  <ActionButton
                    onClick={handleConnect}
                    px={14}
                  >
                    Connect
                  </ActionButton>
                )}
              </Box>
            </Flex>
          )}
        </MyContainer>
        {isMobile && <MobileMenu />}
      </motion.div>
    </Box>
  );
};

export default Navbar;
