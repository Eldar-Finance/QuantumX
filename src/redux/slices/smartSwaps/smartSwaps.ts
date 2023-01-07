import { createSlice } from "@reduxjs/toolkit";
import { toknesID } from "api/net.config";
import { AppState } from "redux/store";

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
  tokens: string[];
}

const initialState: ISmartSwapState = {
  fromField: {
    value: null,
    token: toknesID.ride,
  },
  toField: {
    value: null,
    token: "EGLD",
  },
  tokens: ["EGLD", toknesID.usdc, toknesID.wegld, toknesID.crt, toknesID.rare],
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

// Action creators are generated for each case reducer function
export const {
  setFromTokenValue,
  setToTokenValue,
  setFromToken,
  setToToken,
  excahngeFields,
} = smartSwap.actions;

export default smartSwap.reducer;
