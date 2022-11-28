export const targetToken = "MEX-ab262a";

// (!) Months are 0-indexed
const startArr = [14, 1, 2022];
const endArr = [14, 2, 2022];
export const fundingPeriod = "14/02/2022 - 14/03/2022";
export const minFundingAmount = 500000;

export const twitterLink = "https://twitter.com/eldar_finance";
export const telegramLink = "https://t.me/eldarfinance";
export const contactEmail = "team@eldar.finance";

export const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
export const startDate = new Date(startArr[2], startArr[1], startArr[0]);
export const endDate = new Date(endArr[2], endArr[1], endArr[0]);

export const contractAddress = {
  crowfunding: "erd1qqqqqqqqqqqqqpgqakf0z49gs2z6d54sfvfufpkjlredm4d2094qqlv5pj",
  referrals: "erd1qqqqqqqqqqqqqpgqrm8g5auhd4hnyqmxc7xng7dcjscw427024usjcdvxd",
  rewards: "erd1qqqqqqqqqqqqqpgqnyeqaqtpxdfuegpv9vkem5pnu942m0hk24usqy2fd4",
  tokens: "erd1qqqqqqqqqqqqqpgqcwdlt4fel8achcs35gse6jp2s5al2ce024us59425s",
  lottery: "erd1qqqqqqqqqqqqqpgqf8tch47ezfwpc50p3jcm6jqds5tpw20n24us2g4793",
  test: "erd1qqqqqqqqqqqqqpgqgf90gh0829zjhgy5wqzhkhr7mm93g0vz24usjz97e4",
  faucet: "erd1qqqqqqqqqqqqqpgqam4ypfqlhv8y2xqtd8r46h8kkmhlja7l24usdruc5y",
  rps: "erd1qqqqqqqqqqqqqpgqntetdqumf93lnykcmz7kz9gsh8kj8qrz24usrdys05",
  rpsRewards: "erd1qqqqqqqqqqqqqpgq5c3afwz5kq5kc5jxzqpsnvrj68hz9f8c24usns0985",
};

/* Referral */
// export const contractAddress =
//   "erd1qqqqqqqqqqqqqpgq39le5awe7c7hu6773pnaulhns98ke3qf094q09cgu5";

export const gatewayAddress = "https://testnet-gateway.elrond.com/";
export const ENVIROMENT = "testnet";

export const walletConnectBridge = "https://bridge.walletconnect.org";

export const walletConnectDeepLink =
  "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/";

export const ChainID = "T";
export const network = {
  id: "testnet",
  name: "Testnet",
  egldLabel: "xEGLD",
  walletAddress: "https://testnet-wallet.elrond.com",
  apiAddress: "https://testnet-api.elrond.com",
  gatewayAddress: "https://testnet-gateway.elrond.com",
  explorerAddress: "http://testnet-explorer.elrond.com",
  graphQlAddress: "https://testnet-exchange-graph.elrond.com/graphql",
  apiTimeout: 10000,
};

export const GAS_LIMIT = 60000000;

export const TOKENS_ID = {
  lkmex: "LKMEX-f4d898",
};
