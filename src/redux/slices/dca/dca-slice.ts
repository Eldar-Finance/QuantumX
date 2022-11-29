import { createSlice, current } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";
import {
  coreJexSwap,
  fetchFeesInfo,
  fetchHightRiskTokens,
  fetchLkmexAveragingTokens,
  fetchMinimalTokens,
  fetchTotalVolumen,
  fetchwhiteListedJexTokens,
  fetchwhiteListedTokens,
  setJexPairs,
} from "./func";

export const reducerName = "lkmexAveraging";

const initialState = {
  tokens: {
    status: "idle",
    data: [],
    error: "",
  },
  minimalTokens: {
    status: "idle",
    data: [],
    error: "",
  },
  hightRiskTokens: {
    status: "idle",
    data: [],
    error: "",
  },
  cutomTokens: [],
  totalVolume: {
    status: "idle",
    data: 0,
    error: "",
  },
  whiteListedTokens: {
    status: "idle",
    data: [],
    error: "",
  },
  whiteListedJexTokens: {
    status: "idle",
    data: [],
    error: "",
  },
  fees: {
    status: "idle",
    error: "",
    data: [],
  },
  jexPairs: {
    status: "idle",
    data: [],
    error: "",
  },
  tokensIdentifiers: [],
  egldPercentsAmounts: [],
  tokensByEgldPercent: [],
};

