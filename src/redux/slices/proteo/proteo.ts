import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchApr,
  fetchEliteWallets,
  fetchGeneralInfo,
  fetchInBurn,
  fetchIndex,
  fetchListOfBlacklisted,
  fetchPrice,
  fetchRanking,
  fetchSupply,
  fetchTotalDeposited,
  fetchUserInfo,
  fetchUserProteo,
  fetchWithdrawInfo,
} from "./funcs";

export const reducerName = "proteo";

const initialState = {
  eliteWallets: {
    status: "idle",
    data: 0,
    error: "",
  },
  price: {
    status: "idle",
    data: [
      {
        maiar: 0,
        jex: 0,
        jungle: 0,
      },
    ],
    error: "",
  },
  index: {
    status: "idle",
    data: 0,
    error: "",
  },

  supply: {
    status: "idle",
    data: {
      supply: "0",
      circulatingSupply: "0",
      minted: "0",
      burnt: "0",
      initialMinted: "0",
    },
    error: "",
  },
  inBurnWallet: {
    status: "idle",
    data: {
      burned: {
        name: "BURNED",
        balance: "0",
        value: "0",
      },
      insideBurnWallet: [],
    },
    error: "",
  },
  userProteo: {
    status: "idle",
    data: {
      identifier: "SPROTEO-c2dffe",
      name: "sPROTEO",
      ticker: "SPROTEO",
      owner: "erd1cs6xvwkuhezpzce9u7j8pkgfkm76cwwua8wyksw90xdjwf4cznyq0d3f75",
      minted: "0",
      burnt: "0",
      initialMinted: "0",
      decimals: 18,
      isPaused: false,
      assets: {
        website: "https://proteodefi.com",
        description: "sPROTEO (staked-PROTEO)",
        social: {
          twitter: "https://twitter.com/proteodefi",
          whitepaper: "https://docs.proteodefi.com/tokenomics/sproteo-token",
        },
        status: "active",
        pngUrl: "https://media.elrond.com/tokens/asset/SPROTEO-c2dffe/logo.png",
        svgUrl: "https://media.elrond.com/tokens/asset/SPROTEO-c2dffe/logo.svg",
      },
      transactions: 0,
      accounts: 0,
      canUpgrade: true,
      canMint: true,
      canBurn: true,
      canChangeOwner: true,
      canPause: true,
      canFreeze: true,
      canWipe: false,
      supply: "0",
      circulatingSupply: "0",
      balance: "0",
    },
    error: "",
  },
  userProteoLockedInElite: {
    status: "idle",
    data: 0,
    error: "",
  },
  ranking: {
    status: "idle",
    data: [],
    error: "",
  },
  totalDeposited: {
    status: "idle",
    data: 0,
    error: "",
  },
  apr: {
    status: "idle",
    data: 0,
    error: "",
  },

  // dapp
  userInfoApp: {
    status: "idle",
    data: [],
    error: "",
  },
  generalInfoApp: {
    status: "idle",
    data: null,
    error: "",
  },
  withDrawInfo: {
    status: "idle",
    data: [],
    error: "",
  },
  blackList: {
    status: "idle",
    data: [],
    error: "",
  },

  totalTvlInEldarFarms: [],
  tvlType: "",
  sProteoEarned: [],
  dualsEarned: [],
};

