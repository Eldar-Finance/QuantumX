import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectHype } from "redux/slices/farms2/farms2-slice";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppSelector } from "utils/hooks/redux";
import { useGetFarmsLpPrices } from "./useGetFarmsLpPrices";
import useGetMultipleElrondTokens from "./useGetMultipleElrondTokens";
import useGetMultiplePrices from "utils/hooks/useGetMultiplePrices";
import { useGetMultiJextPrices } from "./useGetJexPrice";
import { getJexPrice } from "api/rest/others/Jex";
import useSwr from "swr";
import { toknesID } from "api/net.config";

const useGetTotalValueInHype = () => {
  const { data } = useAppSelector((state) => state.proteo.generalInfoApp);
  const generalInfoAppData = data;
  const [totalValueLocked, setTotalValueLocked] = useState<number>();
  const farms2 = useSelector(selectHype);
  const { prices: lpPrices } = useGetFarmsLpPrices();
  const { tokens } = useGetMultipleElrondTokens(
    farms2.map((farm) => farm.farm.stakingToken)
  );
  
  const [bonezPrice, setBonezPrice] = useState<number>();

  useEffect(() => {
    const fetchPriceData = async () => {
      const data = await getJexPrice(["key", toknesID.bonez]);
      setBonezPrice(data);
    };
    fetchPriceData();
  }, []);


  useEffect(() => {
    const func = async () => {
      if (
        lpPrices.length > 0 &&
        tokens.length > 0 &&
        generalInfoAppData &&
        farms2.length > 0
      ) {
        let totalLockedonProteoFarms = 0;

        // get amount locked on quantumn sc farms in dollars
        for (let i = 0; i < farms2.length; i++) {
          // info from sc about the farm
          const farm = farms2[i];

          const stakingToken = tokens.find(
            (token) => token.identifier === farm.farm.stakingToken
          );

          const lpPrice =
            lpPrices.find(
              (lpToken) =>
                lpToken.token === formatTokenI(farm.farm.stakingToken)
            )?.price || 0;

          const price = stakingToken?.identifier === toknesID.bonez ? bonezPrice : stakingToken?.price || lpPrice;

          totalLockedonProteoFarms += formatBalanceDolar(
            {
              balance: farm.stakedBalance,
              decimals: stakingToken.decimals,
            },
            Number(price)
          );

          // TVL of secondary token in Dual pools
          if (farm.extraPools.length !== 0) {

            const extra_farm = farm.extraPools[0];

            const stakingToken = tokens.find(
              (token) => token.identifier === extra_farm.stakedToken
            );

            const lpPrice =
            lpPrices.find(
              (lpToken) =>
                lpToken.token === formatTokenI(extra_farm.stakedToken)
            )?.price || 0;
            const price = stakingToken?.identifier === toknesID.bonez ? bonezPrice : stakingToken?.price || lpPrice;

            totalLockedonProteoFarms += formatBalanceDolar(
              {
                balance: extra_farm.stakedBalance,
                decimals: stakingToken.decimals,
              },
              Number(price)
            );

          }

        }

        setTotalValueLocked(totalLockedonProteoFarms);
      }
    };
    func();
  }, [bonezPrice, farms2, generalInfoAppData, lpPrices, tokens]);

  return totalValueLocked;
};

export default useGetTotalValueInHype;
