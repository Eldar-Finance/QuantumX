import { MetaHead } from "components/MetaHead/MetaHead";
import { Fragment } from "react";
import Hypezone from "views/Hypezone/Hypezone";

const HypezonePage = () => {
  return (
    <Fragment>
      <MetaHead metaTitle="QuantumX Network - Hypezone" />
      <Hypezone />
    </Fragment>
  );
};

export default HypezonePage;
