import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const ActionModal = ({ isOpen, onClose }: IProps) => {
  return (
    <MyModal bg="black.baseDark" isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        <Flex justifyContent={"space-between"} alignItems="center">
          <Heading fontSize={"md"}> Stake Lp TOkens</Heading>{" "}
          <ActionButton aria-label="close" bg="transparent">
            <CloseIcon color="main" fontSize={"12px"} cursor="pointer" />
          </ActionButton>
        </Flex>
      </ModalHeader>
      <Divider />
      <ModalBody>
        <Box bg="black.base" p="5" borderRadius={"xl"}>
          <Flex mb="2">
            <Text>Stake</Text>
            <Text>Balance: 0</Text>
          </Flex>
          <Flex mb="3">
            <Input variant={"unstyled"} placeholder="0" flex="1" />{" "}
            <Text fontSize={"14px"}>PROTEO-EGLD-LP</Text>
          </Flex>
          <Flex justifyContent={"flex-end"} gap="1">
            <AmountBox percent={25} />
            <AmountBox percent={50} />
            <AmountBox percent={75} />
            <AmountBox percent={100} />
          </Flex>
        </Box>
      </ModalBody>
      <ModalFooter justifyContent={"center"} gap="6" flexWrap={"wrap"}>
        <ActionButton variant={"outline"} w="full" maxW={"180px"}>
          Cancel
        </ActionButton>
        <ActionButton
          bg="white.100"
          variant={"outline"}
          color="gray.400"
          w="full"
          maxW={"180px"}
        >
          Confirm
        </ActionButton>
      </ModalFooter>
    </MyModal>
  );
};

export default ActionModal;

const AmountBox = ({ percent }: { percent: number }) => {
  const text = percent === 100 ? "MAX" : percent + "%";
  return (
    <ActionButton
      fontSize={"10px"}
      py="1"
      h="auto"
      px="2"
      variant={"outline"}
      borderColor="main"
    >
      {text}
    </ActionButton>
  );
};
