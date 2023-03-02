import { createAsyncThunk } from "@reduxjs/toolkit";

import { scQuery, scSimpleQuery } from "api/sc/queries";

import { Address, AddressValue } from "@multiversx/sdk-core/out";
import axiosEldar2 from "api/rest/axiosEldar2";
import axiosEldron from "api/rest/axiosEldron";
import { proteoEliteWsp } from "api/sc/sc";
import store from "redux/store";
import {
  executeFetch,
  waitToResetStatus,
} from "utils/functions/chacheReduxState";
import {
  reducerName,
  resetfetchApr,
  resetfetchEliteWallets,
  resetfetchGeneralInfo,
  resetfetchinBurnWallet,
  resetfetchIndex,
  resetfetchListOfBlacklisted,
  resetfetchPrice,
  resetfetchRanking,
  resetfetchSupply,
  resetfetchTotalDeposited,
  resetfetchUserInfo,
  resetfetchUserProteo,
  resetfetchWithdrawInfo,
} from "./proteo";
export const fetchEliteWallets = createAsyncThunk(
  "proteo/fetchEliteWallets",
  async () => {
    const response: any = await scSimpleQuery(
      "erd1qqqqqqqqqqqqqpgq3j97mjvu7vpn638ekcupcy4n0x6rdnleznyqn5faj9",
      "EliteWallets"
    );
    const hexNumer = Buffer.from(response.values[0], "base64").toString("hex");
    const num = parseInt(hexNumer, 16);

    waitToResetStatus(resetfetchEliteWallets);

    return num;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "eliteWallets"),
  }
);
export const fetchPrice = createAsyncThunk(
  "proteo/fetchPrice",
  async () => {
    const response = await axiosEldar2.get("/proteo.php");
    if (response.data.length > 0) {
      waitToResetStatus(resetfetchPrice);

      const data = response.data;
      return data;
    } else {
      store.dispatch(fetchPrice());
    }
  },
  {
    condition: (arg1, api) => executeFetch(arg1, api, reducerName, "price"),
  }
);

export const fetchIndex = createAsyncThunk(
  "proteo/fetchIndex",
  async () => {
    const response: any = await scSimpleQuery(
      "erd1qqqqqqqqqqqqqpgqgypex2r0x5el8lsfk4hpdp0yhkuz79juznyqukp6qd",
      "ProteoIndex"
    );
    const hexNumer = Buffer.from(response.values[0], "base64").toString("hex");
    const num = parseInt(hexNumer, 16);
    const data = num;

    waitToResetStatus(resetfetchIndex);
    return data;
  },
  {
    condition: (arg1, api) => executeFetch(arg1, api, reducerName, "index"),
  }
);

export const fetchSupply = createAsyncThunk(
  "proteo/fetchSupply",
  async () => {
    const response = await axiosEldron.get("/tokens/PROTEO-0c7311/supply");

    waitToResetStatus(resetfetchSupply);
    const data = response.data;
    return data;
  },
  {
    condition: (arg1, api) => executeFetch(arg1, api, reducerName, "supply"),
  }
);
export const fetchInBurn = createAsyncThunk(
  "proteo/fetchInBurn",
  async () => {
    const response = await axiosEldar2.get("/burn.php");

    waitToResetStatus(resetfetchinBurnWallet);
    const data = response.data;
    return data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "inBurnWallet"),
  }
);
export const fetchUserProteo = createAsyncThunk(
  "proteo/fetchUserProteo",
  async (address) => {
    const response = await axiosEldron.get(
      `/accounts/${address}/tokens/SPROTEO-c2dffe`
    );
    waitToResetStatus(resetfetchUserProteo);
    const data = response.data;
    return data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "userProteo"),
  }
);

export const fetchRanking = createAsyncThunk(
  "proteo/fetchRanking",
  async (address: string) => {
    const response = await axiosEldar2.get("/rank.php");

    waitToResetStatus(resetfetchRanking);
    const data = response.data;
    const sProteoInElite = data.find((rank) => rank.address === address);
    return { ranking: data, sProteoInElite: Number(sProteoInElite?.value) };
  },
  {
    condition: (arg1, api) => executeFetch(arg1, api, reducerName, "ranking"),
  }
);

