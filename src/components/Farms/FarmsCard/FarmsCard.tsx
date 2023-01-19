import { Accordion } from "@chakra-ui/react";
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
  return (
    <Accordion allowMultiple borderRadius={"xl"} overflow="hidden" w="full">
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
