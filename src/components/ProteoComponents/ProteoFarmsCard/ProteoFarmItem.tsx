import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Center,
  Flex,
  Grid,
  Link,
  Text,
} from "@chakra-ui/react";
import logo from "assets/logos/rare-usdc.png";
import tokenLogo from "assets/logos/sproteo.svg";
import ActionButton from "components/ActionButton/ActionButton";

import NextImage from "components/NextImage/NextImage";
import { PropsWithChildren } from "react";
const ProteoFarmItem = () => {
  return (
    <AccordionItem w="full">
      <Box w="full">
        <AccordionButton
          py="4"
          bg="black.baseDark"
          _hover={{
            bg: "black.light",
          }}
          px="5"
          w="full"
        >
          <Box flex="1" textAlign="left" w="full">
            <Flex
              w="full"
              alignItems={"center"}
              justifyContent="space-between"
              pr="8"
            >
              <Flex gap="4" alignItems={"center"}>
                <NextImage src={logo} alt="" />
                <Text fontWeight={"600"}>PROTE-EGLD</Text>
              </Flex>
              <Flex flexDir={"column"} textAlign="center">
                <Text color="white.400">Staked Balance</Text>
                <Text>15.9 LP ($400)</Text>
              </Flex>
              <Flex flexDir={"column"} textAlign="center">
                <Text color="white.400">Apr</Text>
                <Text>98%</Text>
              </Flex>
              <Flex flexDir={"column"} textAlign="center">
                <Text color="white.400">Total Value Locked</Text>
                <Text>$135.000.000</Text>
              </Flex>
              <Flex flexDir={"column"} textAlign="center">
                <Text color="white.400">Earn</Text>
                <Text>
                  <NextImage src={tokenLogo} alt="" width={30} />
                </Text>
              </Flex>
            </Flex>
          </Box>
          <AccordionIcon color="main" />
        </AccordionButton>
      </Box>
      <AccordionPanel pb={4} w="full" bg="black.base">
        <Flex w="full" gap={"4"}>
          <Center flexDir={"column"} fontSize="14px" color="main">
            <Flex flexDir={"column"} h="fit-content">
              <Link>
                Get Proteo-EGLD LP <ExternalLinkIcon />
              </Link>
              <Link>
                View Contract <ExternalLinkIcon />
              </Link>
              <Link>
                See Pair Info <ExternalLinkIcon />
              </Link>
            </Flex>
          </Center>
          <Grid flex="1" templateColumns={"1fr 1fr"} gap="4">
            <PanelBox>
              <Text color="white.400">EARNED REWARDS</Text>
              <Center mt="2" gap="3" justifyContent={"space-around"}>
                <Flex gap="2" alignItems={"center"}>
                  <Text>0.3581</Text>{" "}
                  <NextImage src={tokenLogo} alt="" width={30} />
                </Flex>
                <ActionButton>HARVEST</ActionButton>
              </Center>
            </PanelBox>
            <PanelBox>
              <Flex w="full" justifyContent={"space-between"}>
                <Text color="white.400">Avilable to withdraw</Text>
                <Text>12.24</Text>
              </Flex>
              <Center mt="2">
                <ActionButton>WITHDRAW</ActionButton>
              </Center>
            </PanelBox>
            <PanelBox gridColumn={"1 / 3"}>
              <Text color="white.400">STAKE PROTEO-EGLD LP</Text>

              <Flex mt="2" gap="3">
                <ActionButton variant={"outline"} w="full" maxW={"500px"}>
                  STAKE LP
                </ActionButton>
                <Center flex="1">
                  <ActionButton>UNSTAKE</ActionButton>
                </Center>
              </Flex>
            </PanelBox>
          </Grid>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default ProteoFarmItem;

const PanelBox = ({ children, ...props }: PropsWithChildren<BoxProps>) => {
  return (
    <Box
      p="4"
      border={"1px solid "}
      borderColor="white.400"
      borderRadius={"lg"}
      {...props}
    >
      {children}
    </Box>
  );
};
