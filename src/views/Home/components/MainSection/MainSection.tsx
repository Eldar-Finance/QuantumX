import { Box, Center, Flex, Heading, Link, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import angleRightIcon from "assets/ui-elemts/angleRight.svg";
import ActionButton from "components/ActionButton/ActionButton";
import { BookIcon, MultiversxIcon } from "components/Icons/ui";
import NextImage from "components/NextImage/NextImage";
import { motion } from "framer-motion";
import { openLogin } from "redux/slices/settings/settings-reducer";
import { useAppDispatch } from "utils/hooks/redux";
import LockedInFarms from "./LockedInFarms/LockedInFarms";
import LockedInPools from "./LockedInPools/LockedInPools";
import LockedInHypezone from "./LockedInHypezone/LockedInHypezone";
import TotalLocked from "./TotalLocked/TotalLocked";

const MainSection = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useGetLoginInfo();

  const handleConnect = () => {
    dispatch(openLogin(true));
  };

  return (
    <Center flexDir={"column"} m="auto" maxW={"692px"} textAlign={"center"}>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <Heading as="h1" fontSize={{ xs: "3xl", md: "7xl" }} mb="30px" mx={50}>
          A dimension in the Multiverse only accessible through{" "}
          <Box as="span" bg="main" bgClip={"text"}>
            {" "}
            DeFi magic.
          </Box>
        </Heading>
      </motion.div>
      <motion.div initial={{ y: 20 }} whileInView={{ y: 0 }}>
        <Heading as="h4" fontSize={{ xs: "md", md: "lg" }} mb={"30px"}>
          Friction-less swaps. Quantum level latency. Next-level interface.
        </Heading>
      </motion.div>

      <Flex
        justify={"center"}
        gap={"30px"}
        mb="70px"
        flexDir={{ xs: "row", md: "row" }}
      >
        {!isLoggedIn && (
          <motion.div initial={{ x: -25 }} whileInView={{ x: 0 }}>
            <ActionButton
              py="11px"
              px="20px"
              borderRadius={"md"}
              onClick={handleConnect}
            >
              Connect wallet{" "}
              <Box as="span" ml={"10px"}>
                {" "}
                <NextImage src={angleRightIcon} alt="" />
              </Box>
            </ActionButton>
          </motion.div>
        )}
        <motion.div initial={{ x: 25 }} whileInView={{ x: 0 }}>
          <Link href="https://docs.quantumx.network">
            <ButtonGradiente
              py="11px"
              px="22px"
              borderRadius={"md"}
              color="main"
              bg="black.baseDark"
              backdropFilter={"blur(1.5px)"}
              _hover={{
                color: "main",
              }}
            >
              Read docs <BookIcon ml={"8px"} />
            </ButtonGradiente>
          </Link>
        </motion.div>
      </Flex>

      <Center flexDirection={"column"} gap={4}>
        <Flex>
          <motion.div initial={{ y: 25 }} whileInView={{ y: 0 }}>
            <TotalLocked />
          </motion.div>
        </Flex>
        <Flex gap={{xs: "15px", md: "20px"}} mb="30px" flexDir={{ xs: "row", md: "row" }} whiteSpace={"nowrap"}>
          <motion.div initial={{ y: 25 }} whileInView={{ y: 0 }}>
            <LockedInFarms />
          </motion.div>
          <motion.div initial={{ y: 25 }} whileInView={{ y: 0 }}>
            <LockedInPools />
          </motion.div>
          <motion.div initial={{ y: 25 }} whileInView={{ y: 0 }}>
            <LockedInHypezone />
          </motion.div>
        </Flex>
      </Center>

      <Center gap="10px">
        <Text fontSize={"lg"}>built on</Text>
        <Box>
          <MultiversxIcon />
          <Box
            h="1.5px"
            w="full"
            bg="linear-gradient(90deg, rgba(250,0,255,1) 0%, rgba(255,255,255,1) 50%, rgba(0,255,133,1) 100%);"
            mt="10px"
          />
        </Box>
      </Center>
    </Center>
  );
};

export default MainSection;

const ButtonGradiente = styled(ActionButton)`
  box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
  border: solid 1px transparent;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(#398396 100%, #398396 0%, #398396 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 2px 1000px 1px #1e1e1e inset;
`;
