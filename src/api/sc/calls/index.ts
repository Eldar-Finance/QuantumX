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
import { ChainId, contractAddr, toknesID } from "api/net.config";
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
import { AbiRegistry, SmartContract, U32Value, Interaction, TokenTransfer, GasEstimator, TransferTransactionsFactory, Account} from "@multiversx/sdk-core";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
import { network } from "config.testnet";

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

export const MultiESDTNFTTransfer = async (
  wsp: WspTypes,
  funcName: string,
  tokens: {
    collection: string;
    nonce: number;
    value: number;
  }[],
  args: any[] = [],
  gasL: number = 100000000
) => {
  try {
    const sender = store.getState().userAccount.connectedAddress;
    const senderAddress = new Address(sender);

    let { simpleAddress } = getInterface(wsp);
    const receiverAddress = new Address(simpleAddress);

    const contract = new SmartContract({ address: receiverAddress});
    let interaction = new Interaction(contract, new ContractFunction(funcName), args);

    const data = tokens.flatMap((nft) => {
      const nftData = TokenTransfer.metaEsdtFromBigInteger(
        nft.collection,
        nft.nonce,
        new BigNumber(nft.value),
      );
      return nftData;
    });
  
    if (data.length > 0) {
      let tx = interaction
      .withSender(senderAddress)
      .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
      .withMultiESDTNFTTransfer(data)
      .withGasLimit(gasL)
      .withChainID(ChainId)
      .buildTransaction();

      let transactionInput = { tx: tx };

      return await sendTransaction(transactionInput);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const MultiESDTNFTTransferOnlyTx = async (
  wsp: WspTypes,
  funcName: string,
  tokens: {
    collection: string;
    nonce: number;
    value: number;
  }[],
  args: any[] = [],
  gasL: number = 100000000
) => {
  try {
    const sender = store.getState().userAccount.connectedAddress;
    const senderAddress = new Address(sender);

    let { simpleAddress } = getInterface(wsp);
    const receiverAddress = new Address(simpleAddress);

    const contract = new SmartContract({ address: receiverAddress});
    let interaction = new Interaction(contract, new ContractFunction(funcName), args);

    const data = tokens.flatMap((nft) => {
      const nftData = TokenTransfer.metaEsdtFromBigInteger(
        nft.collection,
        nft.nonce,
        new BigNumber(nft.value),
      );
      return nftData;
    });
  
    if (data.length > 0) {
      let tx = interaction
      .withSender(senderAddress)
      .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
      .withMultiESDTNFTTransfer(data)
      .withGasLimit(gasL)
      .withChainID(ChainId)
      .buildTransaction();

      return tx;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const ESDTTransferToUser = async ({
  token,
  receiver,
  val = 0,
  gasL = 60000000,
  realValue = null,
}: {
  token: any;
  receiver: string;
  val?: number | string;
  gasL?: number;
  realValue?: string | number | null;
}) => {
  const tokenIdentifier = token.identifier;
  const multiplyier = Math.pow(10, token.decimals || 18);
  const finalValue = realValue || Number(val || 0) * multiplyier;
  const bgFinalValue = new BigNumber(finalValue).toFixed(0);


  const sender = store.getState().userAccount.connectedAddress;
  const senderAddress = new Address(sender);

  const factory = new TransferTransactionsFactory(new GasEstimator());
  const transfer = TokenTransfer.fungibleFromBigInteger(tokenIdentifier, bgFinalValue, token.decimals);
  
  const tx = factory.createESDTTransfer({
      tokenTransfer: transfer,
      sender: senderAddress,
      receiver: new Address(receiver),
      chainID: ChainId,
      gasLimit: gasL
  });

  let transactionInput = { tx: tx };

  return await sendTransaction(transactionInput);
};

export const ESDTTransferToUserTxOnly = async ({
  token,
  receiver,
  val = 0,
  gasL = 60000000,
  realValue = null,
}: {
  token: any;
  receiver: string;
  val?: number | string;
  gasL?: number;
  realValue?: string | number | null;
}) => {
  const tokenIdentifier = token.identifier;
  const multiplyier = Math.pow(10, token.decimals || 18);
  const finalValue = realValue || Number(val || 0) * multiplyier;
  const bgFinalValue = new BigNumber(finalValue).toFixed(0);


  const sender = store.getState().userAccount.connectedAddress;
  const senderAddress = new Address(sender);

  const factory = new TransferTransactionsFactory(new GasEstimator());
  const transfer = TokenTransfer.fungibleFromBigInteger(tokenIdentifier, bgFinalValue, token.decimals);
  
  const tx = factory.createESDTTransfer({
      tokenTransfer: transfer,
      sender: senderAddress,
      receiver: new Address(receiver),
      chainID: ChainId,
      gasLimit: gasL
  });

  return tx;
};

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
  realValue?: string | number | null | BigNumber;
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

export const ESDTTransferOnlyTx = async ({
  funcName,
  token,
  val = 0,
  contractAddr = "",
  args = [],
  gasL = 60000000,
  realValue = null,
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

  return tx;
};

export const scCall = async (
  workspace: WspTypes,
  funcName: string,
  args: any = [],
  gasLimit: number = 60000000,
  processingMessage: string = defaultProcessingMessage,
  successMessage: string = defaultSuccessMessage,
  errorMessage: string = defaultPerrorMessage,
  transactionDuration: number = defaulttransactionDuration
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

  let transactionInput = {
    tx: tx,
    processingMessage: processingMessage,
    successMessage: successMessage,
    errorMessage: errorMessage,
    transactionDuration: transactionDuration,
  };

  return await sendTransaction(transactionInput);
};

export const scCallOnlyTx = async (
  workspace: WspTypes,
  funcName: string,
  args: any = [],
  gasLimit: number = 60000000
) => {
  let { simpleAddress } = getInterface(workspace);
  const sender = store.getState().userAccount.connectedAddress;
  const senderAddress = new Address(sender);

  const receiverAddress = new Address(simpleAddress);

  if (simpleAddress === "") {
    simpleAddress = workspace;
  }

  const contract = new SmartContract({ address: new Address(simpleAddress)});
  let interaction = new Interaction(contract, new ContractFunction(funcName), args);

  let tx = interaction
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
    .withGasLimit(gasLimit)
    .withChainID(ChainId)
    .buildTransaction();

  return tx;
};

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

export const EGLDPayment = async (
  workspace: WspTypes,
  funcName,
  amount,
  args = [],
  gasLimit: number = 60000000,
  finalAmount = null
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
    .withValue(finalAmount ?? amount * EGLD_VAL)
    .withGasLimit(gasLimit)
    .withChainID(ChainId)
    .buildTransaction();

  let transactionInput = { tx: tx };

  return await sendTransaction(transactionInput);
};

export const EGLDPaymentOnlyTx = async (
  workspace: WspTypes,
  funcName,
  amount,
  args = [],
  gasLimit: number = 60000000,
  finalAmount = null
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
    .withValue(finalAmount ?? amount * EGLD_VAL)
    .withGasLimit(gasLimit)
    .withChainID(ChainId)
    .buildTransaction();

  return tx;
};

export const MultESDTNFTTranferOrEgldPayment = async (
  workspace: WspTypes,
  funcName: string,
  tokens: {
    identifier: string;
    nonce: number;
    amount: number | string;
  }[],
  args: any[],
  gasLimit: number = 60000000
) => {
  const transactions = [];
  const sender = store.getState().userAccount.connectedAddress;
  const senderAddress = new Address(sender);
  const { simpleAddress: scAddress } = getInterface(workspace);
  const receiverAddress = new Address(scAddress);

  const egldPaymentTokens = tokens.filter(
    (token) => token.identifier === "EGLD"
  );
  const ohterTokens = tokens.filter((token) => token.identifier !== "EGLD");

  const contract = new SmartContract({ address: new Address(receiverAddress)});
  let interaction = new Interaction(contract, new ContractFunction(funcName), args);

  egldPaymentTokens.forEach((token) => {

    let tx = interaction
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
    .withValue(token.amount)
    .withGasLimit(gasLimit)
    .withChainID(ChainId)
    .buildTransaction();

    transactions.push(tx);
  });

  const esdtTokensData = ohterTokens.flatMap((nft) => {
    const nftData = TokenTransfer.fungibleFromBigInteger(
      nft.identifier,
      new BigNumber(nft.amount), //<token quantity to transfer in hexadecimal encoding>
    );
    return nftData;
  });

  if (esdtTokensData.length > 0) {
    let tx = interaction
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
    .withMultiESDTNFTTransfer(esdtTokensData)
    .withGasLimit(gasLimit)
    .withChainID(ChainId)
    .buildTransaction();

    transactions.push(tx);
  }

  return await sendMultipleTransactions({ txs: transactions });
};

export const wrapEgld = async (
  egldAmount: number | string,
  gasLimit: number = 3000000
) => {
  const sender = store.getState().userAccount.connectedAddress;
  const senderAddress = new Address(sender);

  const value = new BigNumber(egldAmount).multipliedBy(EGLD_VAL).toFixed(0);

  const shard = store.getState().userAccount.connectedShard;
  const wrapContractBasedOnShard = getScOfWrapedEgld(shard);

  const wrapContract = new SmartContract({ address: new Address(wrapContractBasedOnShard)});
  let interaction = new Interaction(wrapContract, new ContractFunction("wrapEgld"), []);

  let tx1 = interaction
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress))
    .withValue(value)
    .withGasLimit(gasLimit)
    .withChainID(ChainId)
    .buildTransaction();

  return await sendTransaction({ tx: tx1 });
};

export const wrapEgldAndEsdtTranfer = async (
  egldAmount: number | string,
  funcName: string,
  args: any[] = [],
  scAddress: string,
  gasL: number = 90000000
) => {
  const sender = store.getState().userAccount.connectedAddress;
  const senderAddress = new Address(sender);

  const value = new BigNumber(egldAmount).multipliedBy(EGLD_VAL).toFixed(0);

  //wrap egld
  const shard = store.getState().userAccount.connectedShard;
  const wrapContractBasedOnShard = getScOfWrapedEgld(shard);
  
  const wrapcontract = new SmartContract({ address: new Address(wrapContractBasedOnShard)});
  let interaction = new Interaction(wrapcontract, new ContractFunction("wrapEgld"), []);

  let tx1 = interaction
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
    .withValue(value)
    .withGasLimit(20000000)
    .withChainID(ChainId)
    .buildTransaction();

  //esdt transfer
  const tokenIdentifier = toknesID.wegld;

  const scaddress = new SmartContract({ address: new Address(scAddress)});
  let interaction2 = new Interaction(scaddress, new ContractFunction(funcName), args);

  let tx2 = interaction2
  .withSender(senderAddress)
  .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
  .withSingleESDTTransfer(TokenTransfer.fungibleFromBigInteger(tokenIdentifier, new BigNumber(value)))
  .withGasLimit(gasL)
  .withChainID(ChainId)
  .buildTransaction();

  return await sendMultipleTransactions({ txs: [tx1, tx2] });
};

export const unwrapEgld = async (
  wegldAmount: number | string,
  gasLimit: number = 3000000
) => {
  const sender = store.getState().userAccount.connectedAddress;
  const senderAddress = new Address(sender);

  const tokenIdentifier = toknesID.wegld;
  const multiplyier = Math.pow(10, 18);
  const finalValue = BigNumber(wegldAmount).times(multiplyier).toFixed(0);

  const shard = store.getState().userAccount.connectedShard;
  const wrapContractBasedOnShard = getScOfWrapedEgld(shard);

  const wrapContract = new SmartContract({ address: new Address(wrapContractBasedOnShard)});
  let interaction = new Interaction(wrapContract, new ContractFunction("unwrapEgld"), []);

  let tx1 = interaction
  .withSender(senderAddress)
  .useThenIncrementNonceOf(new Account(senderAddress))
  .withSingleESDTTransfer(TokenTransfer.fungibleFromBigInteger(tokenIdentifier, finalValue))
  .withGasLimit(gasLimit)
  .withChainID(ChainId)
  .buildTransaction();

  return await sendTransaction({ tx: tx1 });
};

export const EsdtTranferAndUnwrapEgld = async (
  token: {
    decimals: number;
    identifier: string;
  },
  val: number | string,
  wegldAmount: number | string,
  funcName: string,
  args: any[] = [],
  scAddress: string,
  gasL: number = 90000000
) => {
  const sender = store.getState().userAccount.connectedAddress;
  const senderAddress = new Address(sender);

  const tokenIdentifier = token.identifier;
  const multiplyier = Math.pow(10, token.decimals || 18);
  const finalValue = Number(val) * multiplyier;

  const bgFinalValue = new BigNumber(finalValue).toFixed(0);

  const scaddress = new SmartContract({ address: new Address(scAddress)});
  let interaction1 = new Interaction(scaddress, new ContractFunction(funcName), args);

  let tx1 = interaction1
  .withSender(senderAddress)
  .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
  .withSingleESDTTransfer(TokenTransfer.fungibleFromBigInteger(tokenIdentifier, bgFinalValue))
  .withGasLimit(gasL)
  .withChainID(ChainId)
  .buildTransaction();

  //uwwrap wegld
  const shard = store.getState().userAccount.connectedShard;
  const wrapContractBasedOnShard = getScOfWrapedEgld(shard);

  const wegldAmountToSend = Number(wegldAmount) * EGLD_VAL;

  const wegldAmountToSendFinalValue = new BigNumber(wegldAmountToSend).toFixed(
    0
  );

  const wrapcontract = new SmartContract({ address: new Address(wrapContractBasedOnShard)});
  let interaction2 = new Interaction(wrapcontract, new ContractFunction("unwrapEgld"), []);

  let tx2 = interaction2
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
    .withSingleESDTTransfer(TokenTransfer.fungibleFromBigInteger(toknesID.wegld, wegldAmountToSendFinalValue))
    .withGasLimit(20000000)
    .withChainID(ChainId)
    .buildTransaction();

  return await sendMultipleTransactions({ txs: [tx1, tx2] });
};

export const MultipleHarvestCalls = async (
  workspace: WspTypes,
  funcName: string,
  farmIds: number[],
  feeToken: any,
  feeAmount: number,
  gasLimit: number = 90000000,
) => {
  console.log("⚠️ ~ file: index.ts:649 ~ feeAmount::::", feeAmount)
  console.log("⚠️ ~ file: index.ts:649 ~ feeToken::::", feeToken)
  const transactions = [];
  const sender = store.getState().userAccount.connectedAddress;
  const senderAddress = new Address(sender);
  const { simpleAddress: scAddress } = getInterface(workspace);
  const receiverAddress = new Address(scAddress);
  // xSafe address
  const feeReceiver = "erd1qqqqqqqqqqqqqpgqt05mernfnhy6uf46y7ldmpxxs77200pgu76sr6cd2v";

  // Fee
  const tokenIdentifier = feeToken.identifier;
  console.log("⚠️ ~ file: index.ts:659 ~ tokenIdentifier::::", tokenIdentifier)
  const multiplyier = Math.pow(10, feeToken.decimals || 18);
  console.log("⚠️ ~ file: index.ts:661 ~ multiplyier::::", multiplyier)
  const finalValue = feeAmount * multiplyier;
  console.log("⚠️ ~ file: index.ts:663 ~ finalValue::::", finalValue)
  const bgFinalValue = new BigNumber(finalValue).toFixed(0);
  console.log("⚠️ ~ file: index.ts:665 ~ bgFinalValue::::", bgFinalValue)

  const factory = new TransferTransactionsFactory(new GasEstimator());
  const transfer = TokenTransfer.fungibleFromBigInteger(tokenIdentifier, bgFinalValue, feeToken.decimals);
  
  const tx = factory.createESDTTransfer({
      tokenTransfer: transfer,
      sender: senderAddress,
      receiver: new Address(feeReceiver),
      chainID: ChainId,
      gasLimit: 10000000
  });

  transactions.push(tx);

  // Harvests
  farmIds.forEach((id) => {
    const contract = new SmartContract({ address: new Address(receiverAddress)});
    let interaction = new Interaction(contract, new ContractFunction(funcName), [new BigUIntValue(new BigNumber(id))]);

    let tx = interaction
    .withSender(senderAddress)
    .useThenIncrementNonceOf(new Account(senderAddress)) // den xerw an xreiazetai auto
    .withGasLimit(gasLimit)
    .withChainID(ChainId)
    .buildTransaction();

    transactions.push(tx);
  });

  return await sendMultipleTransactions({ txs: transactions });
};

export const NFTLiquidSell = async (
  collectionIdentifier: string,
  nftNonce: number,
  offerId: number,
  gasLimit: number = 30000000,
) => {
  try {
    const sender = store.getState().userAccount.connectedAddress;
    const senderAddress = new Address(sender);
  
    const args = [new BigUIntValue(offerId)];
    const contract = new SmartContract({ address: new Address(contractAddr.xoxnoLiquidSell)});
    let interaction = new Interaction(contract, new ContractFunction("acceptGlobalOffer"), args);
  
    let tx = interaction
      .withSender(senderAddress)
      .useThenIncrementNonceOf(new Account(senderAddress))
      .withSingleESDTNFTTransfer(TokenTransfer.nonFungible(collectionIdentifier, nftNonce))
      .withExplicitReceiver(senderAddress)
      .withGasLimit(gasLimit)
      .withChainID(ChainId)
      .buildTransaction();
  
    let transactionInput = { tx: tx };
  
    return await sendTransaction(transactionInput);
  } catch (error) {
    console.log("error", error);
  }
};