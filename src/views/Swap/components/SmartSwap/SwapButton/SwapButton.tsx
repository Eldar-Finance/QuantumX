import { ButtonProps } from "@chakra-ui/react";
import { transactionServices } from "@elrondnetwork/dapp-core";
import {
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
} from "@elrondnetwork/erdjs/out";
import { contractAddr } from "api/net.config";
import { ESDTTransfer, wrapEgldAndEsdtTranfer } from "api/sc/calls";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import { useState } from "react";
import { selectFromField } from "redux/slices/smartSwaps/smartSwaps";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";

import { useAppSelector } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import { ISmartSwapData } from "utils/types/others.interface";

interface IProps extends ButtonProps {
  disableButton?: boolean;
  swapInfo?: ISmartSwapData[];
}

const SwapButton = ({ disableButton, swapInfo, ...props }: IProps) => {
  const [sessionId, setSessionId] = useState<string>();
  const address = useAppSelector(selectUserAddress);
  const toField = useAppSelector((state) => state.smartSwap.toField);
  const fromToken = useAppSelector(selectFromField);
  const { token: fromElrondToken } = useGetElrondToken(fromToken.token);
  const { token: toElrondToken } = useGetElrondToken(toField.token);

  const txs = transactionServices.useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: (txI) => {
      if (window) {
        window.location.reload();
      }
    },
  });

  const handleSwap = async () => {
    if (swapInfo && swapInfo.length > 0 && fromElrondToken) {
      const dataToSend = swapInfo.flatMap((item) => {
        const amountWithSlipage = new BigNumber(item.amountReceivDec)
          .multipliedBy(1)
          .dividedBy(100)
          .toFixed(0);
        const finalAmount = new BigNumber(item.amountReceivDec)
          .minus(amountWithSlipage)
          .toFixed();
        console.log("finalAmount", finalAmount);

        return [
          new AddressValue(new Address(item.smartcontract)),
          BytesValue.fromUTF8("swapTokensFixedInput"),
          BytesValue.fromUTF8(item.token2),
          new BigUIntValue(new BigNumber(finalAmount)),
        ];
      });

      if (fromToken.token === "EGLD") {
        return await wrapEgldAndEsdtTranfer(
          Number(fromToken.value),
          "swap",
          dataToSend,
          contractAddr.smartSwap
        );
      } else {
        return await ESDTTransfer({
          funcName: "swap",
          token: fromElrondToken,
          val: Number(fromToken.value),
          contractAddr: contractAddr.smartSwap,
          args: dataToSend,
        });
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
