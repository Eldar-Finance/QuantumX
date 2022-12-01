import { Accordion } from "@chakra-ui/react";
import ProteoFarmItem from "./ProteoFarmItem";

const ProteoFarmsCard = () => {
  return (
    <Accordion allowMultiple borderRadius={"xl"} overflow="hidden" w="full">
      <ProteoFarmItem />
      <ProteoFarmItem />
      <ProteoFarmItem />
    </Accordion>
  );
};

export default ProteoFarmsCard;