export const lkmexAveraging = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    resetFetcheTokens: (state) => {
      state.tokens.status = "idle";
    },
    resetFetchMinimalTokens: (state) => {
      state.minimalTokens.status = "idle";
    },
    resetFetchhightRiskTokens: (state) => {
      state.hightRiskTokens.status = "idle";
    },

    resetfetchwhiteListedTokens: (state) => {
      state.whiteListedTokens.status = "idle";
    },
    resetfetcwhiteListedJexTokens: (state) => {
      state.whiteListedJexTokens.status = "idle";
    },

    setTokensIdentifiers: (state, action) => {
      state.tokensIdentifiers = action.payload;
    },
    setEgldPercentsAmounts: (state, action) => {
      state.egldPercentsAmounts = action.payload;
    },
    setTokensByEgldPercent: (state, action) => {
      state.tokensByEgldPercent = action.payload;
    },
    setCustomTokens: (state, action) => {
      state.cutomTokens = action.payload;
    },
    updateJexPair: (state, action) => {
      const jexPairs = current(state.jexPairs.data);
      const { egldAmount } = action.payload;

      const newJexPairs = jexPairs.map((pair) => {
        const realAmount = new BigNumber(egldAmount)
          .multipliedBy(pair.percent)
          .dividedBy(100);

        const dataToUpodate = coreJexSwap(
          pair.orders,
          realAmount,
          pair.toToken,
          pair.fromToken,
          0.5
        );

        const { returnValue, userOffers, averageRate } = dataToUpodate;
        const newPair = {
          ...pair,
          returnValue: returnValue,
          userOrders: userOffers,
          averageRate: averageRate,
        };

        return newPair;
      });

      state.jexPairs.data = newJexPairs;
    },
  },
  extraReducers(builder) {
    builder
      // fetchNfts
      .addCase(fetchLkmexAveragingTokens.pending, (state) => {
        state.tokens.status = "loading";
      })
      .addCase(fetchLkmexAveragingTokens.fulfilled, (state, action) => {
        state.tokens.status = "succeeded";
        state.tokens.data = action.payload;
      })
      .addCase(fetchLkmexAveragingTokens.rejected, (state, action) => {
        state.tokens.status = "failed";
        state.tokens.error = action.error.message;
      })
      // fetchMinimalTokens
      .addCase(fetchMinimalTokens.pending, (state) => {
        state.minimalTokens.status = "loading";
      })
      .addCase(fetchMinimalTokens.fulfilled, (state, action) => {
        state.minimalTokens.status = "succeeded";
        state.minimalTokens.data = action.payload;
      })
      .addCase(fetchMinimalTokens.rejected, (state, action) => {
        state.minimalTokens.status = "failed";
        state.minimalTokens.error = action.error.message;
      })
      // fetchHightRiskTokens
      .addCase(fetchHightRiskTokens.pending, (state) => {
        state.hightRiskTokens.status = "loading";
      })
      .addCase(fetchHightRiskTokens.fulfilled, (state, action) => {
        state.hightRiskTokens.status = "succeeded";
        state.hightRiskTokens.data = action.payload;
      })
      .addCase(fetchHightRiskTokens.rejected, (state, action) => {
        state.hightRiskTokens.status = "failed";
        state.hightRiskTokens.error = action.error.message;
      })
      // fetchTotalVolumen
      .addCase(fetchTotalVolumen.pending, (state) => {
        state.totalVolume.status = "loading";
      })
      .addCase(fetchTotalVolumen.fulfilled, (state, action) => {
        state.totalVolume.status = "succeeded";
        state.totalVolume.data = action.payload;
      })
      .addCase(fetchTotalVolumen.rejected, (state, action) => {
        state.totalVolume.status = "failed";
        state.totalVolume.error = action.error.message;
      })
      // fetchwhiteListedTokens
      .addCase(fetchwhiteListedTokens.pending, (state) => {
        state.whiteListedTokens.status = "loading";
      })
      .addCase(fetchwhiteListedTokens.fulfilled, (state, action) => {
        state.whiteListedTokens.status = "succeeded";
        state.whiteListedTokens.data = action.payload;
      })
      .addCase(fetchwhiteListedTokens.rejected, (state, action) => {
        state.whiteListedTokens.status = "failed";
        state.whiteListedTokens.error = action.error.message;
      })
      // fetchwhiteListedJexTokens
      .addCase(fetchwhiteListedJexTokens.pending, (state) => {
        state.whiteListedJexTokens.status = "loading";
      })
      .addCase(fetchwhiteListedJexTokens.fulfilled, (state, action) => {
        state.whiteListedJexTokens.status = "succeeded";
        state.whiteListedJexTokens.data = action.payload;
      })
      .addCase(fetchwhiteListedJexTokens.rejected, (state, action) => {
        state.whiteListedJexTokens.status = "failed";
        state.whiteListedJexTokens.error = action.error.message;
      })
      // setJexPairs
      .addCase(setJexPairs.pending, (state) => {
        state.jexPairs.status = "loading";
      })
      .addCase(setJexPairs.fulfilled, (state, action) => {
        state.jexPairs.status = "succeeded";
        state.jexPairs.data = action.payload;
      })
      .addCase(setJexPairs.rejected, (state, action) => {
        state.jexPairs.status = "failed";
        state.jexPairs.error = action.error.message;
      })
      // fetchFeesInfo
      .addCase(fetchFeesInfo.pending, (state) => {
        state.fees.status = "loading";
      })
      .addCase(fetchFeesInfo.fulfilled, (state, action) => {
        state.fees.status = "succeeded";
        state.fees.data = action.payload;
      })
      .addCase(fetchFeesInfo.rejected, (state, action) => {
        state.fees.status = "failed";
        state.fees.error = action.error.message;
      });
  },
});

export const selectDcaWhiteListedTokens = (state) =>
  state.lkmexAveraging.whiteListedTokens;
export const selectDcaWhiteListedJexTokens = (state) =>
  state.lkmexAveraging.whiteListedJexTokens;
export const selectJexPairs = (state) => state.lkmexAveraging.jexPairs;
export const selectFees = (state) => state.lkmexAveraging.fees;

// Action creators are generated for each case reducer function
export const {
  resetFetcheTokens,
  setTokensIdentifiers,
  setEgldPercentsAmounts,
  setTokensByEgldPercent,
  resetfetchwhiteListedTokens,
  resetFetchMinimalTokens,
  resetFetchhightRiskTokens,
  resetfetcwhiteListedJexTokens,
  setCustomTokens,
  updateJexPair,
} = lkmexAveraging.actions;

export default lkmexAveraging.reducer;
