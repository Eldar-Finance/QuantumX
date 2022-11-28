import axiosEldron from "api/rest/axiosEldron";

export const getEldarTransactions = async () => {
  return await axiosEldron.get(
    "/transactions?size=10000&sender=erd1s5ufsgtmzwtp6wrlwtmaqzs24t0p9evmp58p33xmukxwetl8u76sa2p9rv"
  );
};
export const getTransactionsToEldar = async () => {
  return await axiosEldron.get(
    "/transactions?size=10000&token=MEX&receiver=erd1qqqqqqqqqqqqqpgqjtjrxp777hlz5mkvexds3qtlfgq3u7veu76s2lr29e"
  );
};

export const getLotteryTransactions = async () => {
  // const lotteryAddress = contractAddr.lottery;
  const lotteryAddress =
    "erd1qqqqqqqqqqqqqpgqh80v33yjflz0vjav6n88qqkfck9qnc8r24usgfhkve";
  return await axiosEldron.get(
    `/transactions?size=10&&receiver=${lotteryAddress}`
  );
};
