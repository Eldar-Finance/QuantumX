import { ModalCloseButton } from "@chakra-ui/react";
import MyModal from "components/Modal/Modal";

import WhatGet from "./WhatGet/WhatGet";

const DCAModal = ({ isOpen, onClose, tokens, handleSubmit }) => {
  return (
    <MyModal isOpen={isOpen} onClose={onClose} py={0}>
      <ModalCloseButton _focus={{ border: "none" }} right={5} top={6} />

      <WhatGet handleSubmit={handleSubmit} tokensData={tokens} />
    </MyModal>
  );
};

export default DCAModal;
