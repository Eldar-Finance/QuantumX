import { ArrowUpIcon } from "@chakra-ui/icons";
import { Center, Icon, useDisclosure } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const TransactionModal: any = dynamic(
  () => import("./TransactionModal/TransactionModal")
);
const SendTokens = () => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  console.log("SendTokens");

  return (
    <Center w="full">
      <Center
        boxSize={"50px"}
        bg="green.800"
        borderRadius={"full"}
        cursor={"pointer"}
        onClick={onOpen}
      >
        <Icon
          as={ArrowUpIcon}
          fontSize={"2xl"}
          color="main"
          fontWeight={"bold"}
        />
      </Center>
      {isOpen && <TransactionModal isOpen={true} onClose={onClose} />}
    </Center>
  );
};

export default SendTokens;
