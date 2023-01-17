import { createSlice } from "@reduxjs/toolkit";

import {
  fetchRetrieveNrOfSftsPerStatus,
  fetchSftsRewards,
  fetcRetrieveStakingStats,
} from "./funcs";

export const reducerName = "eldarSfts";

const initialState = {
  eldarSftsWithStatus: {
    status: "idle",
    data: {
      InStakingPeriod: [],
      InUnlockingPeriod: [],
      Claimable: [],
      Claimed: [],
    },
    error: "",
  },
  stakingNumbers: {
    status: "idle",
    data: {
      totalStaked: 0,
      usersStaking: 0,
      timeToRetriveSft: 0,
    },
    error: "",
  },
  stfsRewards: {
    status: "idle",
    data: {
      claimable: [],
      claimed: [],
      totalRewards: [],
    },
    error: "",
  },
  isStakerUser: false,
  isUserSftsInUnlocking: false,
  isSftsClaimable: false,
  isLkmexRewards: false,
};

export const eldarSfts = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    resetEldarSftsWithStatus: (state) => {
      state.eldarSftsWithStatus.status = "idle";
    },
    resetStakingNumbers: (state) => {
      state.stakingNumbers.status = "idle";
    },
    resetTotalStfsRewards: (state) => {
      state.stfsRewards.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      // fetchRetrieveNrOfSftsPerStatus
      .addCase(fetchRetrieveNrOfSftsPerStatus.pending, (state) => {
        state.eldarSftsWithStatus.status = "loading";
      })
      .addCase(fetchRetrieveNrOfSftsPerStatus.fulfilled, (state, action) => {
        state.eldarSftsWithStatus.status = "succeeded";

        const data = action.payload;

        const InStakingPeriod = data.filter(
          (item) => item.status === "InStakingPeriod"
        );
        const InUnlockingPeriod = data.filter(
          (item) => item.status === "InUnlockingPeriod"
        );
        const Claimable = data.filter((item) => item.status === "Claimable");
        const Claimed = data.filter((item) => item.status === "Claimed");

        state.eldarSftsWithStatus.data.InStakingPeriod = InStakingPeriod;

        state.eldarSftsWithStatus.data.InUnlockingPeriod = InUnlockingPeriod;

        state.eldarSftsWithStatus.data.Claimable = Claimable;

        state.eldarSftsWithStatus.data.Claimed = Claimed;

        // determinate if the amount of InStakingPeriod object is not 0
        const isStakerUser = InStakingPeriod.reduce(
          (acc, current) => acc || current.amount > 0,
          false
        );

        state.isStakerUser = isStakerUser;

        const isInUnlockingPeriod = InUnlockingPeriod.reduce(
          (acc, current) => acc || current.amount > 0,
          false
        );

        state.isUserSftsInUnlocking = isInUnlockingPeriod;

        const isSftsClaimable = Claimable.reduce(
          (acc, current) => acc || current.amount > 0,
          false
        );

        state.isSftsClaimable = isSftsClaimable;
      })
      .addCase(fetchRetrieveNrOfSftsPerStatus.rejected, (state, action) => {
        state.eldarSftsWithStatus.status = "failed";
        state.eldarSftsWithStatus.error = action.error.message;
      })
      // fetcRetrieveStakingStats
      .addCase(fetcRetrieveStakingStats.pending, (state) => {
        state.stakingNumbers.status = "loading";
      })
      .addCase(fetcRetrieveStakingStats.fulfilled, (state, action) => {
        state.stakingNumbers.status = "succeeded";

        state.stakingNumbers.data.totalStaked = action.payload[0];
        state.stakingNumbers.data.usersStaking = action.payload[1];
        state.stakingNumbers.data.timeToRetriveSft = action.payload[2];
      })
      .addCase(fetcRetrieveStakingStats.rejected, (state, action) => {
        state.stakingNumbers.status = "failed";
        state.stakingNumbers.error = action.error.message;
      })
      // fetchSftsRewards
      .addCase(fetchSftsRewards.pending, (state) => {
        state.stfsRewards.status = "loading";
      })
      .addCase(fetchSftsRewards.fulfilled, (state, action) => {
        state.stfsRewards.status = "succeeded";
        state.stfsRewards.data.claimable = action.payload[0];
        state.stfsRewards.data.claimed = action.payload[1];
        state.stfsRewards.data.totalRewards = action.payload[2];

        if (action.payload[0]) {
          state.isLkmexRewards = action.payload[0].reduce(
            (acc, current) => acc || current.value > 0,
            false
          );
        }
      })
      .addCase(fetchSftsRewards.rejected, (state, action) => {
        state.stfsRewards.status = "failed";
        state.stfsRewards.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  resetEldarSftsWithStatus,
  resetTotalStfsRewards,
  resetStakingNumbers,
} = eldarSfts.actions;

export default eldarSfts.reducer;
