import { Center, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import NextImage from "components/NextImage/NextImage";
import { claim } from "views/Hypezone/utils/sc";
import faucetImg from "../../assets/faucetpng.png";
const Faucet = () => {
  return (
    <Center
      w={{ xs: "200px", md: "300px" }}
      position={"relative"}
      height={{ xs: "150px", md: "auto" }}
    >
      <Center position="absolute" top={"-10px"} right={0}>
        <NextImage src={faucetImg} alt="faucet" height={350} width={300} />
      </Center>
      <Center
        bottom={{ xs: "-5px", md: "-25px" }}
        right={0}
        left={0}
        w="full"
        position={"absolute"}
        flexDir="column"
      >
        <ActionButton bg="white" mb={1} onClick={claim}>
          ClAIM HYPE
        </ActionButton>
        <Text color="GrayText">*1 claim/epoch</Text>
      </Center>
    </Center>
  );
};

export default Faucet;
