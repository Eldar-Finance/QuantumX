import store from "redux/store";
export const cacheRequestTime = 1000 * 60 * 10;

export const waitToResetStatus = (callback, delay = cacheRequestTime) => {
  const state = store.getState();
  const address = state.userAccount.connectedAddress;
  let isDiferentAddress = true;
  store.subscribe(() => {
    if (store.getState().userAccount.connectedAddress !== "") {
      if (address !== store.getState().userAccount.connectedAddress) {
        if (isDiferentAddress) {
          isDiferentAddress = false;
          store.dispatch(callback());
        }
      }
    }
  });

  setTimeout(() => {
    store.dispatch(callback());
  }, delay);
};

export const executeFetch = (
  args,
  { getState, extra },
  reducer,
  stateField,
  secondField = undefined
) => {
  let field = getState()[reducer][stateField];
  if (secondField) {
    field = field[secondField];
  }
  const fetchStatus = field.status;
  if (fetchStatus === "succeeded" || fetchStatus === "loading") {
    // Already fetched or in progress, don't need to re-fetch
    return false;
  }
};
