import { getEconomics } from "api/rest/elrondApi/network";
import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import { getMaiarTokens } from "api/rest/others/MaiarTokens";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPools } from "redux/slices/farms2/farms2-slice";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { proteoPoolsArr } from "views/Pools/constants";

const useGetTotalValuePools = () => {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.proteo.generalInfoApp);
  const generalInfoAppData = data;
  const [totalValueLocked, setTotalValueLocked] = useState<number>();
  const farms2 = useSelector(selectPools);

  useEffect(() => {
    const func = async () => {
      if (generalInfoAppData && farms2) {
        let totalLockedonProteoFarms = 0;

        for (let i = 0; i < proteoPoolsArr.length; i++) {
          const pf = proteoPoolsArr[i];

          const { tokenIdentifier, decimals, token } = pf;

          if (generalInfoAppData) {
            const tokenInfo = generalInfoAppData.tokensInfo.find(
              (ti) => ti.tokenI === tokenIdentifier
            );

            const res = await getMaiarTokens([token, "USDC"]);

            const tokenPrice = Number(res.data.value);

            if (tokenInfo && tokenInfo.staked !== 0) {
              totalLockedonProteoFarms += formatBalanceDolar(
                { balance: tokenInfo?.staked, decimals: decimals },
                tokenPrice
              );
            }
          }
        }

        for (let i = 0; i < farms2.length; i++) {
          const farm = farms2[i];

          let dataApi = null;
          let manualData = null;

          if (farm.farm.stakingToken === "EGLD") {
            const egldData = await getEconomics();
            if (egldData) {
              manualData = {
                type: "FungibleESDT",
                identifier: "EGLD",
                name: "EGLD",
                ticker: "EGLD",
                decimals: 18,
                assets: {
                  svgUrl: "/images/egld.svg",
                },

                price: egldData.data.price,
                marketCap: egldData.data.marketCap,
                supply: egldData.data.totalSupply,
                circulatingSupply: egldData.data.circulatingSupply,
              };
            }
          } else {
            const res = await getFromAllTokens({
              identifier: farm.farm.stakingToken,
            });
            dataApi = res.data[0];
          }

          const stakingToken = manualData || dataApi;

          totalLockedonProteoFarms += formatBalanceDolar(
            {
              balance: farm.stakedBalance,
              decimals: stakingToken.decimals,
            },
            stakingToken?.price
          );
        }

        setTotalValueLocked(totalLockedonProteoFarms);
      }
    };
    func();
  }, [farms2, generalInfoAppData]);
  return totalValueLocked;
};

export default useGetTotalValuePools;
