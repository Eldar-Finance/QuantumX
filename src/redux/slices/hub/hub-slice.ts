import { createSlice } from "@reduxjs/toolkit";

export const reducerName = "hub";

const initialState = {};

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
    builder;
    //   // fetchAllTokens
    //   .addCase(fetchAllTokens.pending, (state) => {
    //     state.tokens.status = "loading";
    //   })
    //   .addCase(fetchAllTokens.fulfilled, (state, action) => {
    //     state.tokens.status = "succeeded";
    //     state.tokens.data = action.payload.allTokensData;
    //   })
    //   .addCase(fetchAllTokens.rejected, (state, action) => {
    //     state.tokens.status = "failed";
    //     state.tokens.error = action.error.message;
    //   })
  },
});

// export const selectUserOrders = (state) => state.hub.userOrders;

// Action creators are generated for each case reducer function
export const {} = hub.actions;

export default hub.reducer;
