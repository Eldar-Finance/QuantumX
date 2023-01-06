import { ButtonProps } from "@chakra-ui/react";
import { transactionServices } from "@elrondnetwork/dapp-core";
import ActionButton from "components/ActionButton/ActionButton";
import { useState } from "react";

import { useAppSelector } from "utils/hooks/redux";

interface IProps extends ButtonProps {
  disableButton?: boolean;
}

const SwapButton = ({ disableButton, ...props }: IProps) => {
  const toValue = useAppSelector((state) => state.smartSwap.toField.value);
  const [sessionId, setSessionId] = useState<string>();

  const txs = transactionServices.useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: (txI) => {
      if (window) {
        window.location.reload();
      }
    },
  });

  const handleSwap = async () => {};

  return (
    <ActionButton
      mt={8}
      height={"auto"}
      variant={"ghost"}
      borderRadius={"12px"}
      padding={"20px"}
      width={"full"}
      onClick={handleSwap}
      {...props}
    >
      {toValue ? "Swap" : "Enter an amount"}
    </ActionButton>
  );
};

export default SwapButton;