export const fetchTotalDeposited = createAsyncThunk(
  "proteo/fetchTotalDeposited",
  async () => {
    const response: any = await scSimpleQuery(
      "erd1qqqqqqqqqqqqqpgq3j97mjvu7vpn638ekcupcy4n0x6rdnleznyqn5faj9",
      "TotalDeposited"
    );
    const hexNumer = Buffer.from(response.values[0], "base64").toString("hex");
    const num = parseInt(hexNumer, 16);
    const data = num;

    waitToResetStatus(resetfetchTotalDeposited);
    return data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "totalDeposited"),
  }
);
export const fetchApr = createAsyncThunk(
  "proteo/fetchApr",
  async () => {
    const response: any = await scSimpleQuery(
      "erd1qqqqqqqqqqqqqpgqgypex2r0x5el8lsfk4hpdp0yhkuz79juznyqukp6qd",
      "Apr"
    );
    const hexNumer = Buffer.from(response.values[0], "base64").toString("hex");
    const num = parseInt(hexNumer, 16);
    const data = num;

    waitToResetStatus(resetfetchApr);
    return data;
  },
  {
    condition: (arg1, api) => executeFetch(arg1, api, reducerName, "apr"),
  }
);

export const getProteoRank = (total) => {
  // const rank = proteoRank.find(
  //   (rank) => rank.min <= total && rank.max >= total
  // );
  // if (rank) {
  //   return rank;
  // } else {
  //   return {
  //     emoji: "",
  //     name: "",
  //   };
  // }
};

// dapp

export const fetchUserInfo = createAsyncThunk(
  "proteo/fetchUserInfo",
  async (address: string) => {
    const response: any = await scQuery(proteoEliteWsp, "getUserInfo", [
      new AddressValue(new Address(address)),
    ]);
    waitToResetStatus(resetfetchUserInfo);
    const data = response.firstValue.backingCollection.items.map((struct) => {
      return {
        tokenI: struct.getFieldValue("field0"),
        staked: struct.getFieldValue("field1").toNumber(),
        remainingTime: struct.getFieldValue("field2").toNumber(),
      };
    });
    return data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "userInfoApp"),
  }
);
export const fetchGeneralInfo = createAsyncThunk(
  "proteo/fetchGeneralInfo",
  async () => {
    const response = await scQuery(proteoEliteWsp, "getGeneralInfo");
    waitToResetStatus(resetfetchGeneralInfo);
    const res: any = response.firstValue;

    const data = {
      farmingUsers: res.getFieldValue("field0").toNumber(),
      tokensInfo: res.getFieldValue("field1").map((tokenI) => {
        return {
          tokenI: tokenI.field0,
          staked: tokenI.field1.toNumber(),
          avilableToStake: tokenI.field2.toNumber(),
          epoch: tokenI.field3.toNumber(),
        };
      }),
    };

    return data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "generalInfoApp"),
  }
);
export const fetchListOfBlacklisted = createAsyncThunk(
  "proteo/fetchListOfBlacklisted",
  async () => {
    const response = await scQuery(proteoEliteWsp, "getListOfBlacklisted");

    waitToResetStatus(resetfetchListOfBlacklisted);
    const res: any = response.firstValue;

    const data = res.backingCollection.items.map((address) => {
      const add = new Address(address.valueOf());

      return add.bech32();
    });

    return data;
  },
  {
    condition: (arg1, api) => executeFetch(arg1, api, reducerName, "blackList"),
  }
);
export const fetchWithdrawInfo = createAsyncThunk(
  "proteo/fetchWithdrawInfo",
  async (address: string) => {
    const response: any = await scQuery(proteoEliteWsp, "getWithdrawInfo", [
      new AddressValue(new Address(address)),
    ]);

    waitToResetStatus(resetfetchWithdrawInfo);
    const res = response.firstValue;
    const data = res.backingCollection.items.map((struct) => {
      return {
        tokenI: struct.getFieldValue("field0"),
        amount: struct.getFieldValue("field1").toNumber(),
      };
    });
    return data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "withDrawInfo"),
  }
);
