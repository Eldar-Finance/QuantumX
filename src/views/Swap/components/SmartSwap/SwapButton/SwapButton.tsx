import { ButtonProps } from "@chakra-ui/react";
import { Interaction } from "@multiversx/sdk-core/out";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks/transactions/useTrackTransactionStatus";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
import { sendTransaction } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { useState } from "react";
import { openLogin } from "redux/slices/settings/settings-reducer";
import {
  selectFromField,
  selectSlippage,
} from "redux/slices/smartSwaps/smartSwaps";
import store from "redux/store";

import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import { INomalSmartSwap, ISmartSwapData } from "utils/types/others.interface";
import { swap, swapLp } from "views/Swap/services/swap";

interface IProps extends ButtonProps {
  interaction: Interaction,
  disabled?: boolean,
  disabledMessage?: string,
}

const SwapButton = ({
    interaction,
    disabled,
    disabledMessage,
    ...props
  }: IProps) => {
    const userAddress = store.getState().userAccount.connectedAddress;
  
    const dispatch = useAppDispatch();
    const handleConnect = () => {
      dispatch(openLogin(true));
    };
  
    const handleSwap = async () => {
      const tx = interaction.buildTransaction();
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
        onClick={!userAddress ? handleConnect : handleSwap}
        {...props}
        isDisabled={disabled}
      >
        {!userAddress ? "Connect your wallet" :
          disabled ? disabledMessage:
            interaction ? "Swap" :
              "Error"}
      </ActionButton>
    );
  };
  
  export default SwapButton;
