import { Center } from "@chakra-ui/react";
import AddToken from "./components/AddToken/AddToken";
import RemoveToken from "./components/RemoveToken/RemoveToken";

const SmartSwap = () => {
  return (
    <Center flexDir={"column"} gap="50px">
      <AddToken />
      <RemoveToken />
    </Center>
  );
};

export default SmartSwap;
