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
}

const FarmsCard = ({ proteoArr, othersArr = null }: IProps) => {
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
              />
            );
          })}
        </>
      )}
      {/* <Farms2Item
        farm={{
          apr: 150,
          farm: {
            creationEpoch: 180,
            farmId: 15,
            rewardToken: "SUPER-507aa6",
            stakingToken: "AERO-458bbf",
          },
          stakedBalance: 140000000000000000000,
        }}
        farmUserInfo={{
          earnedRewards: 450000000000000,
          farmId: 15,
          harvestableRewards: 8000000000000,
          stakedBalance: 40000000000000,
          unboundingRewards: 84650000000000,
        }}
      /> */}
    </Accordion>
  );
};

export default FarmsCard;
