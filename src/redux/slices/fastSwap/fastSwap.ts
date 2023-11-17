import { createSlice, current } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";
import { formatBalance } from "utils/functions/formatBalance";
import {
  coreSwap,
  fetchAllowedTokens,
  fetchAllTokens,
  fetchBalances,
  fetchClaimableTokens,
  fetchEarnersInfo,
  fetchFeesInfo,
  fetchOffers,
  fetchVolume,
  getTokenBalance,
} from "./funcs";

export const reducerName = "fastSwap";

const initialState = {
  fromToken: {
    value: null,
    token: null,
    price: null,
    balance: null,
  },
  toToken: {
    value: null,
    token: null,
    price: null,
    balance: null,
  },
  tokens: {
    status: "idle",
    error: "",
    data: [],
    balances: [],
  },
  offers: {
    status: "idle",
    error: "",
    data: [],
  },
  liquidity: {
    status: "idle",
    error: "",
    data: 0,
  },
  earnersInfo: {
    status: "idle",
    error: "",
    data: [],
  },
  allowedTokens: {
    status: "idle",
    error: "",
    data: [],
  },
  fees: {
    status: "idle",
    error: "",
    data: [],
  },
  volume: {
    status: "idle",
    error: "",
    data: [],
  },
  claimableTokens: {
    status: "idle",
    error: "",
    data: [],
  },

  defaultFeeA: {
    status: "idle",
    error: "",
    data: 0,
  },
  // defaultFeeB: {
  //   status: "idle",
  //   error: "",
  //   data: 0,
  // },

  userOrders: [],

  averageRate: null,
  jexFee: null,
};

export const fastSwap = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setFromTokenValue: (state, action) => {
      const value = action.payload.value;
      const token1Amount = value === "" ? null : Number(value);
      state.fromToken.value = token1Amount;
    },

    setToTokenValue: (state, action) => {
      const value = action.payload.value;
      const token2Val = value === "" ? null : Number(value);

      state.toToken.value = token2Val;
    },
    setFromToken: (state, action) => {
      const tokenBalance = getTokenBalance(
        current(state.tokens.balances),
        action.payload.name
      );

      state.fromToken.token = action.payload;
      state.fromToken.balance = tokenBalance;
    },
    setToToken: (state, action) => {
      const tokenBalance = getTokenBalance(
        current(state.tokens.balances),
        action.payload.name
      );
      state.toToken.token = action.payload;
      state.toToken.balance = tokenBalance;
    },
    maxToken: (state) => {
      const balance = formatBalance(state.fromToken.balance);
      state.fromToken.value = balance || 0;
    },
    changePositions: (state) => {
      const tem = state.fromToken;
      state.fromToken = state.toToken;
      state.toToken = tem;
    },

    resetTokensStatus: (state) => {
      state.tokens.status = "idle";
    },

    updateSwapValues: (state, action) => {
      const token1Amount = action.payload;
      coreSwap(state, token1Amount);
    },
  },
  extraReducers(builder) {
    builder
      // fetchAllTokens
      .addCase(fetchAllTokens.pending, (state) => {
        state.tokens.status = "loading";
      })
      .addCase(fetchAllTokens.fulfilled, (state, action) => {
        state.tokens.status = "succeeded";
        state.tokens.data = action.payload.allTokensData;
      })
      .addCase(fetchAllTokens.rejected, (state, action) => {
        state.tokens.status = "failed";
        state.tokens.error = action.error.message;
      })
      // fetchBalances
      .addCase(fetchBalances.pending, (state) => {
        state.tokens.status = "loading";
      })
      .addCase(fetchBalances.fulfilled, (state, action) => {
        state.tokens.status = "succeeded";
        state.tokens.balances = action.payload.balancesData;
      })
      .addCase(fetchBalances.rejected, (state, action) => {
        state.tokens.status = "failed";
        state.tokens.error = action.error.message;
      })
      // fetchOffers
      .addCase(fetchOffers.pending, (state) => {
        state.offers.status = "loading";
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers.status = "succeeded";
        state.offers.data = action.payload;

        let liquidity = 0;

        action.payload.forEach((order) => {
          liquidity = new BigNumber(liquidity)
            .plus(order.token_a_human_amount)
            .toNumber();
        });

        state.liquidity.data = liquidity;
        if (
          action.payload[0]?.fees_permille_a &&
          Number(action.payload[0]?.fees_permille_a)
        ) {
          state.jexFee = action.payload[0]?.fees_permille_a / 10;
        } else {
          state.jexFee = null;
        }
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.offers.status = "failed";
        state.offers.error = action.error.message;
      })
      // fetchEarnersInfo
      .addCase(fetchEarnersInfo.pending, (state) => {
        state.earnersInfo.status = "loading";
      })
      .addCase(fetchEarnersInfo.fulfilled, (state, action) => {
        state.earnersInfo.status = "succeeded";
        state.earnersInfo.data = action.payload;
      })
      .addCase(fetchEarnersInfo.rejected, (state, action) => {
        state.earnersInfo.status = "failed";
        state.earnersInfo.error = action.error.message;
      })
      // fetchAllowedTokens
      .addCase(fetchAllowedTokens.pending, (state) => {
        state.allowedTokens.status = "loading";
      })
      .addCase(fetchAllowedTokens.fulfilled, (state, action) => {
        state.allowedTokens.status = "succeeded";
        state.allowedTokens.data = action.payload;
      })
      .addCase(fetchAllowedTokens.rejected, (state, action) => {
        state.allowedTokens.status = "failed";
        state.allowedTokens.error = action.error.message;
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
      })
      // fetchVolume
      .addCase(fetchVolume.pending, (state) => {
        state.volume.status = "loading";
      })
      .addCase(fetchVolume.fulfilled, (state, action) => {
        state.volume.status = "succeeded";
        state.volume.data = action.payload;
      })
      .addCase(fetchVolume.rejected, (state, action) => {
        state.volume.status = "failed";
        state.volume.error = action.error.message;
      })
      // fetchClaimableTokens
      .addCase(fetchClaimableTokens.pending, (state) => {
        state.claimableTokens.status = "loading";
      })
      .addCase(fetchClaimableTokens.fulfilled, (state, action) => {
        state.claimableTokens.status = "succeeded";
        state.claimableTokens.data = action.payload;
      })
      .addCase(fetchClaimableTokens.rejected, (state, action) => {
        state.claimableTokens.status = "failed";
        state.claimableTokens.error = action.error.message;
      })
  },
});

export const selectUserOrders = (state) => state.fastSwap.userOrders;
export const selectOffers = (state) => state.fastSwap.offers;
export const selectjexFee = (state) => state.fastSwap.jexFee;
export const selectAverageRate = (state) => state.fastSwap.averageRate;
export const selectEarnersInfo = (state) => state.fastSwap.earnersInfo;
export const selectAllowedTokens = (state) => state.fastSwap.allowedTokens;
export const selectFastSwapTokens = (state) => state.fastSwap.tokens;
export const selectFees = (state) => state.fastSwap.fees;
export const selectVolume = (state) => state.fastSwap.volume;
export const selectClaimable = (state) => state.fastSwap.claimableTokens;
export const selectDefaultTokenFeeA = (state) => state.fastSwap.defaultFeeA;

// Action creators are generated for each case reducer function
export const {
  setFromTokenValue,
  setToTokenValue,
  setFromToken,
  setToToken,
  maxToken,
  changePositions,
  resetTokensStatus,
  updateSwapValues,
} = fastSwap.actions;

export default fastSwap.reducer;
