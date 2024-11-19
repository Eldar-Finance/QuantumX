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

import { Address, AddressValue } from "@multiversx/sdk-core/out";
import { scQuery } from "api/sc/queries";

import {
  executeFetch,
  waitToResetStatus,
} from "utils/functions/chacheReduxState";
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

    return response;
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
    let response = await getNfts({ address });
    if (response.length === responseSize) {
      response = await getNfts({ address });
    }
    // waitToResetStatus(resetNfts);

    return response;
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
    const response = await getNfts({
      address: "erd1d4y74h60k79nr7jpqkt3ktp7pr55wjwnxfn7dtadraq6hfjwrxks02l37k",
    });
    waitToResetStatus(resetEldarNfts);

    return response;
  },
  {
    condition: (arg1, api) => executeFetch(arg1, api, reducerName, "eldarNfts"),
  }
);
