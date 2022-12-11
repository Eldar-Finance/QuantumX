import { getEconomics } from "api/rest/elrondApi/network";
import { getFromAllTokens, getLpTokenPrice } from "api/rest/elrondApi/tokens";
import { getMaiarTokens } from "api/rest/others/MaiarTokens";
import AmountBox1 from "components/InfoBox/AmountBox1";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllFarms2 } from "redux/slices/farms2/farms2-slice";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { farms2Data, proteoFarmsArr } from "views/Farms/constants";

const LockedInFarms = () => {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.proteo.generalInfoApp);
  const generalInfoAppData = data;
  const [totalValueLocked, setTotalValueLocked] = useState<number>();
  const farms2 = useSelector(selectAllFarms2);

  useEffect(() => {
    const func = async () => {
      if (generalInfoAppData && farms2.data) {
        let totalLockedonProteoFarms = 0;

        // get amount locked on proteo farms in dollars
        for (let i = 0; i < proteoFarmsArr.length; i++) {
          const pf = proteoFarmsArr[i];

          const { tokenIdentifier, decimals, token } = pf;

          if (generalInfoAppData) {
            const tokenInfo = generalInfoAppData.tokensInfo.find(
              (ti) => ti.tokenI === tokenIdentifier
            );

            const res = await getMaiarTokens(token, "USDC");

            const tokenPrice = Number(res.data.value);

            if (tokenInfo && tokenInfo.staked !== 0) {
              totalLockedonProteoFarms += formatBalanceDolar(
                { balance: tokenInfo?.staked, decimals: decimals },
                tokenPrice
              );
            }
          }
        }

        // get amount locked on quantumn sc farms in dollars
        for (let i = 0; i < farms2.data.length; i++) {
          const farm = farms2.data[i];

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
  }, [farms2.data, generalInfoAppData]);

  return <AmountBox1 type="FARMS" value={totalValueLocked} />;
};

export default LockedInFarms;
