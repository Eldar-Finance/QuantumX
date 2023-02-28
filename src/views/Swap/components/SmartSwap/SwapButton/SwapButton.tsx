import { ButtonProps } from "@chakra-ui/react";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
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
  disableButton?: boolean;
  isSapwToLp: boolean;
  swapInfo?: ISmartSwapData[];
}

const SLIPAGE = 2.5;

const SwapButton = ({
  disableButton,
  isSapwToLp,
  swapInfo,
  ...props
}: IProps) => {
  const [sessionId, setSessionId] = useState<string>();
  const slipapge = useAppSelector(selectSlippage);

  const toField = useAppSelector((state) => state.smartSwap.toField);
  const fromToken = useAppSelector(selectFromField);
  const { token: fromElrondToken } = useGetElrondToken(fromToken.token);

  const txs = useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: (txI) => {
      if (window) {
        window.location.reload();
      }
    },
  });

  const handleSwap = async () => {
    if (swapInfo && swapInfo.length > 0 && fromElrondToken) {
      const gas = 90000000;
      if (!isSapwToLp) {
        swap(
          swapInfo as INomalSmartSwap[],
          slipapge,
          fromToken,
          toField,
          fromElrondToken,
          gas
        );
      } else {
        swapLp(swapInfo, slipapge, fromToken, toField, fromElrondToken, gas);
      }
    }
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
      {toField.value ? "Swap" : "Enter an amount"}
    </ActionButton>
  );
};

export default SwapButton;
