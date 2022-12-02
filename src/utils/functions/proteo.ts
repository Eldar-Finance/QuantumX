import { noMaxTokens } from "utils/constants/proteo";

export const getFeeBasedInEpoch = (epoch) => {
  if (epoch === undefined || epoch === null) {
    return null;
  }
  let fee = 0;
  if (epoch <= 1) {
    fee = 3;
  } else if (epoch > 1 && epoch <= 3) {
    fee = 2;
  } else if (epoch > 3 && epoch <= 19) {
    fee = 1;
  } else {
    fee = 0;
  }

  return fee;
};

export const haveMaxLimit = (token) => {
  return noMaxTokens.findIndex((t) => t === token) !== -1;
};
