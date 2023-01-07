import { ButtonProps } from "@chakra-ui/react";
import { transactionServices } from "@elrondnetwork/dapp-core";
import {
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
} from "@elrondnetwork/erdjs/out";
import { contractAddr } from "api/net.config";
import { ESDTTransfer } from "api/sc/calls";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import { useState } from "react";
import { selectFromField } from "redux/slices/smartSwaps/smartSwaps";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { setElrondBalance } from "utils/functions/formatBalance";

import { useAppSelector } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import { ISmartSwapData } from "utils/types/others.interface";

interface IProps extends ButtonProps {
  disableButton?: boolean;
  swapInfo?: ISmartSwapData[];
}

const SwapButton = ({ disableButton, swapInfo, ...props }: IProps) => {
  const swapInfo2: ISmartSwapData[] = [
    {
      amountReceiv: "5",
      amountsend: "0.6",
      smartcontract:
        "erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv",
      token1: "WEGLD-d7c6bb",
      token2: "RIDE-6e4c49",
    },
    {
      amountReceiv: "17",
      amountsend: "4",
      smartcontract:
        "erd1qqqqqqqqqqqqqpgqq67uv84ma3cekpa55l4l68ajzhq8qm3u0n4s20ecvx",
      token1: "USDC-8d4068",
      token2: "LKMEX-3b7d9a",
    },
  ];

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
      const dataToSend = swapInfo2.flatMap((item) => {
        return [
          new AddressValue(new Address(item.smartcontract)),
          BytesValue.fromUTF8("swapTokensFixedInput"),
          BytesValue.fromUTF8(item.token2),
          new BigUIntValue(
            new BigNumber(
              setElrondBalance(
                Number(item.amountReceiv),
                toElrondToken.decimals
              )
            )
          ),
        ];
      });

      console.log("dataToSend", dataToSend);

      ESDTTransfer({
        funcName: "swap",
        token: fromElrondToken,
        val: Number(fromToken.value),
        contractAddr: contractAddr.smartSwap,
        args: dataToSend,
      });
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
