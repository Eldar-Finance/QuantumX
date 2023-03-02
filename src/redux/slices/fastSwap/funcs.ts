/* eslint-disable camelcase */
import { Address, AddressValue, BytesValue } from "@multiversx/sdk-core/out";
import { createAsyncThunk, current } from "@reduxjs/toolkit";
import { toknesID } from "api/net.config";
import { getTokens } from "api/rest/elrondApi/accounts";
import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import { getOffers } from "api/rest/others/Jex";
import { scQuery } from "api/sc/queries";
import { fastp2pSwapWsp, jexSwapWsp } from "api/sc/sc";
import egldLogo from "assets/logos/egld.svg";
import BigNumber from "bignumber.js";
import { formatPrecision } from "utils/functions/formatBalance";

export const fetchAllTokens = createAsyncThunk(
  "fastSwap/fetchAllTokens",
  async (allowedTokens: string[]) => {
    const tokens = await getFromAllTokens({
      identifiers: allowedTokens.join(","),
    });
    return {
      allTokensData: [EgldToken, ...tokens.data],
    };
  }
);
export const fetchBalances = createAsyncThunk(
  "fastSwap/fetchBalances",
  async ({ address, balances }: { address: string; balances: any }) => {
    const responseBalances = await getTokens(address);
    const tokensBalances = [
      ...responseBalances.data,
      {
        identifier: "EGLD",
        name: "EGLD",
        ticker: "EGLD",
        balance: balances?.egld,
      },
      {
        identifier: "LKMEX",
        name: "LKMEX",
        ticker: "LKMEX",
        balance: balances?.lkmex,
      },
    ];
    return {
      balancesData: tokensBalances,
    };
  }
);

export const fetchOffers = createAsyncThunk(
  "fastSwap/fetchOffers",
  async ({
    token_a_identifier,
    token_b_identifier,
  }: {
    token_a_identifier: string;
    token_b_identifier: string;
  }) => {
    const responseBalances = await getOffers({
      token_a_identifier,
      token_b_identifier,
    });

    const data = responseBalances.data;

    return data;
  }
);

export const fetchVolume = createAsyncThunk(
  "fastSwap/fetchVolume",
  async () => {
    const response = await scQuery(fastp2pSwapWsp, "getTotalVolume");
    const { firstValue } = response;
    const data = firstValue.valueOf().map((struct) => {
      return {
        tokenI: struct.field0,
        amount: struct.field1.toNumber(),
      };
    });

    return data;
  }
);
export const fetchEarnersInfo = createAsyncThunk(
  "fastSwap/fetchEarnersInfo",
  async () => {
    const response = await scQuery(fastp2pSwapWsp, "getEarnersInfo");
    const { firstValue } = response;
    const data = firstValue.valueOf().map((struct) => {
      return {
        name: struct.field0,
        address: struct.field1.bech32(),
        percent: struct.field2.toNumber() / 100,
      };
    });

    return data;
  }
);
export const fetchAllowedTokens = createAsyncThunk(
  "fastSwap/fetchAllowedTokens",
  async () => {
    const response = await scQuery(fastp2pSwapWsp, "getAllowedTokens");
    const { firstValue } = response;
    const data = firstValue.valueOf();
    return [...data, toknesID.wegld];
  }
);
export const fetchFeesInfo = createAsyncThunk(
  "fastSwap/fetchFeesInfo",
  async () => {
    const response = await scQuery(fastp2pSwapWsp, "getFeesInfo");
    const { firstValue } = response;
    const data = firstValue.valueOf().map((struct) => {
      return {
        category: struct.field0,
        fee: struct.field1.toNumber() / 100,
        field: "0",
      };
    });
    return data;
  }
);
export const fetchClaimableTokens = createAsyncThunk(
  "fastSwap/fetchClaimableTokens",
  async ({
    allowedTokens,
    address,
  }: {
    allowedTokens: string[];
    address: string;
  }) => {
    const resD = await Promise.all(
      allowedTokens.map((tokenI) => {
        return scQuery(fastp2pSwapWsp, "getClaimable", [
          new AddressValue(new Address(address)),
          BytesValue.fromUTF8(tokenI),
        ]);
      })
    );

    const data = resD.map((res, i) => {
      return {
        tokenI: allowedTokens[i],
        amount: res.firstValue.valueOf().toNumber(),
      };
    });
    return data;
  }
);
export const fetchDefaultFeeA = createAsyncThunk(
  "fastSwap/fetchDefaultFeeA",
  async () => {
    const res = await scQuery(jexSwapWsp, "getDefaultFeesTokenA");
    const data = res.firstValue.valueOf().toNumber();
    return data / 10;
  }
);

export const EgldToken = {
  identifier: "EGLD",
  name: "EGLD",
  ticker: "EGLD",
  decimals: 18,
  assets: {
    description: "EGLD",
    static: egldLogo,
  },
};

export const getTokenBalance = (tokenBalances, tokenName = "") => {
  let tokenBalance = null;
  tokenBalances.forEach((tBalance) => {
    if (tokenName === tBalance.name) {
      tokenBalance = tBalance;
    }
  });

  return tokenBalance;
};

