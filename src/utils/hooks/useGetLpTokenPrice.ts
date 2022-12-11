import { getLpTokenPrice } from "api/rest/elrondApi/tokens";
import { useEffect, useState } from "react";

const useGetLpTokenPrice = (scFarmAddress, lpToken, token) => {
  const [lpPrice, setLpPrice] = useState<number>(0);

  useEffect(() => {
    getLpTokenPrice(scFarmAddress, lpToken, token).then((res) => {
      setLpPrice(res);
    });
  }, [lpToken, scFarmAddress, token]);

  return lpPrice;
};

export default useGetLpTokenPrice;
