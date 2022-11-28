import axios from "axios";
const BASE_URL = "https://maiartokens.com";

const axiosMaiarTokens = axios.create({
  baseURL: BASE_URL,
});

export default axiosMaiarTokens;

export const getMaiarTokens = async (fsym, tsym) => {
  if (fsym === "USDC" && tsym === "USDC") {
    return Promise.resolve({
      data: {
        fsym: "USDC",
        tsym: "USDC",
        value: "1",
        timestamp: 0,
      },
    });
  } else {
    return await axiosMaiarTokens.get("/token-value", {
      params: {
        fsym: fsym,
        tsym: tsym,
      },
    });
  }
};