export const coreSwap = (state, token1Amount) => {
  if (token1Amount !== null && token1Amount > 0) {
    // set toToken value
    if (state.offers.data.length > 0 && token1Amount) {
      const orders = current(state.offers.data);

      let start = orders[0].token_b_human_amount;
      let totalOders = 0;
      const userOders = [];
      for (let index = 1; index < orders.length; index++) {
        const order = orders[index];

        if (token1Amount <= start) {
          break;
        } else {
          start = start + order.token_b_human_amount;
          totalOders++;
        }
      }

      let filledAmounts = 0;
      let partialAmounts = 0;
      let realPartialAmount = 0;

      const jexFees = state.jexFee || state.defaultFeeA.data;

      const jexAmountMultiplier = new BigNumber(100)
        .minus(jexFees)
        .dividedBy(100)
        .toNumber();
      if (totalOders === 0) {
        partialAmounts = new BigNumber(token1Amount)
          .multipliedBy(orders[0].token_a_human_amount)
          .dividedBy(orders[0].token_b_human_amount)
          .toNumber();

        const percent = formatPrecision(
          new BigNumber(partialAmounts)
            .multipliedBy(100)
            .dividedBy(orders[totalOders].token_a_human_amount)
            .toNumber(),
          1
        );

        if (percent >= 1) {
          realPartialAmount =
            realPartialAmount +
            new BigNumber(percent)
              .multipliedBy(jexAmountMultiplier)
              .multipliedBy(orders[totalOders].token_a_human_amount)
              .dividedBy(100)
              .toNumber();
          userOders.push({
            fromToken: current(state.fromToken),
            spend: token1Amount,
            spendBigNumber: new BigNumber(percent)
              .multipliedBy(orders[totalOders].token_b_amount)
              .dividedBy(100)
              .toString(),
            toToken: current(state.toToken),
            receive: new BigNumber(percent)
              .multipliedBy(jexAmountMultiplier)
              .multipliedBy(orders[totalOders].token_a_human_amount)
              .dividedBy(100)
              .toString(),
            receiveBigNumber: new BigNumber(percent)
              .multipliedBy(jexAmountMultiplier)
              .multipliedBy(orders[totalOders].token_a_amount)
              .dividedBy(100)
              .toString(),
            orderId: orders[totalOders].id,
            type: "fill_offer_partial",
            percent: percent,
          });
        }
      } else {
        for (let index = 0; index < totalOders; index++) {
          const order = orders[index];
          if (token1Amount > order.token_b_human_amount) {
            partialAmounts = partialAmounts + order.token_b_human_amount;

            filledAmounts = filledAmounts + order.token_a_human_amount;

            userOders.push({
              fromToken: current(state.fromToken),
              spend: order.token_b_human_amount,
              spendBigNumber: order.token_b_amount,
              toToken: current(state.toToken),
              receive: order.token_a_human_amount,
              receiveBigNumber: new BigNumber(order.token_a_amount)
                .multipliedBy(jexAmountMultiplier)
                .toString(),
              orderId: order.id,
              type: "fill_offer",
              percent: 100,
            });

            start = start - order.token_b_human_amount;
            token1Amount = new BigNumber(token1Amount)
              .minus(order.token_b_human_amount)
              .toNumber();
          }
        }
        if (orders[totalOders]) {
          partialAmounts = token1Amount;

          const percent = formatPrecision(
            new BigNumber(partialAmounts)
              .multipliedBy(100)
              .dividedBy(orders[totalOders].token_b_human_amount)
              .toNumber(),
            1
          );

          if (percent >= 1) {
            realPartialAmount =
              realPartialAmount +
              new BigNumber(percent)
                .multipliedBy(jexAmountMultiplier)
                .multipliedBy(orders[totalOders].token_a_human_amount)
                .dividedBy(100)
                .toNumber();

            userOders.push({
              fromToken: current(state.fromToken),
              spend: new BigNumber(percent)
                .multipliedBy(orders[totalOders].token_b_human_amount)
                .dividedBy(100)
                .toString(),
              spendBigNumber: new BigNumber(percent)
                .multipliedBy(orders[totalOders].token_b_amount)
                .dividedBy(100)
                .toString(),
              toToken: current(state.toToken),
              receive: new BigNumber(percent)
                .multipliedBy(orders[totalOders].token_a_human_amount)
                .dividedBy(100)
                .multipliedBy(jexAmountMultiplier)
                .toString(),
              receiveBigNumber: new BigNumber(percent)
                .multipliedBy(orders[totalOders].token_a_amount)
                .dividedBy(100)
                .multipliedBy(jexAmountMultiplier)
                .toString(),
              orderId: orders[totalOders].id,
              type: "fill_offer_partial",
              percent: percent,
            });
          }
        }
      }

      const token2Amount = filledAmounts + realPartialAmount;
      state.toToken.value = token2Amount;
      state.userOrders = userOders;

      let averageSum = 0;
      userOders.forEach((order) => {
        averageSum += order.receive / order.spend;
      });
      state.averageRate = averageSum / userOders.length;
    }
  } else {
    state.toToken.value = null;
    state.userOrders = [];
  }
};
