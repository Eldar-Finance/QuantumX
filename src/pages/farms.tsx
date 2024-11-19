import { MetaHead } from "components/MetaHead/MetaHead";
import type { NextPage } from "next";
import Farms from "views/Farms/Farms";

const FarmsPage: NextPage = () => {
  return (
    <>
      <MetaHead metaTitle="QuantumX Network - Farms" />
      <Farms />
    </>
  );
};

export default FarmsPage;
