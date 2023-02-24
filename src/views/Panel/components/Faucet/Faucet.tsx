import { Center, Spinner, Text } from "@chakra-ui/react";
import useIsFaucetAdmin from "views/Panel/hooks/useIsFaucetAdmin";
import FaucetForms from "./components/FaucetForms/FaucetForms";
import FaucetInfo from "./components/FaucetInfo/FaucetInfo";

const Faucet = () => {
  const { isFaucetAdmin, isLoading } = useIsFaucetAdmin();

  if (isLoading) {
    return (
      <Center mt={4}>
        <Spinner />
      </Center>
    );
  }
  if (!isFaucetAdmin) {
    return <Text textAlign={"center"}>Access is temporarily restricted.</Text>;
  }
  return (
    <Center w="full" flexDir={"column"} gap={10} mt={10}>
      <FaucetInfo />
      <FaucetForms />
    </Center>
  );
};

export default Faucet;
