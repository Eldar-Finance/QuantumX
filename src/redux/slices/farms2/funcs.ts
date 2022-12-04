import { createAsyncThunk } from "@reduxjs/toolkit";
import { IScFarmItem } from "utils/types/sc.interface";

export const fetchAllFarms = createAsyncThunk(
  "farms2/fetchAllFarms",
  async () => {
    const allFarms: IScFarmItem[] = [];
    return allFarms;
  }
);
