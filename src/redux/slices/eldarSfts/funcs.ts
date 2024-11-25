import { Address, AddressValue } from "@multiversx/sdk-core/out";
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
    console.log('⚠️ ~ response:', response);

    const { firstValue } = response;
    console.log('⚠️ ~ firstValue:', firstValue);
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
    console.log('⚠️ ~ response:', response);

    console.log('⚠️ ~ response:', response);

    const data = response.values?.[0].items.map((struct) => {
      return {
        status: struct.getFieldValue("status").name,
        tokenI: struct.getFieldValue("token"),
        nonce: struct.getFieldValue("nonce").toNumber(),
        amount: struct.getFieldValue("amount").toNumber(),
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
    console.log('⚠️ ~ response:', response);

    const { firstValue } = response;
    console.log('⚠️ ~ firstValue:', firstValue);
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
