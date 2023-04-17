import { MetaHead } from "components/MetaHead/MetaHead";
import type { NextPage } from "next";
import ProteoPools from "views/Pools/Pools";
const ProteoPoolsPage: NextPage = () => {
  return (
    <>
      {" "}
      <MetaHead metaTitle="QuantumX Network - Pools" />
      <ProteoPools />
    </>
  );
};

export default ProteoPoolsPage;
