import {
  Address,
  AddressValue,
  BigUIntValue,
  BooleanValue,
  BytesValue,
  ContractFunction,
  Transaction,
  TransactionPayload,
  SmartContract,
  Interaction,
  Account,
  TokenTransfer
} from "@multiversx/sdk-core/out";
import { SendTransactionReturnType } from "@multiversx/sdk-dapp/types";
import { ChainId, contractAddr, toknesID } from "api/net.config";
import {
  EGLDPayment,
  ESDTTransfer,
  EsdtTranferAndUnwrapEgld,
  wrapEgldAndEsdtTranfer,
} from "api/sc/calls";
import { EGLD_VAL, getInterface, sendMultipleTransactions, wrapEgldpWspShard1 } from "api/sc/sc";
import BigNumber from "bignumber.js";
import store from "redux/store";
import { setElrondBalance } from "utils/functions/formatBalance";
import { getScOfWrapedEgld } from "utils/functions/helpers";
import { IElrondToken } from "utils/types/elrond.interface";
import {
  ILpSmartSwap,
  INomalSmartSwap,
  ISmartSwapData,
} from "utils/types/others.interface";

export const getNormalSwapArgs = (swapInfo: INomalSmartSwap[], slipapge) => {
  const dataToSend = swapInfo.flatMap((item) => {
    let scSwap = "swapTokensFixedInput";
    if (item?.type === "exchange") {
      scSwap = "exchange";
    }
    const amountWithSlipage = new BigNumber(item.amountReceivDec)
      .multipliedBy(slipapge)
      .dividedBy(100)
      .toNumber();

    const finalAmount = new BigNumber(item.amountReceivDec)
      .minus(amountWithSlipage)
      .toFixed(0);

    return [
      new AddressValue(new Address(item.smartcontract)),
      BytesValue.fromUTF8(scSwap),
      BytesValue.fromUTF8(item.token2),
      new BigUIntValue(new BigNumber(finalAmount)),
    ];
  });

  return dataToSend;
};

export const swap = async (
  swapInfo: INomalSmartSwap[],
  slipapge,
  fromToken,
  toField,
  fromElrondToken,
  gas
): Promise<SendTransactionReturnType> => {
  let isAshaStable = false;
  let scEndpoint = "swap";

  swapInfo.forEach((swapI) => {
    if (swapI?.type === "exchange") {
      isAshaStable = true;
    }
  });

  if (isAshaStable) {
    scEndpoint = "swapStable";
  }

  const dataToSend = getNormalSwapArgs(swapInfo, slipapge);
  console.log("⚠️ ~ file: swap.ts:83 ~ dataToSend::::", dataToSend)

  // if user want EGLD -> WEGLD
  if (fromToken.token === "EGLD" && toField.token === toknesID.wegld) {
    return await EGLDPayment(
      wrapEgldpWspShard1,
      "wrapEgld",
      fromToken.value,
      [],
      60000000
    );
  } else {
    // if user want WEGLD -> EGLD
    if (fromToken.token === toknesID.wegld && toField.token === "EGLD") {
      return await ESDTTransfer({
        funcName: "unwrapEgld",
        val: fromToken.value,
        token: fromElrondToken,
        contractAddr: contractAddr.wrapEgldShar1,
        gasL: 60000000,
      });
    } else {
      // if User want to send EGLD
      if (fromToken.token === "EGLD") {
        return await wrapEgldAndEsdtTranfer(
          fromToken.value,
          scEndpoint,
          dataToSend,
          contractAddr.smartSwap,
          gas
        );
      } else {
        // if User want to receive EGLD
        if (toField.token === "EGLD") {
          return await EsdtTranferAndUnwrapEgld(
            fromElrondToken,
            fromToken.value,
            swapInfo[swapInfo.length - 1].amountReceiv,
            scEndpoint,
            dataToSend,
            contractAddr.smartSwap,
            gas
          );
        } else {
          // is user is going to swap 2 tokens
          return await ESDTTransfer({
            funcName: scEndpoint,
            token: fromElrondToken,
            val: fromToken.value,
            contractAddr: contractAddr.smartSwap,
            args: dataToSend,
            gasL: gas,
          });
        }
      }
    }
  }
};

