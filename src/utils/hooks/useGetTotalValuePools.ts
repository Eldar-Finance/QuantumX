import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllFarms2 } from "redux/slices/farms2/farms2-slice";
import { pairs } from "utils/constants/lpPairs";
import { unparseMultipleFarms } from "utils/functions/farms";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import useGetMultipleElrondTokens from "./useGetMultipleElrondTokens";
import { allHypeFarms } from "views/Hypezone/utils/constants";

const useGetTotalValuePools = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<number>();
  const { data: allFarms } = useSelector(selectAllFarms2);
  const farms2 = allFarms.filter((farm) =>
    pairs.filter(
      (mexPair) =>
        pairs.findIndex(
          (mexPair) => mexPair.lpidentifier === farm.farm.stakingToken
        ) === -1
    )
  );

  const { tokens: farms2Tokens } = useGetMultipleElrondTokens(
    unparseMultipleFarms(farms2).map((farm) => farm.stakedToken)
  );

  useEffect(() => {
    const func = async () => {
      if (
        farms2Tokens.length > 0 &&
        farms2.length > 0
      ) {
        let totalLockedFarms = 0;

        for (let i = 0; i < farms2.length; i++) {
          const farm = farms2[i];

          // Skip the calculation if the farmID exists in allHypeFarms array
          if (allHypeFarms.includes(farm.farm.farmId)) {
            continue;
          }

          const stakingToken = farms2Tokens.find(
            (token) => token.identifier === farm.farm.stakingToken
          );

          totalLockedFarms += formatBalanceDolar(
            {
              balance: farm.stakedBalance,
              decimals: stakingToken?.decimals || 18,
            },
            stakingToken?.price
          );

          const extrapollsAmounts = farm.extraPools?.reduce((acc, pool) => {
            const stakingToken = farms2Tokens.find(
              (token) => token.identifier === pool.stakedToken
            );

            return (acc += formatBalanceDolar(
              {
                balance: pool.stakedBalance,
                decimals: stakingToken?.decimals,
              },
              stakingToken?.price
            ));
          }, 0);

          totalLockedFarms += extrapollsAmounts;
        }

        setTotalValueLocked(totalLockedFarms);
      }
    };
    func();
  }, [farms2, farms2Tokens]);
  return totalValueLocked;
};

export default useGetTotalValuePools;
