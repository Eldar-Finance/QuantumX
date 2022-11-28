import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEgldBalance,
  getMexPairs,
  getNfts,
  getTokens,
} from "api/rest/elrondApi/accounts";
import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import {
  getEldarTransactions,
  getTransactionsToEldar,
} from "api/rest/elrondApi/transactions";
import { getEgldByLkmex } from "api/sc/queries/tokens";

import { Address, AddressValue } from "@elrondnetwork/erdjs/out";
import { scQuery } from "api/sc/queries";

import {
  executeFetch,
  waitToResetStatus,
} from "utils/functions/chacheReduxState";
import { getRealBalance } from "utils/functions/formatBalance";
import {
  reducerName,
  resetAllTokens,
  resetEgldBalance,
  resetEldarNfts,
  resetEldarTransactions,
  resetfetchListedTokens,
  resetFetchMexPairs,
  resetTableDataStatus,
  resetTransactionsToEldar,
} from "./account-slice";

export const fetchTokens = createAsyncThunk(
  "userAccount/fetchTokens",
  async (address: string) => {
    const response = await getTokens(address);
    waitToResetStatus(resetTableDataStatus);
    return response.data;
  }
);
export const fetchListedTokens = createAsyncThunk(
  "userAccount/fetchListedTokens",
  async () => {
    const response = await getFromAllTokens({});
    waitToResetStatus(resetfetchListedTokens);

    return response.data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "allListedTokens"),
  }
);
export const fetchUserAllTokens = createAsyncThunk(
  "userAccount/fetchUserAllTokens",
  async (address: string) => {
    const response = await getTokens(address);
    waitToResetStatus(resetAllTokens);
    return response.data;
  },
  {
    condition: (arg1, api) => executeFetch(arg1, api, reducerName, "allTokens"),
  }
);
export const fetchMexPairs = createAsyncThunk(
  "userAccount/fetchMexPairs",
  async () => {
    const response = await getMexPairs();
    waitToResetStatus(resetFetchMexPairs);
    const data = response.data;
    data.push({
      id: "USDC-c76f1f",
      symbol: "USDC",
      name: "WrappedUSDC",
      baseId: "WrappedUSDC-510e42",
      basePrice: 1,
      baseSymbol: "WrappedUSDC",
      baseName: "WrappedUSDC",
      quoteSymbol: "WEGLD",
      quoteName: "WrappedEGLD",
    });
    return data;
  },
  {
    condition: (arg1, api) => executeFetch(arg1, api, reducerName, "mexPairs"),
  }
);
export const fetchEgld = createAsyncThunk(
  "userAccount/fetchEgld",
  async (address: string) => {
    const response = await getEgldBalance(address);
    waitToResetStatus(resetEgldBalance);

    return response.data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "egldBalance"),
  }
);
export const fetchNfts = createAsyncThunk(
  "userAccount/fetchNfts",
  async (address: string) => {
    const responseSize = 200;
    let response = await getNfts(address);
    if (response.data.length === responseSize) {
      response = await getNfts(address);
    }
    // waitToResetStatus(resetNfts);

    return response.data;
  }
  // {
  //   condition: (arg1, api) => executeFetch(arg1, api, reducerName, "nfts"),
  // }
);
export const fetcEldarTransactions = createAsyncThunk(
  "userAccount/fetcEldarTransactions",
  async (address) => {
    const response = await getEldarTransactions();
    waitToResetStatus(resetEldarTransactions);

    return { allTransactions: response.data, connectedAddres: address };
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "eldarTransactions"),
  }
);
export const fetcTransactionsToEldar = createAsyncThunk(
  "userAccount/fetcTransactionsToEldar",
  async (address) => {
    const response = await getTransactionsToEldar();
    waitToResetStatus(resetTransactionsToEldar);

    return { transactionsToEldar: response.data, connectedAddres: address };
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "transactionsToEldar"),
  }
);
export const fetchEldarNfts = createAsyncThunk(
  "userAccount/fetchEldarNfts",
  async () => {
    const response = await getNfts(
      "erd1d4y74h60k79nr7jpqkt3ktp7pr55wjwnxfn7dtadraq6hfjwrxks02l37k"
    );
    waitToResetStatus(resetEldarNfts);

    return response.data;
  },
  {
    condition: (arg1, api) => executeFetch(arg1, api, reducerName, "eldarNfts"),
  }
);
export const fetchEgldByLkmex = createAsyncThunk(
  "userAccount/fetchEgldByLkmex",
  async (lkmexAmount) => {
    const response = await getEgldByLkmex(lkmexAmount);
    // @ts-ignore
    const hexVal = Buffer.from(response.values[2], "base64").toString("hex");
    const decoded = parseInt(hexVal, 16);

    return getRealBalance(decoded);
  }
  // {
  //   condition: (arg1, api) =>
  //     executeFetch(arg1, api, reducerName, "egldByLkmex"),
  // }
);
// export const fetchLkmexLkmexFarms = createAsyncThunk(
//   "userAccount/fetchLkmexLkmexFarms",
//   async (nfts:{attributes:string}[]) => {
//     const nft = nfts.find((nft) => isCorrectLkmexFarm("MEXFARML", nft));
//     // const nft = nfts.find((nft) => nft.collection === "LKFARM-9d1ea8");
//     if (nft) {
//       const attr = nft.attributes;
//       const utf8Attr = Buffer.from(attr, "base64").toString("utf-8");
//       const attrArray = utf8Attr.substring(4).split("-");
//       const farmPart1 = attrArray[0];
//       const farmPart2 = attrArray[1].substring(0, 6);

