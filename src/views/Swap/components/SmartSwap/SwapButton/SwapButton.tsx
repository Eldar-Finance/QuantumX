import { ButtonProps } from "@chakra-ui/react";
import { Address, BooleanValue, BytesValue, ContractFunction, Interaction, SmartContract, TokenTransfer } from "@multiversx/sdk-core/out";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks/transactions/useTrackTransactionStatus";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
import { ChainId, contractAddr, network } from "api/net.config";
import { sendTransaction } from "api/sc/sc";
import BigNumber from "bignumber.js";
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
  interaction?: Interaction,
  actualInputAmount?: string
  disabled?: boolean,
  disabledMessage?: string,
  defaultMessage?: string
  isWrapOrUnwrap?: boolean
  wrapUnwrapCall?: () => void
}

const SwapButton = ({
    interaction,
    actualInputAmount,
    disabled,
    disabledMessage,
    defaultMessage = "Swap",
    isWrapOrUnwrap = false,
    wrapUnwrapCall,
    ...props
  }: IProps) => {
    const userAddress = store.getState().userAccount.connectedAddress;
  
    const dispatch = useAppDispatch();
    const handleConnect = () => {
      dispatch(openLogin(true));
    };
  
    const handleSwap = async () => {

      let finalArgs = interaction.getArguments();

      if (finalArgs.length == 3) {
        finalArgs.push(new BooleanValue(false));
        finalArgs = [finalArgs[0], finalArgs[1], finalArgs[3], finalArgs[2]];
      }
  
      const contract = new SmartContract({ address: new Address(contractAddr.ashswap)});
      let finalInteraction = new Interaction(contract, new ContractFunction("swap"), finalArgs);
      
      finalInteraction = finalInteraction
        .withSender(new Address(userAddress))
        .withChainID(ChainId)
        .withGasLimit(interaction.getGasLimit().valueOf()) // * 1.2) // 20% more gas
      
      if (BigNumber(interaction.getValue().toString()).gt(0)) {
        const inputAmount = actualInputAmount ?
          actualInputAmount :
          interaction.getValue().toString();
      
          finalInteraction = finalInteraction.withValue(inputAmount);
      } else {
        const inputAmount = actualInputAmount ?
          actualInputAmount :
          interaction.getTokenTransfers()?.[0].amountAsBigInteger;
      
        const transfer = interaction.getTokenTransfers()?.[0];
      
        finalInteraction = finalInteraction.withSingleESDTTransfer(
          TokenTransfer.fungibleFromBigInteger(
            transfer.tokenIdentifier,
            inputAmount
          )
        );
      }

      const tx = finalInteraction.buildTransaction();
      
      const res = await sendTransaction({tx: tx});
    };
  
    return (
      !isWrapOrUnwrap ? 
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
              interaction ? defaultMessage :
                "Error"}
        </ActionButton>
      :
        <ActionButton
          mt={8}
          height={"auto"}
          variant={"solid"}
          borderRadius={"12px"}
          padding={"20px"}
          width={"full"}
          onClick={!userAddress ? handleConnect :
            wrapUnwrapCall
          }
          {...props}
          isDisabled={disabled}
        >
          {!userAddress ? "Connect your wallet" :
            disabled ? disabledMessage :
              defaultMessage
          }
        </ActionButton>
    );
  };
  
  export default SwapButton;
