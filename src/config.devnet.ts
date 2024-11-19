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
  rewards: "erd1qqqqqqqqqqqqqpgqpw6gnjqk924ajn6xkn62ts8762q4nsrt094qr44kkz",
  tokens: "erd1qqqqqqqqqqqqqpgqvydesltpj9r60q8a3sg0waml8lckk4t9094qerjtq4",
  test: "erd1qqqqqqqqqqqqqpgqgf90gh0829zjhgy5wqzhkhr7mm93g0vz24usjz97e4",
  lottery: "erd1qqqqqqqqqqqqqpgqf8tch47ezfwpc50p3jcm6jqds5tpw20n24us2g4793",

  faucet: "erd1qqqqqqqqqqqqqpgqam4ypfqlhv8y2xqtd8r46h8kkmhlja7l24usdruc5y",
  rps: "erd1qqqqqqqqqqqqqpgqntetdqumf93lnykcmz7kz9gsh8kj8qrz24usrdys05",
  rpsRewards: "erd1qqqqqqqqqqqqqpgq5c3afwz5kq5kc5jxzqpsnvrj68hz9f8c24usns0985",
  dca: "erd1qqqqqqqqqqqqqpgqlhan0n8ny7ajlufn8l2zc6zlu8k44u6hu7zsdvzy24",
  sftsRewards: "erd1qqqqqqqqqqqqqpgqchw078y9zd8wjlrq4ujhltpvsmqfpzxx2ndsxyn8ac",
  mundialBet: "erd1qqqqqqqqqqqqqpgq3k2wt4wy37ewtxzas5ttrzmnl72j7myj64qsk3zrls",
  bettings: "erd1qqqqqqqqqqqqqpgqlfzlazg4uda3q4qks9xqpyvl6xtmwyf264qswnxd9f",
  proteoElite: "erd1qqqqqqqqqqqqqpgqt49p56vqpam9ftw28kvd26cqmy28u8ka64qsl3vrmz",
  wrapEgld: "erd1qqqqqqqqqqqqqpgq7ykazrzd905zvnlr88dpfw06677lxe9w0n4suz00uh",
  hub: "erd1qqqqqqqqqqqqqpgqq4ens8kf4knm8arzyfdut0akxf74pq5qu7zssh8q99",

  farms2: "erd1qqqqqqqqqqqqqpgq7tmqkpckffamvh8ssynjqanklvk6d478u7zsxmnsse",
  smartSwap: "erd1qqqqqqqqqqqqqpgqc44hejn5vy7kdxrlv7munsc24aed6n62u7zskdc6hq",
  hypeFaucet: "erd1qqqqqqqqqqqqqpgqprlm2q5veg4fcck3rct5uk63vctn6wu9u7zs40s2km",
  qxtags: "erd1qqqqqqqqqqqqqpgqu804n7jy238hsprqwgusf54zkwszgr5su7zs39rtnj",
  hoot: "erd1qqqqqqqqqqqqqpgqx7g9kcvps054ujmkvw8a7hpmtgu7kcyvu7zsr9hqkd",
  // proteo farms
  usdcProteo: "erd1qqqqqqqqqqqqqpgqtnupupgumhzaw7yyg80z5agy6hp8ratlznyqrvhhf0",
  proteoEgldNonElite:
    "erd1qqqqqqqqqqqqqpgq86drapw9lr2y7vnzwcktc3hvlrev6dugznyqvc6flj",
  zpayEgldEliteDual:
    "erd1qqqqqqqqqqqqqpgqpn4fnee2mwkqea6x65xdsgp2whfcl964znyqw67z9s",
  egldProteo: "erd1qqqqqqqqqqqqqpgqhe7j4rvnv4kksuxqya3hy3d9dhj3s89xznyqveauma",
  kroUsdcEliteDual:
    "erd1qqqqqqqqqqqqqpgqa6y0t72nglqdlqe7cv5cqjsam2ssm4w3znyqdrphza",
  zpayEgldNonEliteDual:
    "erd1qqqqqqqqqqqqqpgqrpa6ezy0q4xuj6y9plgv85va43x7wy3dznyqr2rwcz",
  kroUsdcNonEliteDual:
    "erd1qqqqqqqqqqqqqpgqu693lwsewjvs5f9mssk0fpfex00q77zfznyq4cd0rt",
  proteoEgldElite:
    "erd1qqqqqqqqqqqqqpgqg8mf09tewy8r0etq7l4sut4flvkv7rpdznyqsda52l",
  exchange: "erd1qqqqqqqqqqqqqpgqmua7hcd05yxypyj7sv7pffrquy9gf86s535qxct34s",
  egldLkmexSwap:
    "erd1qqqqqqqqqqqqqpgqazxylsxny9vgw9xw9t3xkk79ljvgs6dk97wsn5760y",
  jexSawp: "erd1qqqqqqqqqqqqqpgqawkm2tlyyz6vtg02fcr5w02dyejp8yrw0y8qlucnj2",
  wrapEgldShar0:
    "erd1qqqqqqqqqqqqqpgqqkwzsxkjc83vlfex9dmznwm7tjvxlqqkpauqx0n782",
  wrapEgldShar1:
    "erd1qqqqqqqqqqqqqpgqpv09kfzry5y4sj05udcngesat07umyj70n4sa2c0rp",
  wrapEgldShar2:
    "erd1qqqqqqqqqqqqqpgqvn9ew0wwn7a3pk053ezex98497hd4exqdg0q8v2e0c",
  fastp2pswap: "erd1qqqqqqqqqqqqqpgq3gz6kc7q5zm2zdluhtcn8g0fg8vwyxvk64qsu8p6ja",
  upgradeHero: "erd1qqqqqqqqqqqqqpgqfr69nye37kwcjlxqv652k555jyw0uaegu7zs5rlw9f",
  xoxnoSrbPool:
    "erd1qqqqqqqqqqqqqpgqvpkd3g3uwludduv3797j54qt6c888wa59w2shntt6z",
  // proteo farms
  aeroEgldEliteDual:
    "erd1qqqqqqqqqqqqqpgqnedra5da464rkcektgzyv0qxcgqgyh26znyq8q4phx",
  cyberWegkdElite:
    "erd1qqqqqqqqqqqqqpgqvvn3s8ndrxqu6ndgnvsfp4sx9wgtv9z2znyqrfyhsf",
  // others farms
  egldRide: "erd1qqqqqqqqqqqqqpgqvfnfcgycfd53ch57hxgzxe8p203uu5e8znyqeqvyc7",
  ashswap: "erd1qqqqqqqqqqqqqpgqv2njkmqxlu0ac77lyjxhjyqutrw2zt9tu7zs3aasnt"
};

