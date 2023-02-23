import { Center } from "@chakra-ui/react";
import FaucetForms from "./components/FaucetForms/FaucetForms";
import FaucetInfo from "./components/FaucetInfo/FaucetInfo";

const Faucet = () => {
  return (
    <Center w="full" flexDir={"column"} gap={10} mt={10}>
      <FaucetInfo />
      <FaucetForms />
    </Center>
  );
};

export default Faucet;
