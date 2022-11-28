import {
  Address,
  BytesValue,
  ContractFunction,
  Transaction,
  TransactionPayload,
} from "@elrondnetwork/erdjs/out";
import { ChainId } from "api/net.config";
import { getInterface, sendMultipleTransactions } from "api/sc/sc";
import store from "redux/store";

export const claimRpsRewards = async (tokens, workspace) => {
  const { address, simpleAddress, abiUrl, implementsInterfaces } =
    getInterface(workspace);

  const transactions = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    const payload = TransactionPayload.contractCall()
      .setFunction(new ContractFunction("claimRewards"))
      .setArgs([BytesValue.fromUTF8(token)])
      .build();

    const sender = store.getState().userAccount.connectedAddress;
    const senderAddress = new Address(sender);
    const tx = new Transaction({
      sender: senderAddress,
      value: 0,
      receiver: address,
      data: payload,
      gasLimit: 20000000,
      chainID: ChainId,
    });

    transactions.push(tx);
  }

  return await sendMultipleTransactions({ txs: transactions });
};
