import { Transaction, TransactionPayload } from "@multiversx/sdk-core";
import { Address } from "@multiversx/sdk-core/out";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
import { ChainId } from "api/net.config";
import { ESDTTransfer } from "api/sc/calls";
import store from "redux/store";

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
  console.log("token", token);

  const sender = store.getState().userAccount.connectedAddress;

  if (token.identifier === "EGLD") {
    const tx = new Transaction({
      data: new TransactionPayload(data),
      gasLimit: 70000,
      sender: new Address(sender),
      receiver: new Address(address),
      value: token.amount,
      chainID: ChainId,
    });
    const res = await sendTransactions({
      transactions: tx,
    });
  } else {
    ESDTTransfer({
      contractAddr: address,
      funcName: "",
      token: token,
      args: [],
      gasL: Number(fee),
      realValue: token.amount,
    });
  }
};
