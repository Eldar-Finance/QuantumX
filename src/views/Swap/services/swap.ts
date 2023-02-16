import { transactionServices } from "@elrondnetwork/dapp-core";
import {
  Address,
  AddressValue,
  BigUIntValue,
  BooleanValue,
  BytesValue,
  ContractFunction,
  Transaction,
  TransactionPayload,
} from "@elrondnetwork/erdjs/out";
import { ChainId, contractAddr, toknesID } from "api/net.config";
import {
  EGLDPayment,
  EsdtTranferAndUnwrapEgld,
  ESDTTransfer,
  wrapEgldAndEsdtTranfer,
} from "api/sc/calls";
import { EGLD_VAL, getInterface, sendMultipleTransactions } from "api/sc/sc";
import BigNumber from "bignumber.js";
import store from "redux/store";
import { getScOfWrapedEgld } from "utils/functions/helpers";
import { IElrondToken } from "utils/types/elrond.interface";
import {
  ILpSmartSwap,
  INomalSmartSwap,
  ISmartSwapData,
} from "utils/types/others.interface";

export const swap = async (
  swapInfo,
  slipapge,
  fromToken,
  toField,
  fromElrondToken,
  gas
): Promise<transactionServices.SendTransactionReturnType> => {
  const dataToSend = swapInfo.flatMap((item) => {
    const amountWithSlipage = new BigNumber(item.amountReceivDec)
      .multipliedBy(slipapge)
      .dividedBy(100)
      .toNumber();

    const finalAmount = new BigNumber(item.amountReceivDec)
      .minus(amountWithSlipage)
      .toFixed(0);

    return [
      new AddressValue(new Address(item.smartcontract)),
      BytesValue.fromUTF8("swapTokensFixedInput"),
      BytesValue.fromUTF8(item.token2),
      new BigUIntValue(new BigNumber(finalAmount)),
    ];
  });
  // if user want EGLD -> WEGLD
  if (fromToken.token === "EGLD" && toField.token === toknesID.wegld) {
    return await EGLDPayment(
      contractAddr.wrapEgldShar1,
      "wrapEgld",
      Number(fromToken.value),
      [],
      60000000
    );
  } else {
    // if user want WEGLD -> EGLD
    if (fromToken.token === toknesID.wegld && toField.token === "EGLD") {
      return await ESDTTransfer({
        funcName: "unwrapEgld",
        val: Number(fromToken.value),
        token: fromElrondToken,
        contractAddr: contractAddr.wrapEgldShar1,
        gasL: 60000000,
      });
    } else {
      // if User want to send EGLD
      if (fromToken.token === "EGLD") {
        return await wrapEgldAndEsdtTranfer(
          Number(fromToken.value),
          "swap",
          dataToSend,
          contractAddr.smartSwap,
          gas
        );
      } else {
        // if User want to receive EGLD
        if (toField.token === "EGLD") {
          return await EsdtTranferAndUnwrapEgld(
            fromElrondToken,
            Number(fromToken.value),
            swapInfo[swapInfo.length - 1].amountReceiv,
            "swap",
            dataToSend,
            contractAddr.smartSwap,
            gas
          );
        } else {
          // is user is going to swap 2 tokens
          return await ESDTTransfer({
            funcName: "swap",
            token: fromElrondToken,
            val: Number(fromToken.value),
            contractAddr: contractAddr.smartSwap,
            args: dataToSend,
            gasL: gas,
          });
        }
      }
    }
  }
};
export const swapLp = async (
  swapInfo: ISmartSwapData[],
  slipapge: number,
  fromToken: {
    value: string;
    token: string;
  },
  toField: {
    value: string;
    token: string;
  },
  fromElrondToken: IElrondToken,
  gas: number
): Promise<any> => {
  const lpSwapInfo = swapInfo[swapInfo.length - 1] as ILpSmartSwap;
  //token1_amount_min
  const token1SlippagePercent = new BigNumber(lpSwapInfo.token1lpamount)
    .multipliedBy(slipapge)
    .dividedBy(100)
    .toNumber();
  const finalToken1Amount = new BigNumber(lpSwapInfo.token1lpamount)
    .minus(token1SlippagePercent)
    .toFixed(0);

  //token2_amount_min
  const token2SlippagePercent = new BigNumber(lpSwapInfo.token2lpamount)
    .multipliedBy(slipapge)
    .dividedBy(100)
    .toNumber();
  const finalToken2Amount = new BigNumber(lpSwapInfo.token2lpamount)
    .minus(token2SlippagePercent)
    .toFixed(0);

  const lpSwapArg = [
    new AddressValue(new Address(lpSwapInfo.smartcontract)),
    BytesValue.fromUTF8(lpSwapInfo.token1identifier),
    new BigUIntValue(new BigNumber(finalToken1Amount)),
    BytesValue.fromUTF8(lpSwapInfo.token2identifier),
    new BigUIntValue(new BigNumber(finalToken2Amount)),
    BytesValue.fromUTF8(lpSwapInfo.lptokenidentifier),
  ];

  lpSwapTx(
    [
      {
        collection: lpSwapInfo.token1identifier,
        nonce: 0,
        value: Number(lpSwapInfo.token1lpamount),
      },
      {
        collection: lpSwapInfo.token2identifier,
        nonce: 0,
        value: Number(lpSwapInfo.token2lpamount),
      },
    ],
    lpSwapArg,
    slipapge,
    {
      token: fromElrondToken,
      value: fromToken.value,
    },
    swapInfo.filter((_d, i) => swapInfo.length - 1 !== i) as INomalSmartSwap[]
  );
};

