import {
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  Transaction,
  TransactionPayload,
  ContractCallPayloadBuilder
} from "@multiversx/sdk-core/out";
import { ChainId, toknesID } from "api/net.config";
import {
  EGLD_VAL,
  WspTypes,
  getInterface,
  sendMultipleTransactions,
  sendTransaction,
} from "api/sc/sc";
import BigNumber from "bignumber.js";
import store from "redux/store";
import { getScOfWrapedEgld } from "utils/functions/helpers";
import { AbiRegistry, SmartContract, U32Value, Interaction, TokenTransfer, Account} from "@multiversx/sdk-core";
import { sendTransactions } from "@multiversx/sdk-dapp/services";

/* Messages */
const defaultProcessingMessage = "Processing transaction";
const defaultPerrorMessage = "An error has occured";
const defaultSuccessMessage = "Transaction successful";
const defaulttransactionDuration = 1000 * 60 * 2;

export const ESDTNFTTransfer = async (
  funcName = "",
  userAddress = "",
  value = 0,
  token,
  contractAddr = "",
  gasL: number = 60000000,
  args = [],
  finalTokenValue?: number | string
) => {
  try {
    const tokenId = token.collection;
    const tokenNonce = token.nonce;
    const finalValue = Number(finalTokenValue) || Number(value) * EGLD_VAL;
  
    const sender = store.getState().userAccount.connectedAddress;
    const senderAddress = new Address(sender);
    const receiverAddress = new Address(sender);
  
    const contract = new SmartContract({ address: new Address(contractAddr)});
    let interaction = new Interaction(contract, new ContractFunction(funcName), args);
  
    let tx = interaction
      .withSender(senderAddress)
      .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
      .withSingleESDTNFTTransfer(TokenTransfer.semiFungible(tokenId, tokenNonce, finalValue))
      .withExplicitReceiver(senderAddress)
      .withGasLimit(gasL)
      .withChainID(ChainId)
      .buildTransaction();
  
    let transactionInput = { tx: tx };
  
    return await sendTransaction(transactionInput);
  } catch (error) {
    console.log("error", error);
  }
};

// export const MultiESDTNFTTransfer = async (
//   wsp: WspTypes,
//   funcName: string,
//   tokens: {
//     collection: string;
//     nonce: number;
//     value: number;
//   }[],
//   args: any[] = [],
//   gasL: number = 100000000
// ) => {
//   try {
//     const userAddress = store.getState().userAccount.connectedAddress;
//     let { simpleAddress } = getInterface(wsp);

//     const data = tokens.flatMap((nft) => {
//       const nftData = [
//         BytesValue.fromUTF8(nft.collection), // <token identifier in hexadecimal encoding>
//         new BigUIntValue(new BigNumber(nft.nonce)), // <token nonce in hexadecimal encoding>
//         new BigUIntValue(new BigNumber(nft.value)), //<token quantity to transfer in hexadecimal encoding>
//       ];
//       return nftData;
//     });

//     const payload = TransactionPayload.contractCall()
//       .setFunction(new ContractFunction("MultiESDTNFTTransfer"))
//       .setArgs([
//         new AddressValue(new Address(simpleAddress)), // <receiver bytes in hexadecimal encoding>
//         new BigUIntValue(new BigNumber(tokens.length)), //<number of tokens to transfer in hexadecimal encoding>
//         ...data,
//         BytesValue.fromUTF8(funcName),
//         ...args,
//       ])
//       .build();

//     const transactionData: any = {
//       addr: userAddress,
//       payload: payload,
//       gasL: gasL,
//     };

//     return await sendTransaction(transactionData);
//   } catch (error) {
//     console.log("error", error);
//   }
// };

