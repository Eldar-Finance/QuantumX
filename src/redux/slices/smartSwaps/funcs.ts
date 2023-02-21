/* eslint-disable camelcase */
import { BytesValue } from "@elrondnetwork/erdjs/out";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toknesID } from "api/net.config";
import { scQuery } from "api/sc/queries";

export const FetchWhitelistedTokens = createAsyncThunk(
  "fastSwap/FetchWhitelistedTokens",
  async () => {
    const allWhiteListedTokensRes = await scQuery(
      "smartSwap",
      "whitelistedTokens"
    );
    const { firstValue: allFirstValue } = allWhiteListedTokensRes;
    const wegldWhitelistedLp = await scQuery("smartSwap", "whitelistedLps", [
      BytesValue.fromUTF8(toknesID.wegld),
    ]);
    const { firstValue: wegldFirstValue } = wegldWhitelistedLp;
    const usdcWhitelistedLp = await scQuery("smartSwap", "whitelistedLps", [
      BytesValue.fromUTF8(toknesID.usdc),
    ]);
    const { firstValue: usdcFirstValue } = usdcWhitelistedLp;

    const data = {
      allWhitelisted: [
        ...allFirstValue.valueOf(),
        "BUSD-40b57e",
        "USDT-f8c08c",
      ],
      wegldWhitelisted: wegldFirstValue.valueOf(),
      usdcWhitelisted: usdcFirstValue.valueOf(),
    };

    return data;
  }
);
