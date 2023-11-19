import { ButtonProps } from "@chakra-ui/react";
import { Interaction } from "@multiversx/sdk-core/out";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks/transactions/useTrackTransactionStatus";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
import { sendTransaction } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { useState } from "react";
import {
  selectFromField,
  selectSlippage,
} from "redux/slices/smartSwaps/smartSwaps";

import { useAppSelector } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import { INomalSmartSwap, ISmartSwapData } from "utils/types/others.interface";
import { swap, swapLp } from "views/Swap/services/swap";

interface IProps extends ButtonProps {
  interaction: Interaction
}

const SLIPAGE = 2.5;

const SwapButton = ({
  interaction,
  ...props
}: IProps) => {
  // const [sessionId, setSessionId] = useState<string>();
  // const slipapge = useAppSelector(selectSlippage);

  // const toField = useAppSelector((state) => state.smartSwap.toField);
  // const fromToken = useAppSelector(selectFromField);
  // const { token: fromElrondToken } = useGetElrondToken(fromToken.token);

  // const txs = useTrackTransactionStatus({
  //   transactionId: sessionId,
  //   onSuccess: (txI) => {
  //     if (window) {
  //       window.location.reload();
  //     }
  //   },
  // });

  const handleSwap = async () => {
    // console.log("⚠️ ~ file: SwapButton.tsx:46 ~ interaction:", interaction)
    const tx = interaction.buildTransaction();
    // console.log("⚠️ ~ file: SwapButton.tsx:47 ~ tx:", tx)

    const res = await sendTransaction({tx: tx});
  };

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
      {interaction ? "Swap" : "Enter an amount"}
    </ActionButton>
  );
};

export default SwapButton;
