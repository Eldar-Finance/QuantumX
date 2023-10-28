import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account/useGetAccountInfo";
import { contractAddr } from "api/net.config";
import { EGLDPayment } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";

import { useState } from "react";
import { formatBalance } from "utils/functions/formatBalance";

const WrapModal = ({ isOpenModal, onCloseModal }) => {
  const acc = useGetAccountInfo();
  const [amount, setAmount] = useState("");

  // const [setSessionId, transactionStatus, sessionId, txHash] =
  //   usePendingTransactions(() => {
  //     if (window) {
  //       window.location.reload();
  //     }
  //   }, 5);

  const handleOnChange = (e) => {
    const amountNumber = e.target.value;

    setAmount(amountNumber);
  };
  const handleMax = () => {
    setAmount(formatBalance({ balance: acc.account.balance }, true));
  };

  const handleSubmit = async () => {
    if (amount) {
      const res = await EGLDPayment(
        contractAddr.wrapEgld,
        "wrapEgld",
        amount,
        [],
        60000000
      );
      // setSessionId(res.sessionId);
    }
  };

  return (
    <MyModal isOpen={isOpenModal} onClose={onCloseModal} size="xl" pb={5}>
      <ModalCloseButton
        border="none"
        outline={"none"}
        _focus={{ boxShadow: "none" }}
        right={5}
        top={4}
      />
      <ModalHeader
        borderRadius="1.5rem 1.5rem 0 0"
        px="6"
        borderBottom={"1px solid white"}
      >
        {" "}
        Wrap EGLD
      </ModalHeader>
      <ModalBody px="6" borderBottom={"1px solid white"} py={4}>
        <Stack gap={3}>
          <Text
            bg="gray.200"
            color="black"
            px={6}
            py={4}
            borderRadius="md"
            fontSize="large"
          >
            You will need WEGLD to get tokens pairs with EGLD, convert your EGLD
            here.
          </Text>
          <Flex>
            <Text>Balance : </Text>
            <Text fontWeight={"bold"}>
              {formatBalance({ balance: acc.account.balance })} EGLD
            </Text>
          </Flex>

          <Box>
            <Text mb={2}>Amount to wrap</Text>
            <Flex
              mb={1}
              w="full"
              alignItems={"center"}
              border="1px solid white"
              borderRadius={"lg"}
              px={2}
            >
              <Input
                border="none"
                _active={{ border: "none", outline: "none" }}
                _focus={{ border: "none", outline: "none" }}
                _focusVisible={{ border: "none", outline: "none" }}
                onChange={handleOnChange}
                value={amount}
              />
              <ActionButton height="30px" onClick={handleMax} my="5px">
                max
              </ActionButton>
            </Flex>
            <Flex
              justifyContent={"flex-end"}
              color="gray.300"
              fontSize={"smaller"}
            >
              {" "}
              Kepp at least 0.05 EGLD to pay network fees.
            </Flex>
          </Box>
        </Stack>
      </ModalBody>

      <ModalFooter px="6">
        <Center w={"full"} justifyContent="flex-end">
          <Button
            mx={3}
            color="main"
            bg="transparent"
            _hover={{ bg: "brand.400" }}
            onClick={handleSubmit}
          >
            Wrap
          </Button>
          <Button
            mx={3}
            onClick={onCloseModal}
            color="danger"
            variant="ghost"
            _hover={{ bg: "transparent" }}
          >
            Close
          </Button>
        </Center>
      </ModalFooter>
    </MyModal>
  );
};

export default WrapModal;
