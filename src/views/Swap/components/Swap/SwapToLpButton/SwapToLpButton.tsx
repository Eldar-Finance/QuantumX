import { ButtonProps } from "@chakra-ui/react";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks/transactions/useTrackTransactionStatus";
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
  isSwapToLp: boolean;
  swapInfo?: ISmartSwapData[];
  isLoading?: boolean;
  disabledMessage?: string;
}

const SLIPAGE = 2.5;

const SwapToLpButton = ({
  disableButton,
  isSwapToLp,
  swapInfo,
  isLoading,
  disabledMessage,
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
      if (!isSwapToLp) {
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
      isDisabled={disableButton}
      {...props}
    >
      {disabledMessage ? disabledMessage : "Error"}
    </ActionButton>
  );
};

export default SwapToLpButton;