import {
  Box,
  Center,
  Flex,
  Heading,
  Link as ChakraLink,
  ModalBody,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import AngleRightImg from "assets/ui-elemts/angleRight2.svg";
import { CloseIcon, LegerIcon, MultiversxLogo } from "components/Icons/ui";
import NextImage from "components/NextImage/NextImage";
import MyModal from "../Modal/Modal";

import dynamic from "next/dynamic";
import { openLogin } from "redux/slices/settings/settings-reducer";
import { useAppDispatch } from "utils/hooks/redux";
import { routeNames } from "utils/routes";

const ExtensionLoginButton: any = dynamic(
  async () => {
    return (
      await import("@multiversx/sdk-dapp/UI/extension/ExtensionLoginButton")
    ).ExtensionLoginButton;
  },
  { ssr: false }
);

const LedgerLoginButton: any = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/ledger/LedgerLoginButton"))
      .LedgerLoginButton;
  },
  { ssr: false }
);

const WebWalletLoginButton: any = dynamic(
  async () => {
    return (
      await import("@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton")
    ).WebWalletLoginButton;
  },
  { ssr: false }
);

const WalletConnectLoginButton: any = dynamic(
  async () => {
    return (
      await import(
        "@multiversx/sdk-dapp/UI/walletConnect/WalletConnectLoginButton"
      )
    ).WalletConnectLoginButton;
  },
  { ssr: false }
);

const mobileText = (
  <Flex
    _focusVisible={{
      outline: "none",
    }}
    gap={"2px"}
    h="full"
  >
    {" "}
    <MultiversxLogo fontSize={"12.28px"} mt="4px" /> PORTAL{" "}
  </Flex>
);
const defiWallet = (
  <Flex
    mb={0}
    _focusVisible={{
      outline: "none",
    }}
    gap={"2px"}
  >
    {" "}
    <MultiversxLogo fontSize={"12.28px"} mt="4px" />
    DeFi Wallet
  </Flex>
);
const webWallet = (
  <Flex
    mb={0}
    _focusVisible={{
      outline: "none",
    }}
    gap={"2px"}
  >
    {" "}
    <MultiversxLogo fontSize={"12.28px"} mt="4px" /> Web Wallet{" "}
  </Flex>
);
const legerWallet = (
  <Flex
    alignItems={"center"}
    mb={0}
    _focusVisible={{
      outline: "none",
    }}
    gap={"17px"}
  >
    {" "}
    <LegerIcon />
    Ledger{" "}
  </Flex>
);

const Login = ({ isLoginOpen }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(openLogin(false));
  };
  return (
    <MyModal
      onClose={handleClose}
      isOpen={isLoginOpen}
      size={"lg"}
      overlayProps={{
        backdropFilter: "blur(6px)",
        background: "transparent",
      }}
      background={"black.dark"}
      borderRadius={{ xs: "20px", md: "30px" }}
      p={"40px"}
      isCentered={false}
    >
      <ModalBody zIndex={1} px={0}>
        <Flex direction="column" w="100%" background="transparent" mb={8}>
          <Flex justifyContent={"space-between"}>
            <Heading fontSize="2xl" mb={"22px"} fontWeight="400">
              Connect Wallet{" "}
            </Heading>

            <CloseIcon
              fontSize={"25px"}
              cursor="pointer"
              onClick={handleClose}
            />
          </Flex>
          <Flex flexDir={"column"} alignItems="center" gap={"10px"}>
            {" "}
            <LoginMethod>
              <ExtensionLoginButton
                callbackRoute={routeNames.home}
                loginButtonText={defiWallet}
              />
            </LoginMethod>
            <LoginMethod>
              <WalletConnectLoginButton
                callbackRoute={routeNames.home}
                shouldRenderDefaultCss={false}
                loginButtonText={mobileText}
                isWalletConnectV2={true}
              />
            </LoginMethod>
            <LoginMethod>
              <WebWalletLoginButton
                callbackRoute={routeNames.home}
                shouldRenderDefaultCss={false}
                loginButtonText={webWallet}
              />
            </LoginMethod>
            <LoginMethod>
              {" "}
              <LedgerLoginButton
                callbackRoute={routeNames.home}
                shouldRenderDefaultCss={false}
                loginButtonText={legerWallet}
              />
            </LoginMethod>
          </Flex>
        </Flex>
        <Center flexDir={"column"} w="full" textAlign={"center"}>
          <Box color="white.400" mb={"31px"}>
            <Text mb="11px">If you’re on desktop, try X DeFi Wallet</Text>
            <Text>If you’re on mobile, try X Portal</Text>
          </Box>

          <Text mb="11px">New to MultiverX?</Text>
          <Box borderBottom={"1px solid white"}>
            <ChakraLink
              isExternal
              href=""
              fontSize={"md"}
              _hover={{
                textDecoration: "none",
              }}
            >
              Learn How to setup a wallet
            </ChakraLink>
          </Box>
        </Center>
      </ModalBody>
    </MyModal>
  );
};

export default Login;

const LoginMethod = ({ children, onClick = undefined }) => {
  const bg = useColorModeValue("lightGray.lighter", "");
  return (
    <Flex
      fontSize="18px"
      w="full"
      alignItems={"center"}
      justifyContent="space-between"
      cursor={"pointer"}
      onClick={onClick}
      fontWeight="400"
      position={"relative"}
      sx={{
        "& button": {
          width: "100%",
          bg: "#202020",
          border: "none",
          px: "22px !important",
          mx: 0,
          my: 0,
          py: "20px",
          borderRadius: "15px",
        },
        "& a": {
          width: "100%",
          bg: "#151515",
          border: "none",
          px: "22px !important",
          mx: 0,
          my: 0,
          py: "20px",
          borderRadius: "15px",
          _hover: {
            bg: "#0c0b0b",
          },
        },
      }}
    >
      {children}

      <Box position={"absolute"} right={"22px"}>
        <NextImage src={AngleRightImg} alt="" />
      </Box>
    </Flex>
  );
};
