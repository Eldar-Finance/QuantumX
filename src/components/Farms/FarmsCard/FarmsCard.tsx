import { Accordion } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
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

const FarmsCard = ({ proteoArr, isPool, othersArr = null }: IProps) => {
  const router = useRouter();
  const [accordionIndex, setAccordionIndex] = useState<number[]>([]);

  useEffect(() => {
    if (router.query.index) {
      setAccordionIndex([parseInt(router.query.index as string)]);
    }
  }, [router]);

  const handleChangePoolIndex = (indeces: number[]) => {
    setAccordionIndex(indeces);
  };

  return (
    <Accordion
      allowMultiple
      borderRadius={"xl"}
      overflow="hidden"
      w="full"
      index={accordionIndex}
      onChange={handleChangePoolIndex}
    >
      {proteoArr.map((pf) => {
        return <ProteoFarmItem key={pf.stakedCoin} pf={pf} />;
      })}
      {othersArr && (
        <>
          {othersArr.allFarms.map((f) => {
            return (
              <Farms2Item
                key={f.farm.farmId}
                farm={f}
                farmUserInfo={othersArr.userFarmInfo.find(
                  (userFarm) => userFarm.farmId === f.farm.farmId
                )}
                isPool={isPool}
                logoSize={isPool ? 45 : 27}
              />
            );
          })}
        </>
      )}
    </Accordion>
  );
};

export default FarmsCard;
