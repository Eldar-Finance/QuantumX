import { configureStore } from "@reduxjs/toolkit";

export function makeStore() {
  return configureStore({
    reducer: {},
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
