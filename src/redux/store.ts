import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import converterReducer from "./slices/converter/converter-slice";
import eldarSftsReducer from "./slices/eldarSfts/eldarSfts";
import elrondReducer from "./slices/elrond/elrond-slice";
import farms2Reducer from "./slices/farms2/farms2-slice";
import hubReducer from "./slices/hub/hub-slice";
import moondustxReducer from "./slices/moondustx/moondustx-slice";
import siteSettingsReducer from "./slices/settings/settings-reducer";
import smartSwapReducer from "./slices/smartSwaps/smartSwaps";
import userAccountReducer from "./slices/userAcount/account-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      siteSettings: siteSettingsReducer,
      userAccount: userAccountReducer,
      smartSwap: smartSwapReducer,
      elrond: elrondReducer,
      farms2: farms2Reducer,
      eldarSfts: eldarSftsReducer,
      hub: hubReducer,
      converter: converterReducer,
      moondustx: moondustxReducer,
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
