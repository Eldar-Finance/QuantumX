import Card from "components/Card/Card";
import MyContainer from "components/Container/Container";

import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import SwapCard from "./components/SmartSwap/SwapCard/SwapCard";

const Swap = () => {
  return (
    <Layout>
      <MyContainer
        display={"flex"}
        flexDir="column"
        alignItems={"center"}
        pb={"500px"}
      >
        <Card
          maxW={"620px"}
          bg="black.light"
          p={{ xs: "20px", md: "56px" }}
          borderRadius={{ xs: "xl", md: "4xl" }}
          border={"1px solid"}
          borderColor={"main"}
        >
          <SwapCard />
          {/* p2p is hidden */}
        </Card>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Swap));