export const proteo = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    resetfetchEliteWallets: (state) => {
      state.eliteWallets.status = "idle";
    },
    resetfetchPrice: (state) => {
      state.price.status = "idle";
    },
    resetfetchIndex: (state) => {
      state.price.status = "idle";
    },
    resetfetchSupply: (state) => {
      state.supply.status = "idle";
    },
    resetfetchinBurnWallet: (state) => {
      state.inBurnWallet.status = "idle";
    },
    resetfetchUserProteo: (state) => {
      state.userProteo.status = "idle";
    },
    resetfetchRanking: (state) => {
      state.ranking.status = "idle";
    },
    resetfetchTotalDeposited: (state) => {
      state.ranking.status = "idle";
    },
    resetfetchApr: (state) => {
      state.apr.status = "idle";
    },
    resetfetchUserInfo: (state) => {
      state.userInfoApp.status = "idle";
    },
    resetfetchGeneralInfo: (state) => {
      state.generalInfoApp.status = "idle";
    },
    resetfetchUserProteoLockedInElite: (state) => {
      state.userProteoLockedInElite.status = "idle";
    },
    resetfetchWithdrawInfo: (state) => {
      state.withDrawInfo.status = "idle";
    },
    resetfetchListOfBlacklisted: (state) => {
      state.blackList.status = "idle";
    },
    addTvlInEldarFarm: (
      state,
      action: PayloadAction<{
        id: string;
        balance: number;
        type: "pool" | "farm";
      }>
    ) => {
      if (state.tvlType !== action.payload.type) {
        state.totalTvlInEldarFarms = [];
      }
      if (
        state.totalTvlInEldarFarms.findIndex(
          (tvl) => tvl.id === action.payload.id
        ) === -1
      ) {
        if (action.payload.balance !== 0) {
          state.tvlType = action.payload.type;
          state.totalTvlInEldarFarms = [
            ...state.totalTvlInEldarFarms,
            action.payload,
          ];
        }
      }
    },

    addsProteoEarned: (state, action) => {
      if (
        state.sProteoEarned.findIndex(
          (token) => token.id === action.payload.id
        ) === -1
      ) {
        if (action.payload.balance !== 0) {
          state.sProteoEarned = [...state.sProteoEarned, action.payload];
        }
      }
    },
    addDualEarned: (state, action) => {
      if (
        state.dualsEarned.findIndex(
          (token) => token.id === action.payload.id
        ) === -1
      ) {
        if (action.payload.balance !== 0) {
          state.dualsEarned = [...state.dualsEarned, action.payload];
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      // fetchEliteWallets
      .addCase(fetchEliteWallets.pending, (state) => {
        state.eliteWallets.status = "loading";
      })
      .addCase(fetchEliteWallets.fulfilled, (state, action) => {
        state.eliteWallets.status = "succeeded";
        state.eliteWallets.data = action.payload;
      })
      .addCase(fetchEliteWallets.rejected, (state, action) => {
        state.eliteWallets.status = "failed";
        state.eliteWallets.error = action.error.message;
      })
      // fetchPrice
      .addCase(fetchPrice.pending, (state) => {
        state.price.status = "loading";
      })
      .addCase(fetchPrice.fulfilled, (state, action) => {
        state.price.status = "succeeded";
        state.price.data = action.payload;
      })
      .addCase(fetchPrice.rejected, (state, action) => {
        state.price.status = "failed";
        state.price.error = action.error.message;
      })
      // fetchIndex
      .addCase(fetchIndex.pending, (state) => {
        state.index.status = "loading";
      })
      .addCase(fetchIndex.fulfilled, (state, action) => {
        state.index.status = "succeeded";
        state.index.data = action.payload;
      })
      .addCase(fetchIndex.rejected, (state, action) => {
        state.index.status = "failed";
        state.index.error = action.error.message;
      })
      // fetchSupply
      .addCase(fetchSupply.pending, (state) => {
        state.supply.status = "loading";
      })
      .addCase(fetchSupply.fulfilled, (state, action) => {
        state.supply.status = "succeeded";
        state.supply.data = action.payload;
      })
      .addCase(fetchSupply.rejected, (state, action) => {
        state.supply.status = "failed";
        state.supply.error = action.error.message;
      })
      // fetchInBurn
      .addCase(fetchInBurn.pending, (state) => {
        state.inBurnWallet.status = "loading";
      })
      .addCase(fetchInBurn.fulfilled, (state, action) => {
        state.inBurnWallet.status = "succeeded";
        const burned = action.payload.find((e) => e.name === "BURNED");
        const insideBurnWallet = action.payload.filter(
          (e) => e.name !== "BURNED"
        );

        state.inBurnWallet.data = {
          burned: burned || {
            name: "BURNED",
            balance: "0",
            value: "0",
          },
          insideBurnWallet: insideBurnWallet,
        };
      })
      .addCase(fetchInBurn.rejected, (state, action) => {
        state.inBurnWallet.status = "failed";
        state.inBurnWallet.error = action.error.message;
      })
      // fetchUserProteo
      .addCase(fetchUserProteo.pending, (state) => {
        state.userProteo.status = "loading";
      })
      .addCase(fetchUserProteo.fulfilled, (state, action) => {
        state.userProteo.status = "succeeded";
        state.userProteo.data = action.payload;
      })
      .addCase(fetchUserProteo.rejected, (state, action) => {
        state.userProteo.status = "failed";
        state.userProteo.error = action.error.message;
      })
      // fetchUserProteoLockedInElite
      /*       .addCase(fetchUserProteoLockedInElite.pending, (state) => {
        state.userProteoLockedInElite.status = "loading";
      })
      .addCase(fetchUserProteoLockedInElite.fulfilled, (state, action) => {
        state.userProteoLockedInElite.status = "succeeded";
        const data = action.payload;
        let sProteoInElite = 0;
        data.forEach((tx) => {
          if (tx?.action?.arguments?.transfers) {
            tx.action.arguments.transfers.forEach((t) => {
              sProteoInElite += Number(t.value);
            });
          }
        });

        state.userProteoLockedInElite.data = sProteoInElite;
      })
      .addCase(fetchUserProteoLockedInElite.rejected, (state, action) => {
        state.userProteoLockedInElite.status = "failed";
        state.userProteoLockedInElite.error = action.error.message;
      }) */
      // fetchRanking
      .addCase(fetchRanking.pending, (state) => {
        state.ranking.status = "loading";
      })
      .addCase(fetchRanking.fulfilled, (state, action) => {
        state.ranking.status = "succeeded";
        state.ranking.data = action.payload.ranking;
        state.userProteoLockedInElite.data = action.payload.sProteoInElite || 0;
      })
      .addCase(fetchRanking.rejected, (state, action) => {
        state.ranking.status = "failed";
        state.ranking.error = action.error.message;
      })
      // fetchTotalDeposited
      .addCase(fetchTotalDeposited.pending, (state) => {
        state.totalDeposited.status = "loading";
      })
      .addCase(fetchTotalDeposited.fulfilled, (state, action) => {
        state.totalDeposited.status = "succeeded";
        state.totalDeposited.data = action.payload;
      })
      .addCase(fetchTotalDeposited.rejected, (state, action) => {
        state.totalDeposited.status = "failed";
        state.totalDeposited.error = action.error.message;
      })
      // fetchApr
      .addCase(fetchApr.pending, (state) => {
        state.apr.status = "loading";
      })
      .addCase(fetchApr.fulfilled, (state, action) => {
        state.apr.status = "succeeded";
        state.apr.data = action.payload;
      })
      .addCase(fetchApr.rejected, (state, action) => {
        state.apr.status = "failed";
        state.apr.error = action.error.message;
      })
      // fetchUserInfo
      .addCase(fetchUserInfo.pending, (state) => {
        state.userInfoApp.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.userInfoApp.status = "succeeded";
        state.userInfoApp.data = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.userInfoApp.status = "failed";
        state.userInfoApp.error = action.error.message;
      })
      // fetchGeneralInfo
      .addCase(fetchGeneralInfo.pending, (state) => {
        state.generalInfoApp.status = "loading";
      })
      .addCase(fetchGeneralInfo.fulfilled, (state, action) => {
        state.generalInfoApp.status = "succeeded";
        state.generalInfoApp.data = action.payload;
      })
      .addCase(fetchGeneralInfo.rejected, (state, action) => {
        state.generalInfoApp.status = "failed";
        state.generalInfoApp.error = action.error.message;
      })
      // fetchWithdrawInfo
      .addCase(fetchWithdrawInfo.pending, (state) => {
        state.withDrawInfo.status = "loading";
      })
      .addCase(fetchWithdrawInfo.fulfilled, (state, action) => {
        state.withDrawInfo.status = "succeeded";
        state.withDrawInfo.data = action.payload;
      })
      .addCase(fetchWithdrawInfo.rejected, (state, action) => {
        state.withDrawInfo.status = "failed";
        state.withDrawInfo.error = action.error.message;
      })
      // fetchListOfBlacklisted
      .addCase(fetchListOfBlacklisted.pending, (state) => {
        state.blackList.status = "loading";
      })
      .addCase(fetchListOfBlacklisted.fulfilled, (state, action) => {
        state.blackList.status = "succeeded";
        state.blackList.data = action.payload;
      })
      .addCase(fetchListOfBlacklisted.rejected, (state, action) => {
        state.blackList.status = "failed";
        state.blackList.error = action.error.message;
      });
  },
});

export const selectBettingPoolInfo = (state) => state.bettingPool.poolInfo;
export const selectBettingPoolStatsInfo = (state) =>
  state.bettingPool.statsInfo;

// Action creators are generated for each case reducer function
export const {
  resetfetchEliteWallets,
  resetfetchPrice,
  resetfetchIndex,
  resetfetchSupply,
  resetfetchinBurnWallet,
  resetfetchUserProteo,
  resetfetchUserProteoLockedInElite,
  resetfetchRanking,
  resetfetchTotalDeposited,
  resetfetchApr,
  resetfetchUserInfo,
  resetfetchGeneralInfo,
  addTvlInEldarFarm,
  addsProteoEarned,
  resetfetchWithdrawInfo,
  resetfetchListOfBlacklisted,
  addDualEarned,
} = proteo.actions;

export default proteo.reducer;
