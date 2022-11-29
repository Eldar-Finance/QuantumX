import BigNumber from "bignumber.js";

export const getDcaAmount = (egldAmount, token, withEgldPrice = false) => {
  if (!egldAmount) {
    return 0;
  }

  const egldVal = new BigNumber(egldAmount);
  const realTotal = egldVal.multipliedBy(0.975);

  let amount = realTotal.multipliedBy(token.percent / 100);
  if (withEgldPrice) {
    if (token.token !== "EGLD") {
      amount = amount.multipliedBy(token.egldValue);
    }
  }

  return amount.toNumber();
};