export const ESDTTransfer = async ({
  funcName,
  token,
  val = 0,
  contractAddr = "",
  args = [],
  gasL = 60000000,
  realValue = null,
}: {
  funcName: string;
  token: any;
  val?: number | string;
  contractAddr: string;
  args?: any[];
  gasL?: number;
  realValue?: string | number | null;
}) => {
  const tokenIdentifier = token.identifier;
  const multiplyier = Math.pow(10, token.decimals || 18);
  const finalValue = realValue || Number(val || 0) * multiplyier;
  const bgFinalValue = new BigNumber(finalValue).toFixed(0);

  const receiverAddress = new Address(contractAddr);

  const sender = store.getState().userAccount.connectedAddress;
  const senderAddress = new Address(sender);

  const contract = new SmartContract({ address: receiverAddress});
  let interaction = new Interaction(contract, new ContractFunction(funcName), args);

  let tx = interaction
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
    .withSingleESDTTransfer(TokenTransfer.fungibleFromBigInteger(tokenIdentifier, bgFinalValue, token.decimals))
    .withGasLimit(gasL)
    .withChainID(ChainId)
    .buildTransaction();

  let transactionInput = { tx: tx };

  return await sendTransaction(transactionInput);
};

// export const ESDTTransferOnlyTx = async ({
//   funcName,
//   token,
//   val = 0,
//   contractAddr = "",
//   args = [],
//   gasL = 60000000,
//   realValue = null,
// }) => {
//   const sender = store.getState().userAccount.connectedAddress;
//   const senderAddress = new Address(sender);
//   const receiverAddress = new Address(contractAddr);

//   const tokenIdentifier = token.identifier;
//   const multiplyier = Math.pow(10, token.decimals || 18);
//   const finalValue = realValue || Number(val ?? 0) * multiplyier;

//   const bgFinalValue = new BigNumber(finalValue).toFixed(0);
//   const payload = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction("ESDTTransfer"))
//     .setArgs([
//       BytesValue.fromUTF8(tokenIdentifier),
//       new BigUIntValue(new BigNumber(bgFinalValue)),
//       BytesValue.fromUTF8(funcName),
//       ...args,
//     ])
//     .build();

//   const tx = new Transaction({
//     sender: senderAddress,
//     value: 0,
//     receiver: receiverAddress,
//     data: payload,
//     gasLimit: gasL || 60000000,
//     chainID: ChainId,
//   });
//   return tx;
// };

export const scCall = async (
  workspace: WspTypes,
  funcName: string,
  args: any = [],
  gasLimit: number = 60000000
) => {
  let { simpleAddress } = getInterface(workspace);

  if (simpleAddress === "") {
    simpleAddress = workspace;
  }

  const sender = store.getState().userAccount.connectedAddress;
  const senderAddress = new Address(sender);

  const contract = new SmartContract({ address: new Address(simpleAddress)});
  let interaction = new Interaction(contract, new ContractFunction(funcName), args);

  let tx = interaction
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
    .withGasLimit(gasLimit)
    .withChainID(ChainId)
    .buildTransaction();

  let transactionInput = { tx: tx };

  return await sendTransaction(transactionInput);
};

// export const scCallOnlyTx = async (
//   workspace: WspTypes,
//   funcName: string,
//   args: any = [],
//   gasLimit?: number
// ) => {
//   let { simpleAddress } = getInterface(workspace);
//   const sender = store.getState().userAccount.connectedAddress;
//   const senderAddress = new Address(sender);

//   const receiverAddress = new Address(simpleAddress);

//   if (simpleAddress === "") {
//     simpleAddress = workspace;
//   }

//   const payload = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction(funcName))
//     .setArgs(args)
//     .build();

//   const tx = new Transaction({
//     sender: senderAddress,
//     value: 0,
//     receiver: receiverAddress,
//     data: payload,
//     gasLimit: gasLimit || 60000000,
//     chainID: ChainId,
//   });
//   return tx;
// };

// // need to check if works (is not used yet)
// export const MultiEgldPayment = async (
//   workspace: WspTypes,
//   funcName: string,
//   egldAmounts: number[],
//   args: any[],
//   gasLimit?: number
// ) => {
//   const transactions = [];
//   const sender = store.getState().userAccount.connectedAddress;
//   const senderAddress = new Address(sender);
//   const { simpleAddress: scAddress } = getInterface(workspace);
//   const receiverAddress = new Address(scAddress);

//   egldAmounts.forEach((amount) => {
//     const payload = TransactionPayload.contractCall()
//       .setFunction(new ContractFunction(funcName))
//       .setArgs(args)
//       .build();

