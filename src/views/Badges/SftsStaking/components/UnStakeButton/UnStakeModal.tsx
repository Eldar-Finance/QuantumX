import { Flex, ModalBody, ModalHeader, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";

const UnStakeModal = ({ isOpen, onClose, onClick }) => {
  return (
    <MyModal isOpen={isOpen} onClose={onClose} borderRadius={"20px"}>
      <ModalHeader borderRadius="1.5rem 1.5rem 0 0"></ModalHeader>

      <ModalBody>
        <Text
          fontSize={"2xl"}
          fontWeight="bold"
          as={"h2"}
          textAlign="center"
          mb={2}
        >
          Unstake SFTs info!
        </Text>
        <Text
          fontSize={"sm"}
          color={"gray.300"}
          fontWeight={"bold"}
          textAlign="center"
          mb={5}
        >
          {" "}
          All your SFTs will be unstaked but they will remain locked for a
          period of 10 days until you will be able to retrieve them.{" "}
        </Text>

        <Flex
          alignItems={"center"}
          background={"transparent"}
          borderRadius={"12px"}
          minHeight={"28"}
          flexDir={"column"}
          justifyContent={"center"}
          p={5}
        >
          <ActionButton
            height="50px"
            px={"40px"}
            borderRadius="100px"
            onClick={onClick}
          >
            Confirm
          </ActionButton>
        </Flex>
      </ModalBody>
    </MyModal>
  );
};

export default UnStakeModal;
