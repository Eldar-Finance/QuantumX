import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllOffers = createAsyncThunk(
  "hub/fetchAllOffers",
  async () => {
    //   const response = await scQuery(fastp2pSwapWsp, "getAllOffers");
    //   const { firstValue } = response;

    return "data";
  }
);
