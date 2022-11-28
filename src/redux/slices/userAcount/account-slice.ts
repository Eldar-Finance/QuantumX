import { createSlice } from "@reduxjs/toolkit";

import { getRealBalance } from "utils/functions/formatBalance";

import {
  fetcEldarTransactions,
  fetchEgld,
  fetchEgldByLkmex,
  fetchEldarNfts,
  fetchListedTokens,
  fetchMexPairs,
  fetchNfts,
  fetchTokens,
  fetchUserAllTokens,
  fetcTransactionsToEldar,
} from "./funcs";

export const reducerName = "userAccount";

const initialState = {
  mexPairs: {
    status: "idle",
    data: [],
    error: "",
  },
  tableData: {
    status: "idle",
    data: [],
    allTokens: [],
    error: "",
  },
  allListedTokens: {
    status: "idle",
    data: [],
    error: "",
  },
  egldBalance: {
    status: "idle",
    data: {},
    error: "",
  },
  nfts: {
    status: "idle",
    data: [],
    error: "",
  },
  eldarTransactions: {
    status: "idle",
    data: [],
    error: "",
  },
  transactionsToEldar: {
    status: "idle",
    data: [],
    error: "",
  },
  eldarNfts: {
    status: "idle",
    data: [],
    error: "",
  },
  allTokens: {
    status: "idle",
    data: [],
    error: "",
  },
  egldByLkmex: {
    status: "idle",
    data: 0,
    error: "",
  },
  shareInEldar: {
    amount: 0,
    amountPercent: 0,
  },
  userFarms: {
    lkmexLkmex: {
      status: "idle",
      data: 0,
      error: "",
    },
    lkmexMex: {
      status: "idle",
      data: 0,
      error: "",
    },
    mexMex: {
      status: "idle",
      data: 0,
      error: "",
    },
    mexLkmex: {
      status: "idle",
      data: 0,
      error: "",
    },
  },
  topNftCollection: {
    status: "idle",
    data: [],
    error: "",
  },
  userHaveShared: true,

  totalBalance: 0,
  connectedAddress: "",
  isAdmin: false,
};

