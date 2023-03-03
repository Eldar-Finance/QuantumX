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
}

const initialState: IHubState = {
  convertInfo: [],
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
      console.log("action.payload", action.payload);

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
  },
});

export const selectConvertInfo = (state: AppState) =>
  state.converter.convertInfo;

// Action creators are generated for each case reducer function
export const { handleConverterToken } = convert.actions;

export default convert.reducer;
