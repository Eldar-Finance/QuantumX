import { Address, AddressValue } from "@elrondnetwork/erdjs/out";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { scQuery } from "api/sc/queries";
import { sftsRewardsWsp } from "api/sc/sc";
import {
  executeFetch,
  waitToResetStatus,
} from "utils/functions/chacheReduxState";

import {
  reducerName,
  resetEldarSftsWithStatus,
  resetStakingNumbers,
  resetTotalStfsRewards,
} from "./eldarSfts";

export const fetcRetrieveStakingStats = createAsyncThunk(
  "eldarSfts/fetcRetrieveStakingStats",
  async (address: string) => {
    const response: any = await scQuery(
      sftsRewardsWsp,
      "getRetrieveStakingStats",
      [new AddressValue(new Address(address))]
    );
    const { firstValue } = response;
    const data = firstValue.backingCollection.items.map((num) => {
      return Number(num);
    });
    waitToResetStatus(resetStakingNumbers);

    return data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "stakingNumbers"),
  }
);

export const fetchRetrieveNrOfSftsPerStatus = createAsyncThunk(
  "eldarSfts/fetchRetrieveNrOfSftsPerStatus",
  async (address: string) => {
    const response: any = await scQuery(
      sftsRewardsWsp,
      "getRetrieveNrOfSftsPerStatus",
      [new AddressValue(new Address(address))]
    );
    const { firstValue } = response;

    const data = firstValue.backingCollection.items.map((struct) => {
      return {
        status: struct.getFieldValue("field0").name,
        tokenI: struct.getFieldValue("field1"),
        nonce: struct.getFieldValue("field2").toNumber(),
        amount: struct.getFieldValue("field3").toNumber(),
      };
    });
    waitToResetStatus(resetEldarSftsWithStatus);

    return data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "eldarSftsWithStatus"),
  }
);

export const fetchSftsRewards = createAsyncThunk(
  "eldarSfts/fetchSftsRewards",
  async (address: string) => {
    const response: any = await scQuery(
      sftsRewardsWsp,
      "getRetrieveRewardsViews",
      [new AddressValue(new Address(address))]
    );
    const { firstValue } = response;
    const data = firstValue.backingCollection.items.map((list) => {
      return list.backingCollection.items.map((struct) => {
        return {
          tokenI: struct.getFieldValue("field0"),
          value: struct.getFieldValue("field1").toNumber(),
        };
      });
    });
    waitToResetStatus(resetTotalStfsRewards);

    return data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "stfsRewards"),
  }
);
