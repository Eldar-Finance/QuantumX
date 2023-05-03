import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllFarms2 } from "redux/slices/farms2/farms2-slice";
import { pairs } from "utils/constants/lpPairs";
import { unparseMultipleFarms } from "utils/functions/farms";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppSelector } from "utils/hooks/redux";
import { proteoFarmsArr } from "views/Farms/constants";
import { useGetFarmsLpPrices } from "./useGetFarmsLpPrices";
import useGetMultipleElrondTokens from "./useGetMultipleElrondTokens";
import { allHypeFarms } from "views/Hypezone/utils/constants";

const useGetTotalValueInFarms = () => {
  const { data } = useAppSelector((state) => state.proteo.generalInfoApp);
  const generalInfoAppData = data;
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
        generalInfoAppData &&
        farms2.length > 0
      ) {
        let totalLockedonProteoFarms = 0;

        // fetch all lp prices that we need in usdc
        // get amount locked on proteo farms in dollars
        for (let i = 0; i < proteoFarmsArr.length; i++) {
          // get static data about proteo farm
          const pf = proteoFarmsArr[i];

          // extrac tokenIdentifier and decimals from proteo farm
          const { tokenIdentifier, decimals } = pf;

          if (generalInfoAppData) {
            const tokenInfo = generalInfoAppData.tokensInfo.find(
              (ti) => ti.tokenI === tokenIdentifier
            );
            let tokenPrice = 0;

            const price = lpPrices.find(
              (lp) => lp.token === formatTokenI(tokenIdentifier)
            )?.price;
            if (price) {
              tokenPrice = Number(price);
            }

            if (tokenInfo && tokenInfo.staked !== 0) {
              totalLockedonProteoFarms += formatBalanceDolar(
                { balance: tokenInfo?.staked, decimals: decimals },
                tokenPrice
              );
            }
          }
        }

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

          totalLockedonProteoFarms += formatBalanceDolar(
            {
              balance: farm.stakedBalance,
              decimals: stakingToken.decimals,
            },
            Number(lpPrice)
          );
        }
        setTotalValueLocked(totalLockedonProteoFarms);
      }
    };
    func();
  }, [farms2, generalInfoAppData, lpPrices, tokens]);

  return totalValueLocked;
};

export default useGetTotalValueInFarms;
