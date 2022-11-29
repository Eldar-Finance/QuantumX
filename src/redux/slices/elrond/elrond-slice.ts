import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEconomics, getNetworkStats } from "api/rest/elrondApi/network";
import {
  executeFetch,
  waitToResetStatus,
} from "utils/functions/chacheReduxState";

const reducerName = "elrond";

const initialState = {
  stats: {
    status: "idle",
    data: [],
    error: "",
  },
  economics: {
    status: "idle",
    data: null,
    error: "",
  },
};

export const fetchStats = createAsyncThunk(
  "elrond/fetchStats",
  async () => {
    const response = await getNetworkStats();
    waitToResetStatus(resetFetchStats);
    return response.data;
  },
  {
    condition: (arg1, api) => executeFetch(arg1, api, reducerName, "stats"),
  }
);
export const fetchEconomics = createAsyncThunk(
  "elrond/fetchEconomics",
  async () => {
    const response = await getEconomics();
    waitToResetStatus(resetFetcheconomics);
    return response.data;
  },
  {
    condition: (arg1, api) => executeFetch(arg1, api, reducerName, "economics"),
  }
);

export const elrond = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    resetFetchStats: (state) => {
      state.stats.status = "idle";
    },
    resetFetcheconomics: (state) => {
      state.economics.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.stats.status = "loading";
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.stats.status = "succeeded";
        state.stats.data = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.stats.status = "failed";
        state.stats.error = action.error.message;
      })
      .addCase(fetchEconomics.pending, (state) => {
        state.economics.status = "loading";
      })
      .addCase(fetchEconomics.fulfilled, (state, action) => {
        state.economics.status = "succeeded";
        state.economics.data = action.payload;
      })
      .addCase(fetchEconomics.rejected, (state, action) => {
        state.economics.status = "failed";
        state.economics.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetFetchStats, resetFetcheconomics } = elrond.actions;

export default elrond.reducer;
