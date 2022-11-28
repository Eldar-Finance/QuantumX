import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import siteSettingsReducer from "./slices/settings/settings-reducer";
import userAccountReducer from "./slices/userAcount/account-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      siteSettings: siteSettingsReducer,
      userAccount: userAccountReducer,
    },
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
