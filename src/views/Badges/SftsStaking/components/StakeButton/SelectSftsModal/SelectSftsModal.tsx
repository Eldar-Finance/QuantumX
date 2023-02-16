import {
  Center,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";
import { useState } from "react";
import SFtsItem from "views/Badges/SftsStaking/components/SFtsItem/SFtsItem";
import SFtToSelect from "views/Badges/SftsStaking/components/SFtToSelect/SFtToSelect";

const SelectSftsModal = ({ isOpenModal, onCloseModal, onConfirm, sfts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSft, setSelectedSft] = useState(null);
  const [sftAmount, setSftAmount] = useState(1);
  const handleSelectSft = (sft) => {
    onOpen();
    setSftAmount(1);
    setSelectedSft(sft);
  };

  return (
    <MyModal
      isOpen={isOpenModal}
      onClose={onCloseModal}
      size="4xl"
      px="3"
      py={5}
    >
      <ModalCloseButton
        border="none"
        outline={"none"}
        _focus={{ boxShadow: "none" }}
        right={5}
        top={4}
      />
      <ModalHeader borderRadius="1.5rem 1.5rem 0 0"> My SFTs</ModalHeader>
      <ModalBody>
        {!isOpen ? (
          <Flex justifyContent={"space-between"} flexWrap="wrap">
            {sfts.map((sft) => {
              return (
                <SFtsItem
                  key={sft.identifier}
                  sft={sft}
                  onClick={() => handleSelectSft(sft)}
                />
              );
            })}
          </Flex>
        ) : (
          <Center>
            <SFtToSelect
              sft={selectedSft}
              sftAmount={sftAmount}
              setSftAmount={setSftAmount}
            />
          </Center>
        )}
      </ModalBody>
      {isOpen && (
        <ModalFooter>
          <Center w={"full"}>
            <ActionButton mx={3} onClick={onClose}>
              Cancel
            </ActionButton>
            <ActionButton
              mx={3}
              onClick={() => onConfirm(selectedSft, sftAmount)}
            >
              Confirm
            </ActionButton>
          </Center>
        </ModalFooter>
      )}
    </MyModal>
  );
};

export default SelectSftsModal;
