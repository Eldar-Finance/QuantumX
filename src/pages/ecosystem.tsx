import { MetaHead } from "components/MetaHead/MetaHead";
import { Fragment } from "react";
import Ecosystem from "views/Ecosystem/Ecosystem";
const IndexPage = () => {
  return (
    <Fragment>
      <MetaHead
        metaTitle="QuantumX Network - Ecosystem"
        metaDescription="Add description here"
      />
      
      <Ecosystem />
    </Fragment>
  );
};
export default IndexPage;