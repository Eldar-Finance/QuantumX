import {
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  TokenIdentifierValue,
  TransactionPayload,
} from "@elrondnetwork/erdjs/out";
import { EGLD_VAL, getInterface, sendTransaction } from "api/sc/sc";
import BigNumber from "bignumber.js";
import orderBy from "lodash/orderBy";

export const swapLkmexEgldTx = async (
  workspace,
  tokens,
  toTokenIdentifier,
  lkmexAmount,
  userAddress,
  slipageValue
) => {
  const { address, simpleAddress, abiUrl, implementsInterfaces } =
    getInterface(workspace);

  const newArrLkmex = [];

  let amountAcc = new BigNumber(0);
  let offset = new BigNumber(0);
  const orderedTokens = orderBy(
    tokens,
    [
      function (token) {
        return Number(token.balance);
      },
    ],
    "desc"
  );

  for (let i = 0; i < orderedTokens.length; i++) {
    const token = orderedTokens[i];
    const tokenBalance = new BigNumber(token.balance);
    const realBalance = tokenBalance.dividedBy(EGLD_VAL).toNumber();
    amountAcc = amountAcc.plus(tokenBalance);
    newArrLkmex.push(token);
    const largeLkmexAmount = new BigNumber(lkmexAmount).times(EGLD_VAL);
    if (amountAcc.comparedTo(largeLkmexAmount) === 1) {
      offset = amountAcc.minus(largeLkmexAmount);
      break;
    }
  }

  const Args = [
    new AddressValue(new Address(simpleAddress)),
    new BigUIntValue(new BigNumber(newArrLkmex.length)),
  ];

  for (let i = 0; i < newArrLkmex.length; i++) {
    const token = newArrLkmex[i];
    let extraAmount = 0;

    if (i === newArrLkmex.length - 1) {
      extraAmount = offset;
    }

    const value = new BigNumber(token.balance).minus(extraAmount);
    Args.push(
      BytesValue.fromUTF8(token.collection),
      new BigUIntValue(new BigNumber(token.nonce)),
      new BigUIntValue(new BigNumber(value))
    );
  }

  Args.push(BytesValue.fromUTF8("swap"));
  Args.push(new TokenIdentifierValue(toTokenIdentifier));
  Args.push(new BigUIntValue(new BigNumber(slipageValue)));
  Args.push(new BigUIntValue(new BigNumber(2)));

  const payload = TransactionPayload.contractCall()
    .setFunction(new ContractFunction("MultiESDTNFTTransfer"))
    .setArgs(Args)
    .build();

  const transactionData = {
    addr: userAddress,
    payload: payload,
  };

  return await sendTransaction(transactionData);
};