//       const farmJoined = farmPart1 + "-" + farmPart2;
//       const hexAttr = Buffer.from(attr, "base64").toString("hex");

//       if (hexAttr) {
//         const keyMatched = getStrBetweenStrs(
//           hexAttr,
//           "0000000000",
//           "0000000",
//           6
//         );
//         const res = await getTokensByNfts(
//           "erd1qqqqqqqqqqqqqpgqrc4pg2xarca9z34njcxeur622qmfjp8w2jps89fxnl",
//           `${farmJoined}-${keyMatched}`
//         );
//         const data = res.data;
//         const earningsRes = await getUserFarmEarnings2(
//           data.balance,
//           data.attributes,
//           "erd1qqqqqqqqqqqqqpgq7qhsw8kffad85jtt79t9ym0a4ycvan9a2jps0zkpen"
//         );
//         const hexNumer = Buffer.from(earningsRes.values[0], "base64").toString(
//           "hex"
//         );
//         const num = parseInt(hexNumer, 16);
//         waitToResetStatus(resetfetchLkmexLkmexFarms);
//         return num;
//       }
//     }
//   },
//   {
//     condition: (arg1, api) =>
//       executeFetch(arg1, api, reducerName, "userFarms", "lkmexLkmex"),
//   }
// );
// export const fetchLkmexMexFarms = createAsyncThunk(
//   "userAccount/fetchLkmexMexFarms",
//   async (nfts) => {
//     const nft = nfts.find((nft) => isCorrectLkmexFarm("MEXFARM", nft));
//     // const nft = nfts.find((nft) => nft.collection === "LKFARM-9d1ea8");
//     if (nft) {
//       const attr = nft.attributes;
//       const utf8Attr = Buffer.from(attr, "base64").toString("utf-8");
//       const attrArray = utf8Attr.substring(4).split("-");
//       const farmPart1 = attrArray[0];
//       const farmPart2 = attrArray[1].substring(0, 6);

//       const farmJoined = farmPart1 + "-" + farmPart2;
//       const hexAttr = Buffer.from(attr, "base64").toString("hex");
//       if (hexAttr) {
//         const keyMatched = getStrBetweenStrs(
//           hexAttr,
//           "0000000000",
//           "0000000",
//           6
//         );
//         const res = await getTokensByNfts(
//           "erd1qqqqqqqqqqqqqpgqrc4pg2xarca9z34njcxeur622qmfjp8w2jps89fxnl",
//           `${farmJoined}-${keyMatched}`
//         );
//         const data = res.data;
//         const earningsRes = await getUserFarmEarnings2(
//           data.balance,
//           data.attributes,
//           "erd1qqqqqqqqqqqqqpgqe9v45fnpkv053fj0tk7wvnkred9pms892jps9lkqrn"
//         );
//         const hexNumer = Buffer.from(earningsRes.values[0], "base64").toString(
//           "hex"
//         );
//         const num = parseInt(hexNumer, 16);
//         waitToResetStatus(resetfetchLkmexMexFarms);