export const userAccount = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setAddress: (state, action) => {
      // if (addressAdmin.find((addr) => addr === action.payload)) {
      //   state.isAdmin = true;
      // } else {
      //   state.isAdmin = false;
      // }
      state.connectedAddress = action.payload;
    },
    setTotalBalance: (state, action) => {
      state.totalBalance = action.payload;
    },
    resetFetchMexPairs: (state) => {
      state.mexPairs.status = "idle";
    },
    resetTableDataStatus: (state) => {
      state.tableData.status = "idle";
    },
    resetEgldBalance: (state) => {
      state.egldBalance.status = "idle";
    },
    resetNfts: (state, action) => {
      state.nfts.status = "idle";
    },
    resetEldarTransactions: (state) => {
      state.eldarTransactions.status = "idle";
    },
    resetTransactionsToEldar: (state) => {
      state.transactionsToEldar.status = "idle";
    },
    resetEldarNfts: (state) => {
      state.eldarNfts.status = "idle";
    },
    resetAllTokens: (state) => {
      state.allTokens.status = "idle";
    },
    resetfetchListedTokens: (state) => {
      state.allListedTokens.status = "idle";
    },
    restEgldByLkmex: (state) => {
      state.egldByLkmex.status = "idle";
    },
    resetfetchLkmexLkmexFarms: (state) => {
      state.userFarms.lkmexLkmex.status = "idle";
    },
    resetfetchLkmexMexFarms: (state) => {
      state.userFarms.lkmexMex.status = "idle";
    },
    resetfetchMexMexFarms: (state) => {
      state.userFarms.mexMex.status = "idle";
    },
    resetfetchMexLkmexFarms: (state) => {
      state.userFarms.mexLkmex.status = "idle";
    },
    resetfetchTopNftCollection: (state) => {
      state.topNftCollection.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      // fetchTokens
      .addCase(fetchTokens.pending, (state) => {
        state.tableData.status = "loading";
      })
      .addCase(fetchTokens.fulfilled, (state, action) => {
        state.tableData.status = "succeeded";

        const onlySvgData = action.payload.filter((token) => {
          if (token.assets?.svgUrl) {
            return true;
          } else {
            return false;
          }
        });
        state.tableData.data = onlySvgData;
        state.tableData.allTokens = action.payload;
      })
      .addCase(fetchTokens.rejected, (state, action) => {
        state.tableData.status = "failed";
        state.tableData.error = action.error.message;
      })
      // fetchListedTokens
      .addCase(fetchListedTokens.pending, (state) => {
        state.allListedTokens.status = "loading";
      })
      .addCase(fetchListedTokens.fulfilled, (state, action) => {
        state.allListedTokens.status = "succeeded";
        state.allListedTokens.data = action.payload;
      })
      .addCase(fetchListedTokens.rejected, (state, action) => {
        state.allListedTokens.status = "failed";
        state.allListedTokens.error = action.error.message;
      })
      // fetchUserAllTokens
      .addCase(fetchUserAllTokens.pending, (state) => {
        state.allTokens.status = "loading";
      })
      .addCase(fetchUserAllTokens.fulfilled, (state, action) => {
        state.allTokens.status = "succeeded";
        state.allTokens.data = action.payload;
      })
      .addCase(fetchUserAllTokens.rejected, (state, action) => {
        state.allTokens.status = "failed";
        state.allTokens.error = action.error.message;
      })
      // fetchMexPairs
      .addCase(fetchMexPairs.pending, (state) => {
        state.mexPairs.status = "loading";
      })
      .addCase(fetchMexPairs.fulfilled, (state, action) => {
        state.mexPairs.status = "succeeded";
        state.mexPairs.data = action.payload;
      })
      .addCase(fetchMexPairs.rejected, (state, action) => {
        state.mexPairs.status = "failed";
        state.mexPairs.error = action.error.message;
      })
      // fetchEgldBalance
      .addCase(fetchEgld.pending, (state) => {
        state.egldBalance.status = "loading";
      })
      .addCase(fetchEgld.fulfilled, (state, action) => {
        state.egldBalance.status = "succeeded";
        state.egldBalance.data = action.payload;
      })
      .addCase(fetchEgld.rejected, (state, action) => {
        state.egldBalance.status = "failed";
        state.egldBalance.error = action.error.message;
      })
      // fetchNfts
      .addCase(fetchNfts.pending, (state) => {
        state.nfts.status = "loading";
      })
      .addCase(fetchNfts.fulfilled, (state, action) => {
        state.nfts.status = "succeeded";
        state.nfts.data = action.payload;
      })
      .addCase(fetchNfts.rejected, (state, action) => {
        state.nfts.status = "failed";
        state.nfts.error = action.error.message;
      })
      // fetcEldarTransactions
      .addCase(fetcEldarTransactions.pending, (state) => {
        state.eldarTransactions.status = "loading";
      })
      .addCase(fetcEldarTransactions.fulfilled, (state, action) => {
        state.eldarTransactions.status = "succeeded";

        const { allTransactions, connectedAddres } = action.payload;

        let totalLockedMex = 0;
        allTransactions.forEach((transaction) => {
          if (transaction?.action?.arguments?.transfers) {
            transaction.action.arguments.transfers.forEach((tranfer) => {
              if (tranfer.name === "LockedMEX") {
                if (
                  transaction.action.arguments.receiver === connectedAddres
                  // transaction.action.arguments.receiver === "erd10h8z57dh7mk9tfyz87h8uu9mycs0fexxufe03ze3z2c6jvj3hkqqgh7qql"
                ) {
                  totalLockedMex += Number(tranfer.value);
                }
              }
            });
          }
        });
        const balanceUserRecived = getRealBalance(totalLockedMex, 18);

        // state.totalUserRecived = balanceUserRecived;
        state.eldarTransactions.data = allTransactions;
      })
      .addCase(fetcEldarTransactions.rejected, (state, action) => {
        state.eldarTransactions.status = "failed";
        state.eldarTransactions.error = action.error.message;
      })
      // fetcTransactionsToEldar
      .addCase(fetcTransactionsToEldar.pending, (state) => {
        state.transactionsToEldar.status = "loading";
      })
      .addCase(fetcTransactionsToEldar.fulfilled, (state, action) => {
        state.transactionsToEldar.status = "succeeded";

        const { transactionsToEldar, connectedAddres } = action.payload;

        let totalSharedToEldar = 0;
        let userSharedToEldar = 0;

        transactionsToEldar.forEach((transaction) => {
          if (transaction.action.arguments) {
            transaction.action.arguments.transfers.forEach((transfer) => {
              const amount = Number(
                getRealBalance(Number(transfer.value), 18).valueOf()
              );
              totalSharedToEldar += amount;
              if (
                transaction.sender === connectedAddres
                // transaction.sender ===
                // "erd10h8z57dh7mk9tfyz87h8uu9mycs0fexxufe03ze3z2c6jvj3hkqqgh7qql"
              ) {
                userSharedToEldar += amount;
              }
            });
          }
        });

        state.shareInEldar = {
          amount: userSharedToEldar,
          amountPercent: !totalSharedToEldar
            ? 0
            : (userSharedToEldar / totalSharedToEldar) * 100,
        };
        state.transactionsToEldar.data = transactionsToEldar;

        /* set to true so investor and no investor have the same previlige otherwise set to allowUser */
        // state.isInvestor = true;

        /* Set this to true allow all users to access and set to allowUser to make only investor to enter */
        state.userHaveShared = true;
        // state.userHaveShared = allowUser;
      })
      .addCase(fetcTransactionsToEldar.rejected, (state, action) => {
        state.eldarTransactions.status = "failed";
        state.eldarTransactions.error = action.error.message;
      })
      // fetchEldarNfts
      .addCase(fetchEldarNfts.pending, (state) => {
        state.eldarNfts.status = "loading";
      })
      .addCase(fetchEldarNfts.fulfilled, (state, action) => {
        state.eldarNfts.status = "succeeded";
        state.eldarNfts.data = action.payload;
      })
      .addCase(fetchEldarNfts.rejected, (state, action) => {
        state.eldarNfts.status = "failed";
        state.eldarNfts.error = action.error.message;
      })
      // fetchEgldByLkmex
      .addCase(fetchEgldByLkmex.pending, (state) => {
        state.egldByLkmex.status = "loading";
      })
      .addCase(fetchEgldByLkmex.fulfilled, (state, action: any) => {
        state.egldByLkmex.status = "succeeded";
        state.egldByLkmex.data = action.payload;
      })
      .addCase(fetchEgldByLkmex.rejected, (state, action) => {
        state.egldByLkmex.status = "failed";
        state.egldByLkmex.error = action.error.message;
      });
    /*  // fetchLkmexLkmexFarms
      .addCase(fetchLkmexLkmexFarms.pending, (state) => {
        state.userFarms.lkmexLkmex.status = "loading";
      })
      .addCase(fetchLkmexLkmexFarms.fulfilled, (state, action) => {
        state.userFarms.lkmexLkmex.status = "succeeded";
        state.userFarms.lkmexLkmex.data = action.payload;
      })
      .addCase(fetchLkmexLkmexFarms.rejected, (state, action) => {
        state.userFarms.lkmexLkmex.status = "failed";
        state.userFarms.lkmexLkmex.error = action.error.message;
      })
      // fetchLkmexMexFarms
      .addCase(fetchLkmexMexFarms.pending, (state) => {
        state.userFarms.lkmexMex.status = "loading";
      })
      .addCase(fetchLkmexMexFarms.fulfilled, (state, action) => {
        state.userFarms.lkmexMex.status = "succeeded";
        state.userFarms.lkmexMex.data = action.payload;
      })
      .addCase(fetchLkmexMexFarms.rejected, (state, action) => {
        state.userFarms.lkmexMex.status = "failed";
        state.userFarms.lkmexMex.error = action.error.message;
      })
      // fetchMexMexFarms
      .addCase(fetchMexMexFarms.pending, (state) => {
        state.userFarms.mexMex.status = "loading";
      })
      .addCase(fetchMexMexFarms.fulfilled, (state, action) => {
        state.userFarms.mexMex.status = "succeeded";
        state.userFarms.mexMex.data = action.payload;
      })
      .addCase(fetchMexMexFarms.rejected, (state, action) => {
        state.userFarms.mexMex.status = "failed";
        state.userFarms.mexMex.error = action.error.message;
      })
      // fetchMexLkmexFarms
      .addCase(fetchMexLkmexFarms.pending, (state) => {
        state.userFarms.mexLkmex.status = "loading";
      })
      .addCase(fetchMexLkmexFarms.fulfilled, (state, action) => {
        state.userFarms.mexLkmex.status = "succeeded";
        state.userFarms.mexLkmex.data = action.payload;
      })
      .addCase(fetchMexLkmexFarms.rejected, (state, action) => {
        state.userFarms.mexLkmex.status = "failed";
        state.userFarms.mexLkmex.error = action.error.message;
      })
      // fetchTopNftCollection
      .addCase(fetchTopNftCollection.pending, (state) => {
        state.topNftCollection.status = "loading";
      })
      .addCase(fetchTopNftCollection.fulfilled, (state, action) => {
        state.topNftCollection.status = "succeeded";
        state.topNftCollection.data = action.payload;
      })
      .addCase(fetchTopNftCollection.rejected, (state, action) => {
        state.topNftCollection.status = "failed";
        state.topNftCollection.error = action.error.message;
      }); */
  },
});

export const selectUserAddress = (state) => state.userAccount.connectedAddress;
export const selectUserTokens = (state) => state.userAccount.tableData;
export const selectMexPairs = (state) => state.userAccount.mexPairs;
export const selectEgldBalance = (state) => state.userAccount.egldBalance.data;
export const selectMexPairsData = (state) => state.userAccount.mexPairs.data;
export const selectUserAccountData = (state) => state.userAccount.tableData;

// Action creators are generated for each case reducer function
export const {
  setAddress,
  setTotalBalance,
  resetTableDataStatus,
  resetEgldBalance,
  resetNfts,
  resetEldarTransactions,
  resetTransactionsToEldar,
  resetEldarNfts,
  resetFetchMexPairs,
  resetAllTokens,
  resetfetchListedTokens,
  restEgldByLkmex,
  resetfetchLkmexLkmexFarms,
  resetfetchLkmexMexFarms,
  resetfetchMexMexFarms,
  resetfetchMexLkmexFarms,
  resetfetchTopNftCollection,
} = userAccount.actions;

export default userAccount.reducer;
