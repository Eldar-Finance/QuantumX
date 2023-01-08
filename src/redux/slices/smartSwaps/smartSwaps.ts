import { createSlice } from "@reduxjs/toolkit";
import { toknesID } from "api/net.config";
import { AppState } from "redux/store";
import { STATUS } from "utils/types/core.interface";
import { FetchWhitelistedTokens } from "./funcs";

export const reducerName = "smartSwap";

interface ISmartSwapState {
  fromField: {
    value: string | null;
    token: string | null;
  };
  toField: {
    value: string | null;
    token: string | null;
  };
  tokens: {
    status: STATUS;
    data: string[];
    error: string;
  };
  slippage: number;
}

const initialState: ISmartSwapState = {
  fromField: {
    value: null,
    token: "EGLD",
  },
  toField: {
    value: null,
    token: toknesID.usdc,
  },
  tokens: {
    status: "idle",
    data: [],
    error: "",
  },
  slippage: 1,
};

export const smartSwap = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setFromToken: (state, action) => {
      state.fromField.token = action.payload;
    },
    setToToken: (state, action) => {
      state.toField.token = action.payload;
    },
    setFromTokenValue: (state, action) => {
      state.fromField.value = action.payload;
    },
    setToTokenValue: (state, action) => {
      state.toField.value = action.payload;
    },
    excahngeFields: (state) => {
      const temp = state.toField;
      state.toField = state.fromField;
      state.fromField = temp;
    },
    updateSlippage: (state, action) => {
      state.slippage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // FetchWhitelistedTokens
      .addCase(FetchWhitelistedTokens.pending, (state) => {
        state.tokens.status = "loading";
      })
      .addCase(FetchWhitelistedTokens.fulfilled, (state, action) => {
        state.tokens.status = "succeeded";
        state.tokens.data = action.payload;
      })
      .addCase(FetchWhitelistedTokens.rejected, (state, action) => {
        state.tokens.status = "failed";
        state.tokens.error = action.error.message;
      });
  },
});

export const selectFromField = (state: AppState) => state.smartSwap.fromField;
export const selectToField = (state: AppState) => state.smartSwap.toField;
export const selectFromToken = (state: AppState) =>
  state.smartSwap.fromField.token;
export const selectToToken = (state: AppState) => state.smartSwap.toField.token;
export const selectFromTokenValue = (state: AppState) =>
  state.smartSwap.fromField.value;
export const selectToTokenValue = (state: AppState) =>
  state.smartSwap.toField.value;
export const selectSlippage = (state: AppState) => state.smartSwap.slippage;
// Action creators are generated for each case reducer function
export const {
  setFromTokenValue,
  setToTokenValue,
  setFromToken,
  setToToken,
  excahngeFields,
  updateSlippage,
} = smartSwap.actions;

export default smartSwap.reducer;
