import { MetaHead } from "components/MetaHead/MetaHead";
import { Fragment } from "react";
import Home from "views/Home/Home";
import SwapPage from "./swap";

const IndexPage = () => {
  return (
    // <Fragment>
    //   <MetaHead
    //     metaTitle="QuantumX Network - Friction-less swaps. Quantum level latency. Next-level interface."
    //     metaDescription="QuantumX's goal is to create dApps that provide true value to their users, by combining traditional DEFI investing methods with real world applications."
    //     metaImage="/images/home.png"
    //   />
    //   <Home />
    // </Fragment>
    <SwapPage />
  );
};

export default IndexPage;
