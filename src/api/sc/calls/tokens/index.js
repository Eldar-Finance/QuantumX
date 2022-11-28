import {
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  Transaction,
  TransactionPayload,
} from "@elrondnetwork/erdjs/out";
import { ChainId, contractAddr } from "api/net.config";
import { sendMultipleTransactions } from "api/sc/sc";
import BigNumber from "bignumber.js";
import { getGasLimitByLkmexType } from "lib/functions";
import store from "redux/store";

export const mergeTokens = async ({ userAddress, lkmexArray }) => {
  const newArrLkmex = [];
  let temLmexArray = [];
  let count = 0;
  const numberOfLkmex = 4;

  lkmexArray.forEach((lkmex, i) => {
    temLmexArray.push(lkmex);
    count++;

    if (temLmexArray.length === numberOfLkmex) {
      newArrLkmex.push(temLmexArray);
      temLmexArray = [];
    } else {
      if (lkmexArray.length - count < numberOfLkmex) {
        if (i === lkmexArray.length - 1) {
          if (temLmexArray.length !== 1) {
            newArrLkmex.push(temLmexArray);
          }
        }
      }
    }
  });

  const transactions = [];

  for (let i = 0; i < newArrLkmex.length; i++) {
    const lkmexArray = newArrLkmex[i];

    const txGas = getGasLimitByLkmexType(lkmexArray);
    let lkmexList = lkmexArray;

    if (txGas > 600000000) {
      lkmexList = lkmexArray.filter((val, index) => index < 10);
    }

    const Args = [
      new AddressValue(new Address(contractAddr.tokens)),
      new BigUIntValue(new BigNumber(lkmexList.length)),
    ];

    for (const token of lkmexList) {
      Args.push(
        BytesValue.fromUTF8(token.collection),
        new BigUIntValue(new BigNumber(token.nonce)),
        new BigUIntValue(new BigNumber(token.balance))
      );
    }

    Args.push(BytesValue.fromUTF8("mergeTokens"));
    const payload = TransactionPayload.contractCall()
      .setFunction(new ContractFunction("MultiESDTNFTTransfer"))
      .setArgs(Args)
      .build();

    const sender = store.getState().userAccount.connectedAddress;
    const senderAddress = new Address(sender);
    const tx = new Transaction({
      sender: senderAddress,
      receiver: new Address(userAddress),
      value: 0,
      data: payload,
      gasLimit: txGas,
      chainID: ChainId,
    });

    transactions.push(tx);
  }

  return await sendMultipleTransactions({ txs: transactions });
};
