import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectHype } from "redux/slices/farms2/farms2-slice";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useGetFarmsLpPrices } from "./useGetFarmsLpPrices";
import useGetMultipleElrondTokens from "./useGetMultipleElrondTokens";
import { toknesID } from "api/net.config";

const useGetTotalValueInHype = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<number>();
  const farms2 = useSelector(selectHype);
  const { prices: lpPrices } = useGetFarmsLpPrices();
  const { tokens } = useGetMultipleElrondTokens(
    farms2.map((farm) => farm.farm.stakingToken)
  );

  useEffect(() => {
    const func = async () => {
      if (
        lpPrices.length > 0 &&
        tokens.length > 0 &&
        farms2.length > 0
      ) {
        let totalLockedFarms = 0;

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

          const price = stakingToken?.price || lpPrice;

          totalLockedFarms += formatBalanceDolar(
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
            const price = stakingToken?.price || lpPrice;

            totalLockedFarms += formatBalanceDolar(
              {
                balance: extra_farm.stakedBalance,
                decimals: stakingToken.decimals,
              },
              Number(price)
            );

          }

        }

        setTotalValueLocked(totalLockedFarms);
      }
    };
    func();
  }, [farms2, lpPrices, tokens]);

  return totalValueLocked;
};

export default useGetTotalValueInHype;
