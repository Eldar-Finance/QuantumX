import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "redux/store";
import { STATUS } from "utils/types/core.interface";
import { IScFarmItem } from "utils/types/sc.interface";
import { fetchAllFarms } from "./funcs";

export interface Farms2State {
  allFarms: {
    status: STATUS;
    data: IScFarmItem[];
    error: string;
  };
}

const initialState: Farms2State = {
  allFarms: {
    data: [],
    status: "idle",
    error: "",
  },
};

export const generalSlice = createSlice({
  name: "farms2",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // fetchAllFarms
      .addCase(fetchAllFarms.pending, (state) => {
        state.allFarms.status = "loading";
      })
      .addCase(
        fetchAllFarms.fulfilled,
        (state, action: PayloadAction<IScFarmItem[]>) => {
          state.allFarms.status = "succeeded";
          state.allFarms.data = action.payload;
        }
      )
      .addCase(fetchAllFarms.rejected, (state, action) => {
        state.allFarms.status = "failed";
        state.allFarms.error = action.error.message;
      });
  },
});

export const {} = generalSlice.actions;

export const selectAllFarms2 = (state: AppState) => state.farms2.allFarms;
export default generalSlice.reducer;