export const eldarSftCollection = "TESTSFT-76f5c3";
/* Referral */
// export const contractAddress =
//   "erd1qqqqqqqqqqqqqpgq39le5awe7c7hu6773pnaulhns98ke3qf094q09cgu5";

export const gatewayAddress = "https://devnet-gateway.multiversx.com/";
export const ENVIROMENT = "devnet";

export const walletConnectBridge = "https://bridge.walletconnect.org";

export const walletConnectDeepLink =
  "https://maiar.page.link/?apn=com.multiversx.maiar.wallet&isi=1519405832&ibi=com.multiversx.maiar.wallet&link=https://maiar.com/";

export const ChainID = "D";

export const network = {
  id: "devnet",
  name: "Devnet",
  egldLabel: "xEGLD",
  walletAddress: "https://devnet-wallet.multiversx.com",
  apiAddress: "https://devnet-api.multiversx.com",
  gatewayAddress: "https://devnet-gateway.multiversx.com",
  explorerAddress: "http://devnet-explorer.multiversx.com",
  graphQlAddress: "https://devnet-exchange-graph.multiversx.com/graphql",
  apiTimeout: 10000,
};

export const GAS_LIMIT = 60000000;

export const TOKENS_ID = {
  lkmex: "LKMEX-3b7d9a",
  sProteo: "SPROTEO-c75f56",
  egld: "EGLD",
  usdc: "USDC-350c4e",
  proteoEgldLp: "PROTEOEGLD-8b31a0",
  ride: "RIDE-6e4c49",
  egldRideLp: " EGLDRIDE-3263c5",
  wegld: "WEGLD-a28c59",
  mex: "MEX-a659d0",
  zpay: "ZPAY-247875",
  zpayWegldLp: "ZPAYWEGLD-34e5c1",
  aero: "AERO-458bbf",
  aerowegld: "AEROWEGLD-81cc37",
  proteo: "PROTEO-0c7311",
  crt: "CRT-52decf",
  koson: "KOSON-5dd4fa",
  rare: "RARE-99e8b0",
  rareUsdcLp: "RAREUSDC-e4a7f8",
  prick: "PRICK-744592",
  bear: "BEAR-f9c271",
  kro: "KRO-df97ec",
  estar: "ESTAR-461bab",
  jex: "JEX-9040ca",
  epunks: "EPUNKS-dc0f59",
  cyberwegld: "CYBERWEGLD-45a866",
  cyber: "CYBER-489c1c",
  bonez: "BONEZ-ff9a73",
  hype: "HYPE-619661",
  usdt: "USDT-f8c08c",
  busd: "BUSD-40b57e",
  hypeusdc: "HYPEUSDC-3164e5",
  nfttoken: "NFT-e08b3e",
  wbtc: "WBTC-5349b3",
  weth: "WETH-b4ca29",
  htm: "HTM-f51d55",
  ash: "ASH-e3d1b7"
};

export const swapTopTokens = [ TOKENS_ID.egld, TOKENS_ID.wegld, TOKENS_ID.usdc,
TOKENS_ID.mex, TOKENS_ID.ash ];

export const metamaskSnapWalletAddress =
  'https://devnet-snap-wallet.multiversx.com';
