/* eslint-disable quotes */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toknesID } from "api/net.config";
import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import { getOffers } from "api/rest/others/Jex";
import { getMaiarTokens } from "api/rest/others/MaiarTokens";
import { scQuery } from "api/sc/queries";
import { dcaWsp, fastp2pSwapWsp } from "api/sc/sc";
import axios from "axios";
import BigNumber from "bignumber.js";
import {
  executeFetch,
  waitToResetStatus,
} from "utils/functions/chacheReduxState";
import { formatPrecision } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import {
  EgldToken,
  hightRiskLkmexAvaragingData,
  lkmexAvaragingData,
  minimalLkmexAvaragingData,
} from "views/Dca/constants";
import {
  reducerName,
  resetFetcheTokens,
  resetFetchhightRiskTokens,
  resetFetchMinimalTokens,
  resetfetchwhiteListedTokens,
  resetfetcwhiteListedJexTokens,
} from "./dca-slice";

export const fetchLkmexAveragingTokens = createAsyncThunk(
  "lkmexAveraging/fetchLkmexAveragingTokens",
  async (dataTokens: any) => {
    const data = getDcaData(lkmexAvaragingData, dataTokens, resetFetcheTokens);
    return data;
  },
  {
    condition: (arg1, api) => executeFetch(arg1, api, reducerName, "tokens"),
  }
);
export const fetchMinimalTokens = createAsyncThunk(
  "lkmexAveraging/fetchMinimalTokens",
  async (dataTokens: any) => {
    const data = getDcaData(
      minimalLkmexAvaragingData,
      dataTokens,
      resetFetchMinimalTokens
    );

    return data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "minimalTokens"),
  }
);
export const fetchHightRiskTokens = createAsyncThunk(
  "lkmexAveraging/fetchHightRiskTokens",
  async (dataTokens: any) => {
    const data = getDcaData(
      hightRiskLkmexAvaragingData,
      dataTokens,
      resetFetchhightRiskTokens
    );

    return data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "hightRiskTokens"),
  }
);

export const fetchTotalVolumen = createAsyncThunk(
  "lkmexAveraging/fetchTotalVolumen",
  async () => {
    const res = await scQuery(dcaWsp, "getTotalVolume");
    const { firstValue } = res;
    return Number(firstValue);
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "totalVolume"),
  }
);
export const fetchwhiteListedTokens = createAsyncThunk(
  "lkmexAveraging/fetchwhiteListedTokens",
  async () => {
    const res = await scQuery(dcaWsp, "getTokenWhitelist");

    const { firstValue } = res;
    const portFolioData = firstValue.valueOf().map((identifier) => {
      if (identifier === "QWT-46ac01") {
        return {
          token: "QWT",
          baseName: "QoWatt",
          identifier: "QWT-46ac01",
          percent: 30,
          api: {
            url: "https://graph.maiar.exchange/graphql",
            method: "post",
            data: {
              query:
                '{  pairs(address: "erd1qqqqqqqqqqqqqpgq5fj4ttp8vylx8napuuruye5rewflqr542jpsv8tauj") {    price : firstTokenPrice  }}',
              variables: {},
            },
          },
        };
      }

      return {
        token: formatTokenI(identifier),
        baseName: formatTokenI(identifier),
        identifier: identifier,
        percent: 25,
      };
    });
    const data = await fetch(portFolioData, resetfetchwhiteListedTokens);

    return data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "whiteListedTokens"),
  }
);

export const fetchwhiteListedJexTokens = createAsyncThunk(
  "lkmexAveraging/fetchwhiteListedJexTokens",
  async () => {
    const response = await scQuery(fastp2pSwapWsp, "getAllowedTokens");
    const { firstValue } = response;
    const stringTokensArr = firstValue.valueOf();

    const tokenJexDetails = await getFromAllTokens({
      identifiers: stringTokensArr.join(","),
    });

    waitToResetStatus(resetfetcwhiteListedJexTokens);

    const data = tokenJexDetails.data;

    return data;
  },
  {
    condition: (arg1, api) =>
      executeFetch(arg1, api, reducerName, "whiteListedJexTokens"),
  }
);

export const setJexPairs = createAsyncThunk(
  "lkmexAveraging/setJexPairs",
  async (tokens: any[]) => {
    const percentsArr = getPercentArray(tokens.length);
    const resJexOrders = await Promise.all(
      tokens.map(async (token, i) => {
        const res = await getOffers({
          token_a_identifier: token.identifier,
          token_b_identifier: toknesID.wegld,
        });

        return {
          orders: res.data,
          toToken: { token: token },
          fromToken: { token: EgldToken },
          userOrders: [],
          percent: percentsArr[i],
          returnValue: 0,
          averageRate: 0,
        };
      })
    );
    return resJexOrders;
  }
);

