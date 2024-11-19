import { contractAddr, network } from "../net.config";
import { Address } from "@multiversx/sdk-core/out";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
import { ProxyNetworkProvider } from "@multiversx/sdk-core/out";
import dcaAbi from "assets/abi/dca.abi.json";
import esdtrewardsAbi from "assets/abi/esdtrewards.abi.json";
import farmsAbi from "assets/abi/farms.abi.json";
import hypefaucetAbi from "assets/abi/hypefaucet.abi.json";
import nftHubAbi from "assets/abi/nfthub.abi.json";
import qxTagsAbi from "assets/abi/qxtags.abi.json";
import rewardsAbi from "assets/abi/rewards.abi.json";
import sftsRewardsAbi from "assets/abi/sft-rewards-sc.abi.json";
import smartSwapAbi from "assets/abi/smartswaps.abi.json";
import xoxnoSrbPoolAbi from "assets/abi/xoxno_srb_pool_info.json";
import hootAbi from "assets/abi/hoot.abi.json";
import ashswapAbi from "assets/abi/ashswap.abi.json";

//end abos import

/* Queries */
export const provider = new ProxyNetworkProvider(network.apiAddress, {
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
  tx,
  processingMessage = null,
  errorMessage = null,
  successMessage = null,
  transactionDuration = null,
}: {
  tx: any;
  processingMessage?: string;
  errorMessage?: string;
  successMessage?: string;
  transactionDuration?: number;
}) => {

  const res = await sendTransactions({
    transactions: [tx],
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
  | "faucet"
  | "rps"
  | "rpsRewards"
  | "dca"
  | "egldLkmexSwap"
  | "sftsRewards"
  | "farms2"
  | "smartSwap"
  | "wrapEgld"
  | "wrapEgldShard1"
  | "wrapEgldShard2"
  | "xoxnoSrbPoolsInfoWsp"
  | "hubWsp"
  | "cyberWegld"
  | "hypezoneWsp"
  | "tagsWsp"
  | "hootWsp"
  | "ashswapWsp";

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
    case farms2Wsp:
      simpleAddress = contractAddr.farms2;
      address = new Address(simpleAddress);
      abiUrl = farmsAbi;
      implementsInterfaces = "Farms";
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
    case "hypezoneWsp":
      simpleAddress = contractAddr.hypeFaucet;
      address = new Address(simpleAddress);
      abiUrl = hypefaucetAbi;
      implementsInterfaces = "HypeFaucet";
      break;
    case "tagsWsp":
      simpleAddress = contractAddr.qxtags;
      address = new Address(simpleAddress);
      abiUrl = qxTagsAbi;
      implementsInterfaces = "QxTags";
      break;
    case "hootWsp":
      simpleAddress = contractAddr.hoot;
      address = new Address(simpleAddress);
      abiUrl = hootAbi;
      implementsInterfaces = "Hoot";
      break;
    case "ashswapWsp":
      simpleAddress = contractAddr.ashswap;
      address = new Address(simpleAddress);
      abiUrl = ashswapAbi;
      implementsInterfaces = "AshSwap";
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
export const fastp2pSwapWsp = "fastp2pSwap";
export const jexSwapWsp = "jexSwap";
export const jexWsp = "jex";
export const farms2Wsp = "farms2";
export const smartSwapWsp = "smartSwap";
export const wrapEgldpWsp = "wrapEgld";
export const wrapEgldpWspShard1 = "wrapEgldShard1";
export const wrapEgldpWspShard2 = "wrapEgldShard2";
export const hub = "hubWsp";
export const ashswapWsp = "ashswapWsp";