//     const tx = new Transaction({
//       sender: senderAddress,
//       value: amount * EGLD_VAL,
//       receiver: receiverAddress,
//       data: payload,
//       gasLimit: gasLimit || 60000000,
//       chainID: ChainId,
//     });

//     transactions.push(tx);
//   });

//   return await sendMultipleTransactions({ txs: transactions });
// };

// export const EGLDPayment = async (
//   workspace: WspTypes,
//   funcName,
//   amount,
//   args = [],
//   gasLimit,
//   finalAmount = null
// ) => {
//   let { simpleAddress } = getInterface(workspace);

//   if (simpleAddress === "") {
//     simpleAddress = workspace;
//   }

//   const payload = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction(funcName))
//     .setArgs(args)
//     .build();
//   const transactionData: any = {
//     addr: simpleAddress,
//     payload: payload,
//     value: finalAmount ?? amount * EGLD_VAL,
//     gasL: gasLimit || 60000000,
//   };

//   return await sendTransaction(transactionData);
// };
// export const EGLDPaymentOnlyTx = async (
//   workspace: WspTypes,
//   funcName,
//   amount,
//   args = [],
//   gasLimit,
//   finalAmount = null
// ) => {
//   let { simpleAddress } = getInterface(workspace);
//   const sender = store.getState().userAccount.connectedAddress;
//   const senderAddress = new Address(sender);
//   const receiverAddress = new Address(simpleAddress);
//   if (simpleAddress === "") {
//     simpleAddress = workspace;
//   }

//   const payload = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction(funcName))
//     .setArgs(args)
//     .build();

//   const tx = new Transaction({
//     sender: senderAddress,
//     value: finalAmount ?? amount * EGLD_VAL,
//     receiver: receiverAddress,
//     data: payload,
//     gasLimit: gasLimit || 60000000,
//     chainID: ChainId,
//   });
//   return tx;
// };

// export const MultESDTNFTTranferOrEgldPayment = async (
//   workspace: WspTypes,
//   funcName: string,
//   tokens: {
//     identifier: string;
//     nonce: number;
//     amount: number | string;
//   }[],
//   args: any[],
//   gasLimit
// ) => {
//   const transactions = [];
//   const sender = store.getState().userAccount.connectedAddress;
//   const senderAddress = new Address(sender);
//   const { simpleAddress: scAddress } = getInterface(workspace);
//   const receiverAddress = new Address(scAddress);

//   const egldPaymentTokens = tokens.filter(
//     (token) => token.identifier === "EGLD"
//   );
//   const ohterTokens = tokens.filter((token) => token.identifier !== "EGLD");

//   egldPaymentTokens.forEach((token) => {
//     const payload = TransactionPayload.contractCall()
//       .setFunction(new ContractFunction(funcName))
//       .setArgs(args)
//       .build();

//     const tx = new Transaction({
//       sender: senderAddress,
//       value: token.amount,
//       receiver: receiverAddress,
//       data: payload,
//       gasLimit: gasLimit || 60000000,
//       chainID: ChainId,
//     });

//     transactions.push(tx);
//   });

//   const esdtTokensData = ohterTokens.flatMap((nft) => {
//     const nftData = [
//       BytesValue.fromUTF8(nft.identifier), // <token identifier in hexadecimal encoding>
//       new BigUIntValue(new BigNumber(nft.nonce)), // <token nonce in hexadecimal encoding>
//       new BigUIntValue(new BigNumber(nft.amount)), //<token quantity to transfer in hexadecimal encoding>
//     ];
//     return nftData;
//   });

//   if (esdtTokensData.length > 0) {
//     const payload = TransactionPayload.contractCall()
//       .setFunction(new ContractFunction("MultiESDTNFTTransfer"))
//       .setArgs([
//         new AddressValue(receiverAddress), // <receiver bytes in hexadecimal encoding>
//         new BigUIntValue(new BigNumber(tokens.length)), //<number of tokens to transfer in hexadecimal encoding>
//         ...esdtTokensData,
//         BytesValue.fromUTF8(funcName),
//         ...args,
//       ])
//       .build();
//     const esdtTranferTx = new Transaction({
//       sender: senderAddress,
//       value: 0,
//       receiver: senderAddress,
//       data: payload,
//       gasLimit: gasLimit || 60000000,
//       chainID: ChainId,
//     });
//     transactions.push(esdtTranferTx);
//   }

