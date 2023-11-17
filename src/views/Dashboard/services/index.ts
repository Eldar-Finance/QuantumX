import { Transaction, TransactionPayload } from "@multiversx/sdk-core";
import { Address } from "@multiversx/sdk-core/out";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
import { ChainId } from "api/net.config";
import { ESDTTransferToUser } from "api/sc/calls";
import store from "redux/store";
import { sendTransaction } from "api/sc/sc";

export const sendUserTokens = async (
  address: string,
  token: {
    amount: string;
    identifier: string;
    decimals: number;
  },
  fee: string,
  data: string
) => {
  const sender = store.getState().userAccount.connectedAddress;

  // console.log(Number(fee));

  if (token.identifier === "EGLD") {
    const tx = new Transaction({
      data: new TransactionPayload(data),
      gasLimit: Number(fee),
      sender: new Address(sender),
      receiver: new Address(address),
      value: token.amount,
      chainID: ChainId,
    });
    const res = await sendTransactions({
      transactions: tx,
    });
  } else {
    ESDTTransferToUser({
      receiver: address,
      token: token,
      gasL: Number(fee),
      realValue: token.amount,
    });
  }
};
