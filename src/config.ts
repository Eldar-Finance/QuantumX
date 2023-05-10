export const targetToken = "MEX-455c57";

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
  crowfunding: "erd1qqqqqqqqqqqqqpgqjtjrxp777hlz5mkvexds3qtlfgq3u7veu76s2lr29e",
  referrals: "erd1qqqqqqqqqqqqqpgq4yxnxpjayp636nyxurmnv8pyh2fed3pl24us97ucq6",
  rewards: "erd1qqqqqqqqqqqqqpgq54kvjj29wrs9yxdlscjyksgxwcv5dehs24usfaphcx",
  tokens: "erd1qqqqqqqqqqqqqpgqhyyckv3lvrpxajdrqjy7cfm5rl0ee6y424ussu27qd",
  lottery: "erd1qqqqqqqqqqqqqpgqk803ddfl776m0pnfvg7clsyyvu99u3u024usch57st",
  rps: "erd1qqqqqqqqqqqqqpgqdwlc2c6v3ptwznkxt38tyx49fcemtq8k24usq23sud",
  rpsRewards: "erd1qqqqqqqqqqqqqpgqk2thtr3jrn22eja7xsc7j0pxz8ej9ftn24us7gy5jx",
  dca: "erd1qqqqqqqqqqqqqpgqegfhz92twxeafkdutwck78098lwa6xu024usqhmr67",
  exchange: "erd1qqqqqqqqqqqqqpgqmua7hcd05yxypyj7sv7pffrquy9gf86s535qxct34s",
  egldLkmexSwap:
    "erd1qqqqqqqqqqqqqpgqazxylsxny9vgw9xw9t3xkk79ljvgs6dk97wsn5760y",
  sftsRewards: "erd1qqqqqqqqqqqqqpgqldzu3c9aczuyk2kzjn9aalfm9tkjeyml64qszqhpek",
  mundialBet: "erd1qqqqqqqqqqqqqpgqk37hdv00knvvl9q62ejx9h5ah8kl53rz64qs6jw4u3",
  bettings: "erd1qqqqqqqqqqqqqpgqlurcw7hy586qrwutvqz5g6fhfqhjms7x64qstjk25q",
  proteoElite: "erd1qqqqqqqqqqqqqpgq2ntt20af2emxtyy9g7uzsusr3zf5zknn64qsxjqggw",
  jexSawp: "erd1qqqqqqqqqqqqqpgqawkm2tlyyz6vtg02fcr5w02dyejp8yrw0y8qlucnj2",
  wrapEgld: "erd1qqqqqqqqqqqqqpgqvc7gdl0p4s97guh498wgz75k8sav6sjfjlwqh679jy",
  wrapEgldShar1:
    "erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3",
  wrapEgldShar2:
    "erd1qqqqqqqqqqqqqpgqmuk0q2saj0mgutxm4teywre6dl8wqf58xamqdrukln",
  fastp2pswap: "erd1qqqqqqqqqqqqqpgq3gz6kc7q5zm2zdluhtcn8g0fg8vwyxvk64qsu8p6ja",
  farms2: "erd1qqqqqqqqqqqqqpgql6dxenaameqn2uyyru3nmmpf7e95zmlxu7zskzpdcw",
  smartSwap: "erd1qqqqqqqqqqqqqpgqlhan0n8ny7ajlufn8l2zc6zlu8k44u6hu7zsdvzy24",
  hub: "erd1qqqqqqqqqqqqqpgqd56kc3pgra3epm7h78czzkm0zlal3agcu7zsjcps8c",
  upgradeHero: "erd1qqqqqqqqqqqqqpgqfr69nye37kwcjlxqv652k555jyw0uaegu7zs5rlw9f",
  xoxnoSrbPool:
    "erd1qqqqqqqqqqqqqpgqvpkd3g3uwludduv3797j54qt6c888wa59w2shntt6z",
  hypeFaucet: "erd1qqqqqqqqqqqqqpgq2srxelqexsxkg82rr8ygwsq684faa2syu7zs4qa7tx",
  qxtags: "erd1qqqqqqqqqqqqqpgqs8zrk6uq5z6r5lm07cvmtuw2hxm4d8uru7zszqp8vx",
  // proteo farms
  usdcProteo: "erd1qqqqqqqqqqqqqpgq3lh80a92d49am3t2pfzheapdxtykzt5kznyqsjhfrx",
  proteoEgldNonElite:
    "erd1qqqqqqqqqqqqqpgq86drapw9lr2y7vnzwcktc3hvlrev6dugznyqvc6flj",
  zpayEgldEliteDual:
    "erd1qqqqqqqqqqqqqpgqpn4fnee2mwkqea6x65xdsgp2whfcl964znyqw67z9s",
  egldProteo: "erd1qqqqqqqqqqqqqpgqwqxfv48h9ssns5cc69yudvph297veqeeznyqr4l930",
  kroUsdcEliteDual:
    "erd1qqqqqqqqqqqqqpgqa6y0t72nglqdlqe7cv5cqjsam2ssm4w3znyqdrphza",
  zpayEgldNonEliteDual:
    "erd1qqqqqqqqqqqqqpgqrpa6ezy0q4xuj6y9plgv85va43x7wy3dznyqr2rwcz",
  kroUsdcNonEliteDual:
    "erd1qqqqqqqqqqqqqpgqu693lwsewjvs5f9mssk0fpfex00q77zfznyq4cd0rt",
  proteoEgldElite:
    "erd1qqqqqqqqqqqqqpgq6hzck3wac3ljmth7dkzk2wcw3c9lvcauznyq268sn6",
  aeroEgldEliteDual:
    "erd1qqqqqqqqqqqqqpgqnedra5da464rkcektgzyv0qxcgqgyh26znyq8q4phx",
  cyberWegkdElite:
    "erd1qqqqqqqqqqqqqpgqvvn3s8ndrxqu6ndgnvsfp4sx9wgtv9z2znyqrfyhsf",
};
export const gatewayAddress = "https://gateway.multiversx.com/";

