import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import lkmexAveragingReducer from "./slices/dca/dca-slice";
import eldarSftsReducer from "./slices/eldarSfts/eldarSfts";
import elrondReducer from "./slices/elrond/elrond-slice";
import farms2Reducer from "./slices/farms2/farms2-slice";
import fastSwapReducer from "./slices/fastSwap/fastSwap";
import proteoReducer from "./slices/proteo/proteo";
import siteSettingsReducer from "./slices/settings/settings-reducer";
import smartSwapReducer from "./slices/smartSwaps/smartSwaps";
import userAccountReducer from "./slices/userAcount/account-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      siteSettings: siteSettingsReducer,
      userAccount: userAccountReducer,
      fastSwap: fastSwapReducer,
      smartSwap: smartSwapReducer,
      lkmexAveraging: lkmexAveragingReducer,
      elrond: elrondReducer,
      proteo: proteoReducer,
      farms2: farms2Reducer,
      eldarSfts: eldarSftsReducer,
    },
    devTools: process.env.NODE_ENV === "production" ? false : true,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

const store = makeStore();
export default store;

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState,
  });
};

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