export const fetchFeesInfo = createAsyncThunk(
  "lkmexAveraging/fetchFeesInfo",
  async () => {
    const response = await scQuery(dcaWsp, "getFeesInfo");
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

const fetch = async (portfolioData, resetState) => {
  const identifiers = portfolioData.map((token) => token.identifier);
  const stringIdentifiers = identifiers.join(",");
  const response = await getFromAllTokens({ identifiers: stringIdentifiers });

  waitToResetStatus(resetState);

  const resD = await Promise.all(
    response.data.map((token) => {
      const myToken = portfolioData.find(
        (t) => t.identifier === token.identifier
      );

      if (myToken.api) {
        return axios.post(myToken.api.url, myToken.api.data);
      }
      return getMaiarTokens([token.ticker, "WEGLD"]);
    })
  );

  const data = [];
  response.data.forEach((token, i) => {
    const oldIndex = portfolioData.findIndex(
      (t) => t.identifier === token.identifier
    );
    let newT;

    if (portfolioData[oldIndex].token === "QWT") {
      newT = {
        ...portfolioData[oldIndex],
        ...token,
        egldValue: 1 / resD[i].data.data.pairs["0"].price,
      };
    } else {
      newT = {
        ...portfolioData[oldIndex],
        ...token,
        egldValue: 1 / Number(resD[i].data.value),
      };
    }
    data[oldIndex] = newT;
  });

  return data;
};

const getDcaData = (portfolio, dataTokens, resetFunc) => {
  const tokensArrayString = portfolio.map((t) => t.identifier);
  const filterdFata = dataTokens.filter((t) => {
    return tokensArrayString.includes(t.identifier);
  });

  const data = filterdFata.map((filterDataToken) => {
    const portFolioToken = portfolio.find(
      (portFolioToken) =>
        portFolioToken.identifier === filterDataToken.identifier
    );

    return {
      ...filterDataToken,
      percent: portFolioToken.percent,
    };
  });
  waitToResetStatus(resetFunc);

  return data;
};

export const getPercentArray = (length) => {
  const result = 100 / length;
  const resultRouned = Math.floor(result);

  const returnArray = [];

  for (let index = 1; index < length; index++) {
    returnArray.push(resultRouned);
  }
  const latNumber = new BigNumber(100)
    .minus(resultRouned * (length - 1))
    .toNumber();
  returnArray.push(latNumber);
  return returnArray;
};

export const coreJexSwap = (
  offers,
  token1Amount,
  toToken,
  fromToken,
  defaultJexFee
) => {
  if (token1Amount !== null && token1Amount > 0) {
    // set toToken value
    if (offers.length > 0 && token1Amount) {
      const orders = offers;

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

      const jexFees = defaultJexFee;

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

        realPartialAmount =
          realPartialAmount +
          new BigNumber(percent)
            .multipliedBy(jexAmountMultiplier)
            .multipliedBy(orders[totalOders].token_a_human_amount)
            .dividedBy(100)
            .toNumber();

        userOders.push({
          fromToken: fromToken,
          spend: token1Amount,
          spendBigNumber: new BigNumber(percent)
            .multipliedBy(orders[totalOders].token_b_amount)
            .dividedBy(100)
            .toString(),
          toToken: toToken,
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
      } else {
        for (let index = 0; index < totalOders; index++) {
          const order = orders[index];
          if (token1Amount > order.token_b_human_amount) {
            partialAmounts = partialAmounts + order.token_b_human_amount;

            filledAmounts = filledAmounts + order.token_a_human_amount;

            userOders.push({
              fromToken: fromToken,
              spend: order.token_b_human_amount,
              spendBigNumber: order.token_b_amount,
              toToken: toToken,
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

          realPartialAmount =
            realPartialAmount +
            new BigNumber(percent)
              .multipliedBy(jexAmountMultiplier)
              .multipliedBy(orders[totalOders].token_a_human_amount)
              .dividedBy(100)
              .toNumber();

          userOders.push({
            fromToken: fromToken,
            spend: new BigNumber(percent)
              .multipliedBy(orders[totalOders].token_b_human_amount)
              .dividedBy(100)
              .toString(),
            spendBigNumber: new BigNumber(percent)
              .multipliedBy(orders[totalOders].token_b_amount)
              .dividedBy(100)
              .toString(),
            toToken: toToken,
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

      const token2Amount = filledAmounts + realPartialAmount;

      let averageSum = 0;
      userOders.forEach((order) => {
        averageSum += order.receive / order.spend;
      });

      const returnValue = token2Amount;
      const userOffers = userOders;
      const averageRate = averageSum / userOders.length;

      return {
        returnValue: returnValue,
        userOffers: userOffers,
        averageRate: averageRate,
      };
    }
  } else {
    const returnValue = 0;
    const userOffers = [];
    const averageRate = 0;

    return {
      returnValue: returnValue,
      userOffers: userOffers,
      averageRate: averageRate,
    };
  }
};