export const walletConnectBridge = "https://bridge.walletconnect.org";

export const ENVIROMENT = "mainnet";

export const walletConnectDeepLink =
  "https://maiar.page.link/?apn=com.multiversx.maiar.wallet&isi=1519405832&ibi=com.multiversx.maiar.wallet&link=https://maiar.com/";

export const ChainID = "1";
export const network = {
  id: "mainnet",
  name: "Mainnet",
  egldLabel: "EGLD",
  walletAddress: "https://wallet.multiversx.com",
  apiAddress: "https://api.multiversx.com",
  gatewayAddress: "https://gateway.multiversx.com",
  explorerAddress: "http://explorer.multiversx.com",
  graphQlAddress: "https://exchange-graph.multiversx.com/graphql",
  apiTimeout: 10000,
};

export const GAS_LIMIT = 60000000;

export const eldarSftCollection = "ELBADGES-2efe5c";

export const allowAddress = [
  // "erd1ag6nvusjhcw90ntutyzsn7gntmgx9rv8xz2qczgquy48ltaxqghqxs0rkl",
  "erd1f52t8uu5hgervfcssm36s0624n0e94up6hxn4w96x984smfrc72qeenx90",
  "erd1s5ufsgtmzwtp6wrlwtmaqzs24t0p9evmp58p33xmukxwetl8u76sa2p9rv",
  "erd1qxeuynwwpgml8y5asqtye3tpm8pevy2l7spewtcxsv0w9zynxx3sau0nlp",
  "erd1yffpsnquq3hraf753g7ahwdngvsx5p2czqe4ttkjz2uzg0u7q20sez5pqe",
  "erd1dyp3wqz7gkhc4fhfshs7qmax8zjz6ygqgkfgexmxzg0vpugyevdqzd80kd",
  "erd13t7qspvcl669jw2jxcna9cw0855a6m8mdafr52ssyppkun0fx93qqju2ny",
  "erd1e3j0jze2wcl9ce4eys5f9wnfnseer3ejra5h66470m266u4a6f6q9cd2nz",
  "erd1dyp3wqz7gkhc4fhfshs7qmax8zjz6ygqgkfgexmxzg0vpugyevdqzd80kd",
  "erd1en90783mdh9kt928qfrt35e7lzqsu9h557j24p3lreu9alkc094qsy4z52",
  "erd1jz3hz44njq2cnveqd7r2m8x4p8m283lz3mj9h3am4747fddg9syspp8xd5",
];

export const TOKENS_ID = {
  mex: "MEX-455c57",
  lkmex: "LKMEX-aab910",
  sProteo: "SPROTEO-c2dffe",
  egld: "EGLD",
  usdc: "USDC-c76f1f",
  proteoEgldLp: "PROTEOEGLD-baf054",
  zpay: "ZPAY-247875",
  zpayWegldLp: "ZPAYWEGLD-34e5c1",
  aero: "AERO-458bbf",
  aerowegld: "AEROWEGLD-81cc37",
  proteo: "PROTEO-0c7311",
  crt: "CRT-52decf",
  koson: "KOSON-5dd4fa",
  wegld: "WEGLD-bd4d79",
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
  nfttoken: "NFT-e08b3e"
};

//general configs
export const walletConnectV2ProjectId = "bb4a880517d6fcc65cdb9cac0a238b4e";
export const apiTimeout = 6000;
export const TOOLS_API_URL = "https://tools.multiversx.com";
export const sampleAuthenticatedDomains = [TOOLS_API_URL];
