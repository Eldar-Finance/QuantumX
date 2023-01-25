import { Accordion } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
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
