import { ModalCloseButton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import MyModal from "components/Modal/Modal";

import WhatGet from "./WhatGet/WhatGet";

const DCAModal = ({ isOpen, onClose, tokens, handleSubmit }) => {
  return (
    <ColorfulModal isOpen={isOpen} onClose={onClose} py={0}>
      <ModalCloseButton _focus={{ border: "none" }} right={5} top={6} />

      <WhatGet handleSubmit={handleSubmit} tokensData={tokens} />
    </ColorfulModal>
  );
};

export default DCAModal;

export const ColorfulModal = styled(MyModal)`
  --borderWidth: 3px;

  position: relative;
  padding-top: 20px;
  border-radius: 1.5rem;
  ::after {
    content: "";
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(
      60deg,
      #f79533,
      #f37055,
      #ef4e7b,
      #a166ab,
      #5073b8,
      #1098ad,
      #07b39b,
      #6fba82
    );
    border-radius: calc(2 * 1.5rem);
    z-index: -1;
    animation: animatedgradient 10s ease alternate infinite;
    background-size: 300% 300%;
  }

  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
