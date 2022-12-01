import { getMaiarTokens } from "api/rest/others/MaiarTokens";
import { useEffect, useState } from "react";

const useGetTokenPrice = (token, secondToken = "USDC") => {
  const [tokenPrice, setTokenPrice] = useState(0);

  useEffect(() => {
    if (token) {
      getMaiarTokens(token, secondToken).then((res) => {
        setTokenPrice(Number(res.data.value));
      });
    }
  }, [token, secondToken]);

  return [tokenPrice];
};

export default useGetTokenPrice;
