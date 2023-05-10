import { ArrowUpIcon } from "@chakra-ui/icons";
import { Center, Icon, useDisclosure, Flex, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const TransactionModal: any = dynamic(
  () => import("./TransactionModal/TransactionModal")
);
const SendTokens = () => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  return (
    <Center w="full">
      <Flex flexDirection="column" alignItems="center">
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
        <Text mt={2}>Send</Text>
      </Flex>
    </Center>
  );
};

export default SendTokens;
