import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import styled from "@emotion/styled";
import angleRightIcon from "assets/ui-elemts/angleRight.svg";
import ActionButton from "components/ActionButton/ActionButton";
import { BookIcon } from "components/Icons/ui";
import NextImage from "components/NextImage/NextImage";
const MainSection = () => {
  return (
    <Center flexDir={"column"} m="auto" maxW={"692px"} textAlign={"center"}>
      <Heading as="h1" fontSize={"7xl"} mb="30px">
        A dimension in the Multivers only accessible through{" "}
        <Box as="span" bg="main" bgClip={"text"}>
          {" "}
          DeFi magic.
        </Box>
      </Heading>

      <Heading as="h4" fontSize={"lg"} mb={"30px"}>
        Friction-less swaps. Quantum level latency. Next-level interface.
      </Heading>

      <Flex justify={"center"} gap={"30px"}>
        <ActionButton py="11px" px="20px" borderRadius={"md"}>
          Connect wallet{" "}
          <Box as="span" ml={"10px"}>
            {" "}
            <NextImage src={angleRightIcon} alt="" />
          </Box>
        </ActionButton>
        <ButtonGradiente
          py="11px"
          px="22px"
          borderRadius={"md"}
          color="main"
          bg="black.baseDark"
          backdropFilter={"blur(1.5px)"}
        >
          Read docs <BookIcon ml={"8px"} />
        </ButtonGradiente>
      </Flex>
    </Center>
  );
};

export default MainSection;

const ButtonGradiente = styled(Button)`
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
