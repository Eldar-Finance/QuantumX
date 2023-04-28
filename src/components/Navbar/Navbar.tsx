// import logo from "assets/logos/quantumx.png";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
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
import Menu from "./Menu/Menu";

interface IProps {
  onlyConnectButton?: boolean;
}

const Navbar = ({ onlyConnectButton }: IProps) => {
  const dispatch = useAppDispatch();
  const location = useRouter().asPath;
  const { isLoggedIn } = useGetLoginInfo();

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
        py={{ xs: "15px", "2xl": "40px" }}
        px={{ xs: "30px", xl: "80px" }}
        display="flex"
        justifyContent={onlyConnectButton ? "flex-end" : "space-between"}
        fontSize={{ xs: "sm", "2xl": "md" }}
        flexDir={{ xs: "column", md: "row" }}
        rowGap={1.5}
        columnGap={3}
      >
        {!onlyConnectButton && (
          <>
            <Flex w="ful" alignItems={"center"} justifyContent="space-between">
              <Link href={"/"}>
                <NextImage src={logo} alt="QuantumX" width={128} height={38} />
              </Link>

              <ActionButton
                fontSize={{ xs: "14px", "2xl": "md" }}
                fontWeight="600"
                display={{ xs: "block", md: "none" }}
                onClick={isLoggedIn ? handleLogout : handleConnect}
                bg={isLoggedIn ? "danger" : "main"}
              >
                <Icon as={LightningIcon} />
              </ActionButton>
            </Flex>
            <Box w="fit-content" m="auto">
              <Menu />
            </Box>
          </>
        )}
        <QTagButton />
        <ActionButton
          px={{ xs: "30px", "2xl": "40px" }}
          fontSize={{ xs: "14px", "2xl": "md" }}
          fontWeight="600"
          display={{ xs: "none", md: "block" }}
          onClick={isLoggedIn ? handleLogout : handleConnect}
          bg={isLoggedIn ? "danger" : "main"}
          color={isLoggedIn ? "white" : "black"}
        >
          {isLoggedIn ? "Disconnect" : "Connect"}
        </ActionButton>
      </MyContainer>
    </motion.div>
  );
};

export default Navbar;