//         return num;
//       }
//     }
//   },
//   {
//     condition: (arg1, api) =>
//       executeFetch(arg1, api, reducerName, "userFarms", "lkmexMex"),
//   }
// );
// export const fetchMexMexFarms = createAsyncThunk(
//   "userAccount/fetchMexMexFarms",
//   async (nfts) => {
//     const nft = nfts.find((nft) => nft.collection === "MEXFARM-5d1dbb");
//     if (nft) {
//       const earningsRes = await getUserFarmEarnings2(
//         nft.balance,
//         nft.attributes,
//         "erd1qqqqqqqqqqqqqpgqe9v45fnpkv053fj0tk7wvnkred9pms892jps9lkqrn"
//       );
//       const hexNumer = Buffer.from(earningsRes.values[0], "base64").toString(
//         "hex"
//       );
//       const num = parseInt(hexNumer, 16);
//       waitToResetStatus(resetfetchMexMexFarms);

//       return num;
//     }
//   },
//   {
//     condition: (arg1, api) =>
//       executeFetch(arg1, api, reducerName, "userFarms", "mexMex"),
//   }
// );
// export const fetchMexLkmexFarms = createAsyncThunk(
//   "userAccount/fetchMexLkmexFarms",
//   async (nfts) => {
//     const nft = nfts.find((nft) => nft.collection === "MEXFARML-28d646");
//     if (nft) {
//       const earningsRes = await getUserFarmEarnings2(
//         nft.balance,
//         nft.attributes,
//         "erd1qqqqqqqqqqqqqpgq7qhsw8kffad85jtt79t9ym0a4ycvan9a2jps0zkpen"
//       );
//       const hexNumer = Buffer.from(earningsRes.values[0], "base64").toString(
//         "hex"
//       );
//       const num = parseInt(hexNumer, 16);
//       waitToResetStatus(resetfetchMexLkmexFarms);

//       return num;
//     }
//   },
//   {
//     condition: (arg1, api) =>
//       executeFetch(arg1, api, reducerName, "userFarms", "mexLkmex"),
//   }
// );
// export const fetchTopNftCollection = createAsyncThunk(
//   "userAccount/fetchTopNftCollection",
//   async () => {
//     const response = await axios.get(
//       "https://admin.21gramsbox.gr/eldar/rank2.php"
//     );
//     waitToResetStatus(resetfetchTopNftCollection);
//     const data = response.data;
//     return data;
//   },
//   {
//     condition: (arg1, api) =>
//       executeFetch(arg1, api, reducerName, "topNftCollection"),
//   }
// );

export const fetchProteoFarms = async (scInfo, userAddress, dual) => {
  let data = {};

  if (dual) {
    const res = await scQuery(
      scInfo.wsp,
      "MyStakedInfo",
      [new AddressValue(new Address(userAddress))],
      scInfo?.endpointDefinition
    );

    if (res && res.firstValue) {
      data = {
        // @ts-ignore
        depositedTokens: res.firstValue.getFieldValue("field0").toNumber(), // @ts-ignore
        pendingRewards: res.firstValue.getFieldValue("field1").toNumber(), // @ts-ignore
        pendingRewardsDual: res.firstValue.getFieldValue("field2").toNumber(), // @ts-ignore
        lastHarvestEpoch: res.firstValue.getFieldValue("field3").toNumber(), // @ts-ignore
        lastDepositedEpoch: res.firstValue.getFieldValue("field4").toNumber(), // @ts-ignore
      };
    }
  } else {
    const res = await scQuery(
      scInfo.wsp,
      "MyStakedInfo",
      [new AddressValue(new Address(userAddress))],
      scInfo?.endpointDefinition
    );
    if (res && res.firstValue) {
      data = {
        // @ts-ignore
        depositedTokens: res.firstValue.getFieldValue("field0").toNumber(), // @ts-ignore
        pendingRewards: res.firstValue.getFieldValue("field1").toNumber(), // @ts-ignore
        pendingRewardsDual: res.firstValue.getFieldValue("field2").toNumber(), // last harvest epoch in some cases
      };
    }
  }
  return data;
};
