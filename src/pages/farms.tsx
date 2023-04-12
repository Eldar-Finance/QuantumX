import { MetaHead } from "components/MetaHead/MetaHead";
import type { NextPage } from "next";
import ProteoFarms from "views/Farms/Farms";
const ProteoFarmsPage: NextPage = () => {
  return (
    <>
      <MetaHead metaTitle="QuantumX Network - Farms" />
      <ProteoFarms />
    </>
  );
};

export default ProteoFarmsPage;
