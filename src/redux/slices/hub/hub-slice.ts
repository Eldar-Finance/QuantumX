import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "redux/store";
import { STATUS } from "utils/types/core.interface";
import { IHubCreatorInfo, IHubOffer } from "utils/types/sc.interface";
import { fetchCreatorInfo } from "./funcs";

export const reducerName = "hub";

interface IHubState {
  offers: {
    status: STATUS;
    error: string;
    data: IHubOffer[];
  };
  creatorsInfo: {
    status: STATUS;
    error: string;
    data: IHubCreatorInfo[];
  };
}

const initialState: IHubState = {
  offers: {
    status: "idle",
    error: "",
    data: [],
  },
  creatorsInfo: {
    status: "idle",
    error: "",
    data: [],
  },
};

export const hub = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    // setFromTokenValue: (state, action) => {
    //   const value = action.payload.value;
    //   const token1Amount = value === "" ? null : Number(value);
    //   state.fromToken.value = token1Amount;
    // },
  },
  extraReducers(builder) {
    builder
      // fetchCreatorInfo
      .addCase(fetchCreatorInfo.pending, (state) => {
        state.creatorsInfo.status = "loading";
      })
      .addCase(fetchCreatorInfo.fulfilled, (state, action) => {
        state.creatorsInfo.status = "succeeded";
        state.creatorsInfo.data = action.payload;
      })
      .addCase(fetchCreatorInfo.rejected, (state, action) => {
        state.creatorsInfo.status = "failed";
        state.creatorsInfo.error = action.error.message;
      });
  },
});

export const selectHubOffers = (state: AppState) => state.hub.offers;
export const selectHubCreatorsInfo = (state: AppState) =>
  state.hub.creatorsInfo;
// Action creators are generated for each case reducer function
export const {} = hub.actions;

export default hub.reducer;
