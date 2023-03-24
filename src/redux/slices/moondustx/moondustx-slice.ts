import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toknesID } from "api/net.config";
import { AppState } from "redux/store";
import { INomalSmartSwap } from "utils/types/others.interface";
import { toTokensToConvert } from "views/MoonDustX/utils/contants";

export const reducerName = "moonDustx";

interface IMoonDustXState {
  toToken: string;
  convertInfo: {
    identifier: string;
    data: INomalSmartSwap[];
    balance: string;
  }[];
  allConvertInfo: {
    identifier: string;
    data: INomalSmartSwap[];
    balance: string;
  }[];
}

const initialState: IMoonDustXState = {
  toToken: toknesID.wegld, // token that user wants to receive
  convertInfo: [],
  allConvertInfo: [],
};

export const moonDustx = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    selectToToken: (state, action: PayloadAction<string>) => {
      if (state.toToken === action.payload) return;
      if (!toTokensToConvert.includes(action.payload)) return;
      state.toToken = action.payload;
      state.allConvertInfo = [];
      state.convertInfo = [];
    },
    handleConverterToken: (
      state,
      action: PayloadAction<{
        data: INomalSmartSwap[];
        identifier: string;
        remove: boolean;
        balance: string;
      }>
    ) => {
      const { remove, data, identifier, balance } = action.payload;

      if (remove) {
        const newSelectedSwapData = state.convertInfo.filter(
          (item) => item.identifier !== identifier
        );
        state.convertInfo = newSelectedSwapData;
      } else {
        state.convertInfo.push({
          identifier: identifier,
          data: data,
          balance,
        });
      }
    },
    selectAllTokens: (state) => {
      state.convertInfo = state.allConvertInfo;
    },
    addSwapInfoToAllConvertTokens: (
      state,
      action: PayloadAction<{
        data: INomalSmartSwap[];
        identifier: string;
        balance: string;
      }>
    ) => {
      const { data, identifier, balance } = action.payload;
      if (state.allConvertInfo.find((item) => item.identifier === identifier))
        return;
      state.allConvertInfo.push({
        identifier: identifier,
        data: data,
        balance,
      });
    },
  },
});

export const selectConvertInfo = (state: AppState) =>
  state.moondustx.convertInfo;
export const selectallConvertInfo = (state: AppState) =>
  state.moondustx.allConvertInfo;
export const selectToTokenDust = (state: AppState) => state.moondustx.toToken;
// Action creators are generated for each case reducer function
export const {
  handleConverterToken,
  addSwapInfoToAllConvertTokens,
  selectAllTokens,
  selectToToken,
} = moonDustx.actions;

export default moonDustx.reducer;
