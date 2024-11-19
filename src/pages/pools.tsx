import { MetaHead } from "components/MetaHead/MetaHead";
import type { NextPage } from "next";
import Pools from "views/Pools/Pools";

const PoolsPage: NextPage = () => {
  return (
    <>
      {" "}
      <MetaHead metaTitle="QuantumX Network - Pools" />
      <Pools />
    </>
  );
};

export default PoolsPage;
