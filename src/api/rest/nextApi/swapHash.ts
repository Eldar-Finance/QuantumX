import axios from "api/rest/servelesFunctions";

export const getHashedSwapData = async (
  tokenReturned,
  amountReturned,
  address
) => {
  const data = {
    token: tokenReturned,
    amount: amountReturned,
    address: address,
  };
  return await axios.post("/swapHash", data);
};
