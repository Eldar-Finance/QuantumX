import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllFarms2 } from "redux/slices/farms2/farms2-slice";
import { pairs } from "utils/constants/lpPairs";
import { unparseMultipleFarms } from "utils/functions/farms";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useGetFarmsLpPrices } from "./useGetFarmsLpPrices";
import useGetMultipleElrondTokens from "./useGetMultipleElrondTokens";
import { allHypeFarms } from "views/Hypezone/utils/constants";

const useGetTotalValueInFarms = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<number>();
  const { data: allFarms } = useSelector(selectAllFarms2);
  const farms2 = allFarms.filter(
    (farm) =>
      pairs.findIndex(
        (mexPair) => mexPair.lpidentifier === farm.farm.stakingToken
      ) !== -1
  );

  const { prices: lpPrices } = useGetFarmsLpPrices();
  const { tokens } = useGetMultipleElrondTokens(
    unparseMultipleFarms(farms2).map((farm) => farm.stakedToken)
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

          // Skip the calculation if the farmID exists in allHypeFarms array
          if (allHypeFarms.includes(farm.farm.farmId)) {
            continue;
          }
          const stakingToken = tokens.find(
            (token) => token.identifier === farm.farm.stakingToken
          );

          const lpPrice =
            lpPrices.find(
              (lpToken) =>
                lpToken.token === formatTokenI(farm.farm.stakingToken)
            )?.price || 0;

            totalLockedFarms += formatBalanceDolar(
            {
              balance: farm.stakedBalance,
              decimals: stakingToken.decimals,
            },
            Number(lpPrice)
          );
        }
        setTotalValueLocked(totalLockedFarms);
      }
    };
    func();
  }, [farms2, lpPrices, tokens]);

  return totalValueLocked;
};

export default useGetTotalValueInFarms;