//lp swaps

export const getFirstArgsOfLpSwaps = (
  swapInfo: ISmartSwapData[],
  slipapge = 2
) => {
  const lpSwapInfo = swapInfo[0] as ILpSmartSwap;
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
  return lpSwapArg;
};

export const getOthersArgsOfLpSwaps = (swapLpData: any[], slipapge = 2) => {
  // swaps args
  const multiswapArgs = swapLpData.flatMap((sawpData, i) => {
    const amountWithSlipage = new BigNumber(sawpData.amountReceivDec)
      .multipliedBy(slipapge)
      .dividedBy(100)
      .toNumber();

    const finalAmount = new BigNumber(sawpData.amountReceivDec)
      .minus(amountWithSlipage)
      .toFixed(0);
    const swapArgs: (
      | AddressValue
      | BytesValue
      | BigUIntValue
      | BooleanValue
    )[] = [
      new AddressValue(new Address(sawpData.smartcontract)),
      BytesValue.fromUTF8("swapTokensFixedInput"),
      BytesValue.fromUTF8(sawpData.token2),
      new BigUIntValue(new BigNumber(finalAmount)),
    ];

    return swapArgs;
  });
  return multiswapArgs;
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
  const lpSwapInfo = swapInfo[0] as ILpSmartSwap;

  const lpSwapArg = getFirstArgsOfLpSwaps(swapInfo, slipapge);

  lpSwapTx(
    [
      {
        collection: lpSwapInfo.token1identifier,
        nonce: 0,
        value: lpSwapInfo.token1lpamount,
      },
      {
        collection: lpSwapInfo.token2identifier,
        nonce: 0,
        value: lpSwapInfo.token2lpamount,
      },
    ],
    lpSwapArg,
    slipapge,
    {
      token: fromElrondToken,
      value: fromToken.value,
    },
    swapInfo.filter((_d, i) => i > 0) as INomalSmartSwap[]
  );
};
export const lpSwapTx = async (
  tokens: {
    collection: string;
    nonce: number;
    value: any;
  }[],
  swapLpArgs: any[],
  slipapge: number,
  inputToken: {
    token: IElrondToken;
    value: any;
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
      
      const wrapcontract = new SmartContract({ address: new Address(wrapContractBasedOnShard)});
      let interaction = new Interaction(wrapcontract, new ContractFunction("wrapEgld"), []);
    
      const value = new BigNumber(inputToken.value)
      .multipliedBy(EGLD_VAL)
      .toFixed(0);

      let tx1 = interaction
        .withSender(senderAddress)
        .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
        .withValue(value)
        .withGasLimit(20000000)
        .withChainID(ChainId)
        .buildTransaction();
      
      transactions.push(tx1);
    }

    // swaps args
    const multiswapArgs = getOthersArgsOfLpSwaps(swapLpData, slipapge);

    // lp args
    const bgFinalValue = setElrondBalance(
      inputToken.value,
      inputToken.token.decimals
    );

    const contract = new SmartContract({ address: new Address(simpleAddress)});
    let interaction2 = new Interaction(contract, new ContractFunction("swapLp"), [
      ...swapLpArgs,
      new BigUIntValue(new BigNumber(swapLpData[0].NrSwaps)),
      ...multiswapArgs,
    ]);
  
    let tx2 = interaction2
      .withSender(senderAddress)
      .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
      .withSingleESDTTransfer(TokenTransfer.fungibleFromBigInteger(swapLpData[0].token1, bgFinalValue))
      .withGasLimit(100000000)
      .withChainID(ChainId)
      .buildTransaction();
  
    transactions.push(tx2);

    return await sendMultipleTransactions({ txs: transactions });
  } catch (error) {
    console.log("error", error);
  }
};
