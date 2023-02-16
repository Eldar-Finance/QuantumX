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
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import useGetElrondToken from "utils/hooks/useGetElrondToken";

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
            {rewards.map((sftReward) => {
              return <SftReward key={sftReward.tokenI} sftReward={sftReward} />;
            })}
          </Box>
        </Center>
      </ModalBody>
      <ModalFooter mb={3} flexDirection="column">
        <ActionButton
          mr={3}
          onClick={onClose}
          fontSize={"xl"}
          width="full"
          borderRadius="8px"
          height="50px"
          textTransform="uppercase"
        >
          Close
        </ActionButton>
      </ModalFooter>
    </MyModal>
  );
};

export default RewardsModal;

const SftReward = ({ sftReward }) => {
  const { token } = useGetElrondToken(sftReward.tokenI);
  if (!token) return null;
  return (
    <Box
      textAlign={"center"}
      mb={1}
      width={"100%"}
      fontSize="2xl"
      fontWeight="bold"
    >
      {formatBalance({ balance: sftReward.value, decimals: token?.decimals })}{" "}
      {formatTokenI(sftReward.tokenI)}
    </Box>
  );
};
