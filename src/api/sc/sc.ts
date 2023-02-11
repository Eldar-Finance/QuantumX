import { ChainId, contractAddr, network } from "../net.config";

import {
  refreshAccount,
  sendTransactions,
  transactionServices,
} from "@elrondnetwork/dapp-core";
import { ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers/out";
import { Address, Transaction } from "@elrondnetwork/erdjs/out";
import store from "redux/store";

//abis import
import dcaAbi from "assets/abi/dca.abi.json";
import esdtrewardsAbi from "assets/abi/esdtrewards.abi.json";
import farmsAbi from "assets/abi/farms.abi.json";
import fastSwapAbi from "assets/abi/fastp2pswap.abi.json";
import jexAbi from "assets/abi/jex.abi.json";
import jexSwapAbi from "assets/abi/jex_swap.abi.json";
import nftHubAbi from "assets/abi/nfthub.abi.json";
import proteoEliteAbi from "assets/abi/proteo_elite.abi.json";
import proteoEliteFakeAbi from "assets/abi/proteo_elite_fake.abi.json";
import rewardsAbi from "assets/abi/rewards.abi.json";
import sftsRewardsAbi from "assets/abi/sft-rewards-sc.abi.json";
import smartSwapAbi from "assets/abi/smartswaps.abi.json";
import xoxnoSrbPoolAbi from "assets/abi/xoxno_srb_pool_info.json";
//end abos import

/* Queries */
export const provider = new ProxyNetworkProvider(network.gatewayAddress, {
  timeout: 30000,
});

export const abiPath = "/api";

/* Messages */
const defaultProcessingMessage = "Processing transaction";
const defaultPerrorMessage = "An error has occured";
const defaultSuccessMessage = "Transaction successful";
const defaulttransactionDuration = 1000 * 60 * 2;

export const EGLD_VAL = 1000000000000000000;

/* Calls */
export const sendTransaction = async ({
  addr,
  payload,
  processingMessage,
  errorMessage,
  successMessage,
  transactionDuration,
  value,
  gasL,
}) => {
  const sender = store.getState().userAccount.connectedAddress;
  const receiverAddress = new Address(addr);
  const senderAddress = new Address(sender);

  const tx = new Transaction({
    sender: senderAddress,
    value: value || 0,
    receiver: receiverAddress,
    data: payload,
    gasLimit: gasL || 60000000,
    chainID: ChainId,
  });

  await refreshAccount();

  const res = await sendTransactions({
    transactions: tx,
    transactionsDisplayInfo: {
      processingMessage: processingMessage || defaultProcessingMessage,
      errorMessage: errorMessage || defaultPerrorMessage,
      successMessage: successMessage || defaultSuccessMessage,
      transactionDuration: transactionDuration || 60000,
    },
  });

  return res;
};
export const sendMultipleTransactions = async ({
  txs,
  processingMessage,
  errorMessage,
  successMessage,
  transactionDuration,
}: {
  txs: any;
  processingMessage?: string;
  errorMessage?: string;
  successMessage?: string;
  transactionDuration?: number;
}) => {
  await refreshAccount();

  const { sendTransactions } = transactionServices;

  const res = await sendTransactions({
    transactions: txs,
    transactionsDisplayInfo: {
      processingMessage: processingMessage || defaultProcessingMessage,
      errorMessage: errorMessage || defaultPerrorMessage,
      successMessage: successMessage || defaultSuccessMessage,
      transactionDuration: transactionDuration || defaulttransactionDuration,
    },
  });

  return res;
};

export type WspTypes =
  | "refeldars"
  | "rewards"
  | "crowdfunding"
  | "lottery"
  | "test"
  | "lkmerge"
  | "faucet"
  | "rps"
  | "rpsRewards"
  | "dca"
  | "egldLkmexSwap"
  | "sftsRewards"
  | "mundialBet"
  | "bettings"
  | "proteoElite"
  | "fastp2pSwap"
  | "jexSwap"
  | "jex"
  | "farms2"
  | "usdcProteo"
  | "proteoEgldNonElite"
  | "zpayEgldEliteDual"
  | "egldProteo"
  | "kroUsdcEliteDual"
  | "zpayEgldNonEliteDual"
  | "kroUsdcNonEliteDual"
  | "proteoEgldElite"
  | "rideFarmWsp"
  | "aeroWegld"
  | "smartSwap"
  | "wrapEgld"
  | "wrapEgldShard1"
  | "wrapEgldShard2"
  | "xoxnoSrbPoolsInfoWsp"
  | "hubWsp"
  | "cyberWegld";

export const getInterface = (workspace: WspTypes) => {
  let address = null;
  let abiUrl: any = null;
  let implementsInterfaces = "";
  let simpleAddress = "";

  switch (workspace) {
    case rewardsWsp:
      simpleAddress = contractAddr.rewards;
      address = new Address(simpleAddress);
      abiUrl = rewardsAbi;
      implementsInterfaces = "Rewards";
      break;

    case rpsRewardsWsp:
      simpleAddress = contractAddr.rpsRewards;
      address = new Address(simpleAddress);
      abiUrl = esdtrewardsAbi;
      implementsInterfaces = "Esdtrewards";
      break;
    case dcaWsp:
      simpleAddress = contractAddr.dca;
      address = new Address(simpleAddress);
      abiUrl = dcaAbi;
      implementsInterfaces = "Dca";

      break;

    case sftsRewardsWsp:
      simpleAddress = contractAddr.sftsRewards;
      address = new Address(simpleAddress);
      abiUrl = sftsRewardsAbi;
      implementsInterfaces = "SftRewards";

      break;

    case proteoEliteWsp:
      simpleAddress = contractAddr.proteoElite;
      address = new Address(simpleAddress);
      abiUrl = proteoEliteAbi;
      implementsInterfaces = "ProteoElite";

      break;
    case jexSwapWsp:
      simpleAddress = contractAddr.jexSawp;
      address = new Address(simpleAddress);
      abiUrl = jexSwapAbi;
      implementsInterfaces = "Jex";

      break;
    case farms2Wsp:
      simpleAddress = contractAddr.farms2;
      address = new Address(simpleAddress);
      abiUrl = farmsAbi;
      implementsInterfaces = "Farms";
      break;
    // proteo farms
    case usdcProteoWsp:
      simpleAddress = contractAddr.usdcProteo;
      address = new Address(simpleAddress);
      abiUrl = proteoEliteFakeAbi;
      implementsInterfaces = "ProteoEliteFake";
      break;
    case proteoEgldNonEliteWsp:
      simpleAddress = contractAddr.proteoEgldNonElite;
      address = new Address(simpleAddress);
      abiUrl = proteoEliteFakeAbi;
      implementsInterfaces = "ProteoEliteFake";
      break;
    case zpayEgldEliteDualWsp:
      simpleAddress = contractAddr.zpayEgldEliteDual;
      address = new Address(simpleAddress);
      abiUrl = proteoEliteFakeAbi;
      implementsInterfaces = "ProteoEliteFake";
      break;
    case egldProteoWsp:
      simpleAddress = contractAddr.egldProteo;
      address = new Address(simpleAddress);
      abiUrl = proteoEliteFakeAbi;
      implementsInterfaces = "ProteoEliteFake";
      break;
    case kroUsdcEliteDualWsp:
      simpleAddress = contractAddr.kroUsdcEliteDual;
      address = new Address(simpleAddress);
      abiUrl = proteoEliteFakeAbi;
      implementsInterfaces = "ProteoEliteFake";
      break;
    case zpayEgldNonEliteDualWsp:
      simpleAddress = contractAddr.zpayEgldNonEliteDual;
      address = new Address(simpleAddress);
      abiUrl = proteoEliteFakeAbi;
      implementsInterfaces = "ProteoEliteFake";
      break;
    case kroUsdcNonEliteDualWsp:
      simpleAddress = contractAddr.kroUsdcNonEliteDual;
      address = new Address(simpleAddress);
      abiUrl = proteoEliteFakeAbi;
      implementsInterfaces = "ProteoEliteFake";
      break;
    case proteoEgldEliteWsp:
      simpleAddress = contractAddr.proteoEgldElite;
      address = new Address(simpleAddress);
      abiUrl = proteoEliteFakeAbi;
      implementsInterfaces = "ProteoEliteFake";
      break;
    case egldRideWsp:
      simpleAddress = contractAddr.egldRide;
      address = new Address(simpleAddress);
      abiUrl = proteoEliteFakeAbi;
      implementsInterfaces = "ProteoEliteFake";
      break;
    case aeroWegldWsp:
      simpleAddress = contractAddr.aeroEgldEliteDual;
      address = new Address(simpleAddress);
      abiUrl = proteoEliteFakeAbi;
      implementsInterfaces = "ProteoEliteFake";
      break;
    case cyberWegldWsp:
      simpleAddress = contractAddr.cyberWegkdElite;
      address = new Address(simpleAddress);
      abiUrl = proteoEliteFakeAbi;
      implementsInterfaces = "ProteoEliteFake";
      break;
    case fastp2pSwapWsp:
      simpleAddress = contractAddr.fastp2pswap;
      address = new Address(simpleAddress);
      abiUrl = fastSwapAbi;
      implementsInterfaces = "FastP2PSwap";
      break;

    case jexWsp:
      simpleAddress = contractAddr.jexSawp;
      address = new Address(simpleAddress);
      abiUrl = jexAbi;
      implementsInterfaces = "Jex";
      break;
    case smartSwapWsp:
      simpleAddress = contractAddr.smartSwap;
      address = new Address(simpleAddress);
      abiUrl = smartSwapAbi;
      implementsInterfaces = "SmartSwaps";
      break;
    case wrapEgldpWsp:
      simpleAddress = contractAddr.wrapEgld;
      address = new Address(simpleAddress);
      abiUrl = abiPath + "";
      implementsInterfaces = "";
      break;
    case wrapEgldpWspShard1:
      simpleAddress = contractAddr.wrapEgldShar1;
      address = new Address(simpleAddress);
      abiUrl = abiPath + "";
      implementsInterfaces = "";
      break;
    case wrapEgldpWspShard2:
      simpleAddress = contractAddr.wrapEgldShar2;
      address = new Address(simpleAddress);
      abiUrl = abiPath + "";
      implementsInterfaces = "";
      break;
    case hub:
      simpleAddress = contractAddr.hub;
      address = new Address(simpleAddress);
      abiUrl = nftHubAbi;
      implementsInterfaces = "NftHub";
      break;
    case "xoxnoSrbPoolsInfoWsp":
      simpleAddress = contractAddr.xoxnoSrbPool;
      address = new Address(simpleAddress);
      abiUrl = xoxnoSrbPoolAbi;
      implementsInterfaces = "XoxnoSrbPool";
      break;

    default:
      break;
  }

  return { address, abiUrl, implementsInterfaces, simpleAddress };
};

export const refeldarWsp = "refeldars";
export const rewardsWsp = "rewards";
export const crowdfundingWsp = "crowdfunding";
export const lotteryWsp = "lottery";
export const testWsp = "test";
export const lkmergeWsp = "lkmerge";
export const faucetWsp = "faucet";
export const rpsWsp = "rps";
export const rpsRewardsWsp = "rpsRewards";
export const dcaWsp = "dca";
export const egldLkmexSwapWsp = "egldLkmexSwap";
export const sftsRewardsWsp = "sftsRewards";
export const mundialBetWsp = "mundialBet";
export const bettingsWsp = "bettings";
export const proteoEliteWsp = "proteoElite";
export const fastp2pSwapWsp = "fastp2pSwap";
export const jexSwapWsp = "jexSwap";
export const jexWsp = "jex";
export const farms2Wsp = "farms2";
export const smartSwapWsp = "smartSwap";
export const wrapEgldpWsp = "wrapEgld";
export const wrapEgldpWspShard1 = "wrapEgldShard1";
export const wrapEgldpWspShard2 = "wrapEgldShard2";
export const hub = "hubWsp";

// proteo farms
export const usdcProteoWsp = "usdcProteo";
export const proteoEgldNonEliteWsp = "proteoEgldNonElite";
export const zpayEgldEliteDualWsp = "zpayEgldEliteDual";
export const egldProteoWsp = "egldProteo";
export const kroUsdcEliteDualWsp = "kroUsdcEliteDual";
export const zpayEgldNonEliteDualWsp = "zpayEgldNonEliteDual";
export const kroUsdcNonEliteDualWsp = "kroUsdcNonEliteDual";
export const proteoEgldEliteWsp = "proteoEgldElite";
export const egldRideWsp = "rideFarmWsp";
export const aeroWegldWsp = "aeroWegld";
export const cyberWegldWsp = "cyberWegld";
