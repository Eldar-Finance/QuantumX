import { Box, useDisclosure } from "@chakra-ui/react";
import { contractAddr } from "api/net.config";
import { ESDTNFTTransfer } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";
import { memo } from "react";
import SelectSftsModal from "./SelectSftsModal/SelectSftsModal";
const StakeButton = ({ sfts, address, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (token, amount) => {
    onClose();

    if (token) {
      const res = await ESDTNFTTransfer(
        "stakeSft",
        address,
        undefined,
        token,
        contractAddr.sftsRewards,
        40000000,
        undefined,
        amount
      );
    }
  };

  return (
    <Box>
      <ActionButton ml={2} onClick={onOpen} {...props}>
        Stake
      </ActionButton>

      {isOpen && (
        <SelectSftsModal
          sfts={sfts}
          isOpenModal={isOpen}
          onCloseModal={onClose}
          onConfirm={handleSubmit}
        />
      )}
    </Box>
  );
};

export default memo(StakeButton);
