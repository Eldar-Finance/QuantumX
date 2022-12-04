import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "redux/store";
import { STATUS } from "utils/types/core.interface";
import { IScFarmItem, IScUserFarmInfo } from "utils/types/sc.interface";
import { fetchAllFarms, fetchUSerFarmInfo } from "./funcs";

export interface Farms2State {
  allFarms: {
    status: STATUS;
    data: IScFarmItem[];
    error: string;
  };
  userFarmsInfo: {
    status: STATUS;
    data: IScUserFarmInfo[];
    error: string;
  };
}

const initialState: Farms2State = {
  allFarms: {
    data: [],
    status: "idle",
    error: "",
  },
  userFarmsInfo: {
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
      })
      // fetchUSerFarmInfo
      .addCase(fetchUSerFarmInfo.pending, (state) => {
        state.userFarmsInfo.status = "loading";
      })
      .addCase(
        fetchUSerFarmInfo.fulfilled,
        (state, action: PayloadAction<IScUserFarmInfo[]>) => {
          state.userFarmsInfo.status = "succeeded";
          state.userFarmsInfo.data = action.payload;
        }
      )
      .addCase(fetchUSerFarmInfo.rejected, (state, action) => {
        state.userFarmsInfo.status = "failed";
        state.userFarmsInfo.error = action.error.message;
      });
  },
});

export const {} = generalSlice.actions;

export const selectAllFarms2 = (state: AppState) => state.farms2.allFarms;
export const selectUserFarms2Info = (state: AppState) =>
  state.farms2.userFarmsInfo;
export default generalSlice.reducer;
