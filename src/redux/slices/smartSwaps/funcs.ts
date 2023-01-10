/* eslint-disable camelcase */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { scQuery } from "api/sc/queries";

export const FetchWhitelistedTokens = createAsyncThunk(
  "fastSwap/FetchWhitelistedTokens",
  async () => {
    const response = await scQuery("smartSwap", "whitelistedTokens");
    const { firstValue } = response;

    const data = firstValue;

    return firstValue.valueOf();
  }
);
