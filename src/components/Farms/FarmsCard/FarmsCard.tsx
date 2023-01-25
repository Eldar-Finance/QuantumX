import { Accordion } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { orderSimpleData } from "utils/functions/array";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import { getSortedFarm } from "utils/functions/proteo";
import { useAppSelector } from "utils/hooks/redux";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import useGetMultiplePrices from "utils/hooks/useGetMultiplePrices";
import { IProteoFarm } from "utils/types/farms.interface";
import { IScFarmItem, IScUserFarmInfo } from "utils/types/sc.interface";
import Farms2Item from "./Farms2Item";
import ProteoFarmItem from "./ProteoFarmItem";

interface IProps {
  proteoArr: IProteoFarm[];
  othersArr?: {
    allFarms: IScFarmItem[];
    userFarmInfo: IScUserFarmInfo[];
  };
  isPool?: boolean;
}

export interface IFarmWithTvl {
  tokenI;
  totalLocked;
  stakedTokenPrice;
  stakedTokenDecimals;
  type: "proteo" | "farms2";
  farm: any;
}

const FarmsCard = ({ proteoArr, isPool, othersArr = null }: IProps) => {
  const router = useRouter();
  const [accordionIndex, setAccordionIndex] = useState<number[]>([]);
  const { data: generalFarmsData } = useAppSelector(
    (state) => state.proteo.generalInfoApp
  );

  const [tokenPrices] = useGetMultiplePrices(
    othersArr.allFarms
      .map((f) => f.farm.stakingToken)
      .concat(proteoArr.map((pf) => pf.tokenIdentifier))
  );

  const { tokens } = useGetMultipleElrondTokens(
    othersArr.allFarms
      .map((f) => f.farm.stakingToken)
      .concat(proteoArr.map((pf) => pf.tokenIdentifier))
  );

  useEffect(() => {
    if (router.query.index) {
      setAccordionIndex([parseInt(router.query.index as string)]);
    }
  }, [router]);

  useEffect(() => {
    if (tokenPrices || tokens || proteoArr || othersArr || generalFarmsData) {
      // let tvls: IFarmWithTvl[] = [];
      // calc total value locked for proteo farms

      //proteo farm token info []
      const prteoTokenInfo = proteoArr.map((pf) => {
        const { tokenIdentifier } = pf; // get static data of proteo farm (token idenfier)

        // find from the sc the info about the farm with the token idenfier
        const tokenInfo = generalFarmsData?.tokensInfo.find(
          (ti) => ti.tokenI === tokenIdentifier
        );

        // return an array of tokenns infos
        return { ...tokenInfo, pf: pf } as { staked?: number; tokenI; pf: any };
      });

      // now we can calc the total locked balance
      const proteoFarmTotalLockedBalanceArr: IFarmWithTvl[] = prteoTokenInfo.map(
        (tinfo) => {
          const decimals =
            tokens.find((t) => t.identifier === tinfo?.tokenI)?.decimals || 0;
          const tokenPrice =
            tokenPrices.find((tp) => tp.tokenI === tinfo?.tokenI)?.price || 0;
          const totalLocked = formatBalanceDolar(
            { balance: tinfo?.staked, decimals: decimals },
            tokenPrice
          );

          return {
            tokenI: tinfo?.tokenI,
            totalLocked: totalLocked,
            stakedTokenPrice: tokenPrice,
            stakedTokenDecimals: decimals,
            type: "proteo",
            farm: tinfo.pf,
          };
        }
      );
      // now I have all proteo farms total locked balance in dollars in an array (proteoFarmTotalLockedBalanceArr)

      /* --------------------------------- */

      // calculate farms2 total value locked
      const farms2TotalLockedBalanceArr: IFarmWithTvl[] = othersArr.allFarms.map(
        (farm) => {
          const decimals =
            tokens.find((t) => t.identifier === farm.farm.stakingToken)
              ?.decimals || 0;
          const tokenPrice =
            tokenPrices.find((tp) => tp.tokenI === farm.farm.stakingToken)
              ?.price || 0;

          const totalLocked = formatBalanceDolar(
            { balance: farm.stakedBalance, decimals: decimals },
            tokenPrice
          );
          const totalLockedBalance: IFarmWithTvl = {
            stakedTokenDecimals: decimals,
            stakedTokenPrice: tokenPrice,
            tokenI: farm.farm.stakingToken,
            totalLocked: totalLocked,
            type: "farms2",
            farm: farm,
          };
          return totalLockedBalance;
        }
      );

      // combine 2 arrays

      const tvls: IFarmWithTvl[] = [
        ...proteoFarmTotalLockedBalanceArr,
        ...farms2TotalLockedBalanceArr,
      ];

      const sortedTvls = orderSimpleData(tvls, "totalLocked", "desc");
      console.log("me ejecuto");

      // setFarmStored(sortedTvls);
    }
  }, [tokenPrices, tokens, proteoArr, othersArr, generalFarmsData]);

  const handleChangePoolIndex = (indeces: number[]) => {
    setAccordionIndex(indeces);
  };

  let farmStored: IFarmWithTvl[] = getSortedFarm(
    tokenPrices,
    tokens,
    proteoArr,
    othersArr,
    generalFarmsData
  );

  console.log("farmStored", farmStored);

  return (
    <Accordion
      allowMultiple
      borderRadius={"xl"}
      overflow="hidden"
      w="full"
      index={accordionIndex}
      onChange={handleChangePoolIndex}
    >
      {farmStored.map((farm) => {
        if (farm.type === "proteo") {
          return (
            <ProteoFarmItem
              tvl={farm.totalLocked}
              key={farm.farm.stakedCoin}
              pf={farm.farm}
            />
          );
        } else {
          return (
            <Farms2Item
              key={farm.farm.farmId}
              farm={farm.farm}
              tvl={farm.totalLocked}
              farmUserInfo={othersArr.userFarmInfo.find(
                (userFarm) => userFarm.farmId === farm.farm.farmId
              )}
              stakedTokenPrice={farm.stakedTokenPrice}
              isPool={isPool}
              logoSize={isPool ? 45 : 27}
            />
          );
        }
      })}
    </Accordion>
  );
};

export default FarmsCard;
