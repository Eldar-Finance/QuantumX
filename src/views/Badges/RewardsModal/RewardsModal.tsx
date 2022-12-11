import {
  Box,
  Center,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";
import { formatPrecision } from "utils/functions/formatBalance";

const RewardsModal = ({ isOpen, onClose, rewards }) => {
  return (
    <MyModal isOpen={isOpen} onClose={onClose} py={0}>
      <ModalHeader borderRadius="1.5rem 1.5rem 0 0">
        <Text>Your Rewards</Text>
      </ModalHeader>
      <ModalCloseButton _focus={{ border: "none" }} right={5} top={6} />
      <ModalBody pt={2}>
        <Center width={"full"} flexDirection="column">
          <Box>
            {rewards.map((sftReward, i) => {
              return (
                <Box
                  key={i}
                  textAlign={"center"}
                  mb={1}
                  width={"100%"}
                  fontSize="2xl"
                  fontWeight="bold"
                >
                  {formatPrecision(sftReward.value)}{" "}
                  {sftReward.tokenI.split("-")[0]}
                </Box>
              );
            })}
          </Box>
        </Center>
      </ModalBody>
      <ModalFooter mb={3} flexDirection="column">
        <ActionButton
          colorScheme="blue"
          mr={3}
          onClick={onClose}
          fontSize={"xl"}
          width="full"
          borderRadius="8px"
          height="50px"
          textTransform="uppercase"
          background="rgba(0,0,0,0.5)"
          _hover={{
            background: "rgba(0,0,0,0.7)",
          }}
        >
          Close
        </ActionButton>
      </ModalFooter>
    </MyModal>
  );
};

export default RewardsModal;
