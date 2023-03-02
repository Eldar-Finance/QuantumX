import {
  Address,
  BigUIntValue,
  BooleanValue,
  BytesValue,
  ContractFunction,
  Transaction,
  TransactionPayload,
  U64Value,
} from "@multiversx/sdk-core/out";
import { ChainId, contractAddr } from "api/net.config";
import { getHashedSwapData } from "api/rest/nextApi/swapHash";
import { sendMultipleTransactions } from "api/sc/sc";
import BigNumber from "bignumber.js";
import store from "redux/store";

export const fastSwapInJex = async (orders, scaddress) => {
  const transactions = [];
  const sender = store.getState().userAccount.connectedAddress;

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];

    const fromIdentifier = order.fromToken.token.identifier;

    const hashres = await getHashedSwapData(
      order.toToken.token.identifier,
      order.receiveBigNumber,
      sender
    );
    const hash = hashres.data.hash;
    let payload = null;
    let value;
    if (fromIdentifier !== "EGLD") {
      payload = TransactionPayload.contractCall()
        .setFunction(new ContractFunction("ESDTTransfer"))
        .setArgs([
          BytesValue.fromUTF8(fromIdentifier),
          new BigUIntValue(new BigNumber(order.spendBigNumber)),
          BytesValue.fromUTF8("swap"),
          new BooleanValue(order.type === "fill_offer_partial"),
          new U64Value(new BigNumber(order.orderId)),
          new BigUIntValue(new BigNumber(order.percent).multipliedBy(10)),
          BytesValue.fromUTF8(order.toToken.token.identifier),
          new BigUIntValue(new BigNumber(order.receiveBigNumber)),
          BytesValue.fromHex(hash),
        ])
        .build();
    } else {
      payload = TransactionPayload.contractCall()
        .setFunction(new ContractFunction("swap"))
        .setArgs([
          new BooleanValue(order.type === "fill_offer_partial"),
          new U64Value(new BigNumber(order.orderId)),
          new BigUIntValue(new BigNumber(order.percent).multipliedBy(10)),
          BytesValue.fromUTF8(order.toToken.token.identifier),
          new BigUIntValue(new BigNumber(order.receiveBigNumber)),
          BytesValue.fromHex(hash),
        ])
        .build();

      value = order.spendBigNumber;
    }

    const senderAddress = new Address(sender);
    const tx = new Transaction({
      sender: senderAddress,
      value: value,
      receiver: new Address(scaddress),
      data: payload,
      gasLimit: 80000000,
      chainID: ChainId,
    });

    transactions.push(tx);
  }

  return await sendMultipleTransactions({ txs: transactions });
};
export const claimTokens = async (tokens) => {
  const transactions = [];
  const sender = store.getState().userAccount.connectedAddress;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    const payload = TransactionPayload.contractCall()
      .setFunction(new ContractFunction("claim"))
      .setArgs([BytesValue.fromUTF8(token)])
      .build();

    const senderAddress = new Address(sender);
    const tx = new Transaction({
      sender: senderAddress,
      value: 0,
      receiver: new Address(contractAddr.fastp2pswap),
      data: payload,
      gasLimit: 50000000,
      chainID: ChainId,
    });

    transactions.push(tx);
  }

  return await sendMultipleTransactions({ txs: transactions });
};