//   return await sendMultipleTransactions({ txs: transactions });
// };

// export const wrapEgldAndEsdtTranfer = async (
//   egldAmount: number | string,
//   funcName: string,
//   args: any[] = [],
//   scAddress: string,
//   gasL: number = 90000000
// ) => {
//   const sender = store.getState().userAccount.connectedAddress;
//   const value = new BigNumber(egldAmount).multipliedBy(EGLD_VAL).toFixed(0);

//   //wrap egld
//   const shard = store.getState().userAccount.connectedShard;
//   const wrapContractBasedOnShard = getScOfWrapedEgld(shard);
//   const payload = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction("wrapEgld"))
//     .setArgs([])
//     .build();

//   const tx1 = new Transaction({
//     sender: new Address(sender),
//     value: value,
//     receiver: new Address(wrapContractBasedOnShard),
//     data: payload,
//     gasLimit: 30000000,
//     chainID: ChainId,
//   });

//   //esdt transfer

//   const tokenIdentifier = toknesID.wegld;

//   const payload2 = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction("ESDTTransfer"))
//     .setArgs([
//       BytesValue.fromUTF8(tokenIdentifier),
//       new BigUIntValue(new BigNumber(value)),
//       BytesValue.fromUTF8(funcName),
//       ...args,
//     ])
//     .build();

//   const tx2 = new Transaction({
//     sender: new Address(sender),
//     value: 0,
//     receiver: new Address(scAddress),
//     data: payload2,
//     gasLimit: gasL,
//     chainID: ChainId,
//   });

//   return await sendMultipleTransactions({ txs: [tx1, tx2] });
// };

// export const EsdtTranferAndUnwrapEgld = async (
//   token: {
//     decimals: number;
//     identifier: string;
//   },
//   val: number | string,
//   wegldAmount: number | string,
//   funcName: string,
//   args: any[] = [],
//   scAddress: string,
//   gasL: number = 90000000
// ) => {
//   const sender = store.getState().userAccount.connectedAddress;

//   const tokenIdentifier = token.identifier;
//   const multiplyier = Math.pow(10, token.decimals || 18);
//   const finalValue = Number(val) * multiplyier;

//   const bgFinalValue = new BigNumber(finalValue).toFixed(0);

//   const payload = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction("ESDTTransfer"))
//     .setArgs([
//       BytesValue.fromUTF8(tokenIdentifier),
//       new BigUIntValue(new BigNumber(bgFinalValue)),
//       BytesValue.fromUTF8(funcName),
//       ...args,
//     ])
//     .build();

//   const tx1 = new Transaction({
//     sender: new Address(sender),
//     value: 0,
//     receiver: new Address(scAddress),
//     data: payload,
//     gasLimit: gasL,
//     chainID: ChainId,
//   });

//   //uwwrap wegld
//   const shard = store.getState().userAccount.connectedShard;
//   const wrapContractBasedOnShard = getScOfWrapedEgld(shard);

//   const wegldAmountToSend = Number(wegldAmount) * EGLD_VAL;

//   const wegldAmountToSendFinalValue = new BigNumber(wegldAmountToSend).toFixed(
//     0
//   );

//   const payload2 = TransactionPayload.contractCall()
//     .setFunction(new ContractFunction("ESDTTransfer"))
//     .setArgs([
//       BytesValue.fromUTF8(toknesID.wegld),
//       new BigUIntValue(new BigNumber(wegldAmountToSendFinalValue)),
//       BytesValue.fromUTF8("unwrapEgld"),
//     ])
//     .build();

//   const tx2 = new Transaction({
//     sender: new Address(sender),
//     value: 0,
//     receiver: new Address(wrapContractBasedOnShard),
//     data: payload2,
//     gasLimit: 30000000,
//     chainID: ChainId,
//   });

//   return await sendMultipleTransactions({ txs: [tx1, tx2] });
// };
