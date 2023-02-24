import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "redux/store";
import { STATUS } from "utils/types/core.interface";
import {
  IScFarmItem,
  IScMultiFarmsRewardsLeft,
  IScPanelFarms,
  IScUserFarmInfo,
  IScUserFarmRewards,
} from "utils/types/sc.interface";
import {
  fetchAllFarms,
  fetchCreatorsFarms,
  fetchMultiFarms2RewardsLeft,
  fetchUSerFarmInfo,
  fetchUSerRewardsInfo,
} from "./funcs";

export interface Farms2State {
  allFarms: {
    status: STATUS;
    data: IScFarmItem[];
    pools: IScFarmItem[];
    hype: IScFarmItem[];
    farms: IScFarmItem[];
    error: string;
  };
  userFarmsInfo: {
    status: STATUS;
    data: IScUserFarmInfo[];
    error: string;
  };
  userRewards: {
    status: STATUS;
    data: IScUserFarmRewards[];
    error: string;
  };
  creatorsFarms: {
    status: STATUS;
    data: IScPanelFarms[];
    error: string;
  };
  multiFarmsRewardsLeft: {
    status: STATUS;
    data: IScMultiFarmsRewardsLeft[];
    error: string;
  };
}

const initialState: Farms2State = {
  allFarms: {
    data: [],
    hype: [],
    pools: [],
    farms: [],
    status: "idle",
    error: "",
  },
  userFarmsInfo: {
    data: [],
    status: "idle",
    error: "",
  },
  userRewards: {
    data: [],
    status: "idle",
    error: "",
  },
  creatorsFarms: {
    data: [],
    status: "idle",
    error: "",
  },
  multiFarmsRewardsLeft: {
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
        (
          state,
          action: PayloadAction<{
            allFarms: IScFarmItem[];
            pools: IScFarmItem[];
            farms: IScFarmItem[];
            allHypeFarms: IScFarmItem[];
          }>
        ) => {
          state.allFarms.status = "succeeded";
          state.allFarms.data = action.payload.allFarms;
          state.allFarms.pools = action.payload.pools;
          state.allFarms.farms = action.payload.farms;
          state.allFarms.hype = action.payload.allHypeFarms;
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
        state.userRewards.status = "failed";
        state.userRewards.error = action.error.message;
      })
      // fetchUSerRewardsInfo
      .addCase(fetchUSerRewardsInfo.pending, (state) => {
        state.userRewards.status = "loading";
      })
      .addCase(
        fetchUSerRewardsInfo.fulfilled,
        (state, action: PayloadAction<IScUserFarmRewards[]>) => {
          state.userRewards.status = "succeeded";
          state.userRewards.data = action.payload;
        }
      )
      .addCase(fetchUSerRewardsInfo.rejected, (state, action) => {
        state.userFarmsInfo.status = "failed";
        state.userFarmsInfo.error = action.error.message;
      })
      // fetchUSerFarmInfo
      .addCase(fetchCreatorsFarms.pending, (state) => {
        state.creatorsFarms.status = "loading";
      })
      .addCase(
        fetchCreatorsFarms.fulfilled,
        (state, action: PayloadAction<IScPanelFarms[]>) => {
          state.creatorsFarms.status = "succeeded";
          state.creatorsFarms.data = action.payload;
        }
      )
      .addCase(fetchCreatorsFarms.rejected, (state, action) => {
        state.creatorsFarms.status = "failed";
        state.creatorsFarms.error = action.error.message;
      })
      // fetchMultiFarms2RewardsLeft
      .addCase(fetchMultiFarms2RewardsLeft.pending, (state) => {
        state.multiFarmsRewardsLeft.status = "loading";
      })
      .addCase(
        fetchMultiFarms2RewardsLeft.fulfilled,
        (state, action: PayloadAction<IScMultiFarmsRewardsLeft[]>) => {
          state.multiFarmsRewardsLeft.status = "succeeded";
          state.multiFarmsRewardsLeft.data = action.payload;
        }
      )
      .addCase(fetchMultiFarms2RewardsLeft.rejected, (state, action) => {
        state.multiFarmsRewardsLeft.status = "failed";
        state.multiFarmsRewardsLeft.error = action.error.message;
      });
  },
});

export const {} = generalSlice.actions;

export const selectAllFarms2 = (state: AppState) => state.farms2.allFarms;
export const selectFarms = (state: AppState) => state.farms2.allFarms.farms;
export const selectPools = (state: AppState) => state.farms2.allFarms.pools;
export const selectHype = (state: AppState) => state.farms2.allFarms.hype;
export const selectCreatorsFarms = (state: AppState) =>
  state.farms2.creatorsFarms;
export const selectUserFarms2Info = (state: AppState) =>
  state.farms2.userFarmsInfo;
export const selectUserFarms2Rewards = (state: AppState) =>
  state.farms2.userRewards;
export const selectMultiFarms2RewardsLeft = (state: AppState) =>
  state.farms2.multiFarmsRewardsLeft;
export default generalSlice.reducer;
