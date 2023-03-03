import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "redux/store";
import { INomalSmartSwap } from "utils/types/others.interface";

export const reducerName = "convert";

interface IHubState {
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

const initialState: IHubState = {
  convertInfo: [],
  allConvertInfo: [],
};

export const convert = createSlice({
  name: reducerName,
  initialState,
  reducers: {
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
  state.converter.convertInfo;
// Action creators are generated for each case reducer function
export const {
  handleConverterToken,
  addSwapInfoToAllConvertTokens,
  selectAllTokens,
} = convert.actions;

export default convert.reducer;
