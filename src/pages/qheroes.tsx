import { MetaHead } from "components/MetaHead/MetaHead";
import { Fragment } from "react";
import Heroes from "views/Heroes/Heroes";

const IndexPage = () => {
  return (
    <Fragment>
      <MetaHead metaTitle="QuantumX Network - Heroes" />
      <Heroes />
    </Fragment>
  );
};

export default IndexPage;