export const lpSwapTx = async (
  tokens: {
    collection: string;
    nonce: number;
    value: number;
  }[],
  swapLpArgs: any[],
  slipapge: number,
  inputToken: {
    token: IElrondToken;
    value: string;
  },
  swapLpData: INomalSmartSwap[]
) => {
  try {
    const transactions = [];
    const userAddress = store.getState().userAccount.connectedAddress;
    const senderAddress = new Address(userAddress);

    let { simpleAddress } = getInterface("smartSwap");

    // user want to send Egld
    if (inputToken.token.identifier === "EGLD") {
      //wrap egld
      const shard = store.getState().userAccount.connectedShard;
      const wrapContractBasedOnShard = getScOfWrapedEgld(shard);
      const payload = TransactionPayload.contractCall()
        .setFunction(new ContractFunction("wrapEgld"))
        .setArgs([])
        .build();
      const value = new BigNumber(inputToken.value)
        .multipliedBy(EGLD_VAL)
        .toFixed(0);

      const wrapTx = new Transaction({
        sender: senderAddress,
        value: value,
        receiver: new Address(wrapContractBasedOnShard),
        data: payload,
        gasLimit: 30000000,
        chainID: ChainId,
      });
      transactions.push(wrapTx);
    }

    // swaps args
    const multiswapArgs = swapLpData.flatMap((sawpData) => {
      const amountWithSlipage = new BigNumber(sawpData.amountReceivDec)
        .multipliedBy(slipapge)
        .dividedBy(100)
        .toNumber();

      const finalAmount = new BigNumber(sawpData.amountReceivDec)
        .minus(amountWithSlipage)
        .toFixed(0);
      const swapArgs = [
        new AddressValue(new Address(sawpData.smartcontract)),
        BytesValue.fromUTF8("swapTokensFixedInput"),
        BytesValue.fromUTF8(sawpData.token2),
        new BigUIntValue(new BigNumber(finalAmount)),
      ];
      return swapArgs;
    });

    // lp args
    const bgFinalValue =
      swapLpData[0].HowMuch === "HALF"
        ? new BigNumber(swapLpData[0].amountsend).multipliedBy(2).toFixed(0)
        : new BigNumber(swapLpData[0].amountsend).toFixed(0);
    const esdtTranferPayload = TransactionPayload.contractCall()
      .setFunction(new ContractFunction("ESDTTransfer"))
      .setArgs([
        BytesValue.fromUTF8(swapLpData[0].token1),
        new BigUIntValue(new BigNumber(bgFinalValue)),
        BytesValue.fromUTF8("multiswap"),

        ...swapLpArgs,
        new BooleanValue(swapLpData[0].HowMuch === "HALF"),
        ...multiswapArgs,
      ])
      .build();

    const tx1 = new Transaction({
      sender: senderAddress,
      value: 0,
      receiver: new Address(simpleAddress),
      data: esdtTranferPayload,
      gasLimit: 80000000,
      chainID: ChainId,
    });
    transactions.push(tx1);

    return await sendMultipleTransactions({ txs: transactions });
  } catch (error) {
    console.log("error", error);
  }
};
