import { MetaHead } from "components/MetaHead/MetaHead";
import { Fragment } from "react";
import Burnium from "views/Burnium/Burnium";
const IndexPage = () => {
  return (
    <Fragment>
      <MetaHead
        metaTitle="QuantumX Network - Ecosystem"
        metaDescription="Add description here"
      />
      
      <Burnium />
    </Fragment>
  );
};
export default IndexPage;