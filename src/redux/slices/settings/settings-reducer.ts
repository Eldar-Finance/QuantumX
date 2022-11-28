import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "redux/store";
import { getActiveRoute, routesArr } from "utils/routes";

const reducerName = "siteSettings";

const initialState = {
  brandText: "",
  displayData: {
    status: "idle",
    data: [],
    error: "",
  },
  isLoginOpen: false,
};

export const siteSettings = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setBrandText: (state) => {
      state.brandText = getActiveRoute(routesArr);
    },
    resetDisplayDataStatus: (state) => {
      state.displayData.status = "idle";
    },
    openLogin: (state, action) => {
      state.isLoginOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setBrandText,
  resetDisplayDataStatus,
  openLogin,
} = siteSettings.actions;

export default siteSettings.reducer;

export const selectIsLoginModal = (state: AppState) =>
  state.siteSettings.isLoginOpen;
