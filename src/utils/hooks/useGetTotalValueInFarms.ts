import { getEconomics } from "api/rest/elrondApi/network";
import { getFromAllTokens, getLpTokenPrice } from "api/rest/elrondApi/tokens";
import { fetchLpPrices } from "api/rest/others/EldarFinance";
import { getMaiarTokens } from "api/rest/others/MaiarTokens";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectFarms } from "redux/slices/farms2/farms2-slice";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppSelector } from "utils/hooks/redux";
import { farms2Data, proteoFarmsArr } from "views/Farms/constants";

const useGetTotalValueInFarms = () => {
  const { data } = useAppSelector((state) => state.proteo.generalInfoApp);
  const generalInfoAppData = data;
  const [totalValueLocked, setTotalValueLocked] = useState<number>();
  const farms2 = useSelector(selectFarms);
  useEffect(() => {
    const func = async () => {
      if (generalInfoAppData && farms2) {
        let totalLockedonProteoFarms = 0;

        // get amount locked on proteo farms in dollars
        for (let i = 0; i < proteoFarmsArr.length; i++) {
          const pf = proteoFarmsArr[i];

          const { tokenIdentifier, decimals, token } = pf;

          if (generalInfoAppData) {
            const tokenInfo = generalInfoAppData.tokensInfo.find(
              (ti) => ti.tokenI === tokenIdentifier
            );
            let tokenPrice = 0;
            try {
              const res = await getMaiarTokens([token, "USDC"]);

              tokenPrice = Number(res.data.value);
            } catch (error) {
              const res = await fetchLpPrices();
              const price = res.find((lp) => lp.token === tokenIdentifier)
                ?.tokenvalue;
              if (price) {
                tokenPrice = Number(price);
              }
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

          const { lpToken2, scFarmAddress } = farms2Data[
            formatTokenI(farm.farm.stakingToken)
          ];
          const lpPrice = await getLpTokenPrice(
            scFarmAddress,
            lpToken2,
            farm.farm.stakingToken
          );

          totalLockedonProteoFarms += formatBalanceDolar(
            {
              balance: farm.stakedBalance,
              decimals: stakingToken.decimals,
            },
            lpPrice
          );
        }
        setTotalValueLocked(totalLockedonProteoFarms);
      }
    };
    func();
  }, [farms2, generalInfoAppData]);

  return totalValueLocked;
};

export default useGetTotalValueInFarms;
