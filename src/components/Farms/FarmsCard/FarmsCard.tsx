import { Accordion } from "@chakra-ui/react";
import { IProteoFarm } from "utils/types/proteo.interface";
import ProteoFarmItem from "./ProteoFarmItem";

interface IProps {
  proteoArr: IProteoFarm[];
}

const FarmsCard = ({ proteoArr }: IProps) => {
  return (
    <Accordion allowMultiple borderRadius={"xl"} overflow="hidden" w="full">
      {proteoArr.map((pf) => {
        return <ProteoFarmItem key={pf.stakedCoin} pf={pf} />;
      })}
      {proteoArr.map((pf) => {
        return <ProteoFarmItem key={pf.stakedCoin} pf={pf} />;
      })}
    </Accordion>
  );
};

export default FarmsCard;
