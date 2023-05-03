import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllFarms2 } from "redux/slices/farms2/farms2-slice";
import { pairs } from "utils/constants/lpPairs";
import { unparseMultipleFarms } from "utils/functions/farms";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import { useAppSelector } from "utils/hooks/redux";
import { proteoPoolsArr } from "views/Pools/constants";
import useGetMultipleElrondTokens from "./useGetMultipleElrondTokens";
import { allHypeFarms } from "views/Hypezone/utils/constants";

const useGetTotalValuePools = () => {
  const { data } = useAppSelector((state) => state.proteo.generalInfoApp);
  const generalInfoAppData = data;
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
  const { tokens: pfTokens } = useGetMultipleElrondTokens(
    proteoPoolsArr.map((pf) => pf.tokenIdentifier)
  );
  useEffect(() => {
    const func = async () => {
      if (
        pfTokens.length > 0 &&
        farms2Tokens.length > 0 &&
        generalInfoAppData &&
        farms2.length > 0
      ) {
        let totalLockedonProteoFarms = 0;

        for (let i = 0; i < proteoPoolsArr.length; i++) {
          const pf = proteoPoolsArr[i];

          const { tokenIdentifier, decimals } = pf;

          if (generalInfoAppData) {
            const tokenInfo = generalInfoAppData.tokensInfo.find(
              (ti) => ti.tokenI === tokenIdentifier
            );

            const stakingToken = pfTokens.find(
              (token) => token.identifier === tokenIdentifier
            );

            let tokenPrice = stakingToken?.price || 0;

            if (tokenInfo && tokenInfo.staked !== 0) {
              totalLockedonProteoFarms += formatBalanceDolar(
                {
                  balance: tokenInfo?.staked,
                  decimals: decimals,
                },
                tokenPrice
              );
            }
          }
        }

        for (let i = 0; i < farms2.length; i++) {
          const farm = farms2[i];

          // Skip the calculation if the farmID exists in allHypeFarms array
          if (allHypeFarms.includes(farm.farm.farmId)) {
            continue;
          }

          const stakingToken = farms2Tokens.find(
            (token) => token.identifier === farm.farm.stakingToken
          );

          totalLockedonProteoFarms += formatBalanceDolar(
            {
              balance: farm.stakedBalance,
              decimals: stakingToken.decimals,
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

          totalLockedonProteoFarms += extrapollsAmounts;
        }

        setTotalValueLocked(totalLockedonProteoFarms);
      }
    };
    func();
  }, [farms2, farms2Tokens, generalInfoAppData, pfTokens]);
  return totalValueLocked;
};

export default useGetTotalValuePools;
