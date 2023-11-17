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
          style={{
            backgroundColor: '#121212', // replace 'black' with your desired color or variable
            padding: '20px', // for xs screens, adjust as needed
            paddingTop: '30px !important', // Note: !important might not work in inline styles
            borderRadius: '30px', // for xs screens, adjust as needed
            border: '1px solid',
            borderColor: 'transparent' // replace 'main' with your color or variable
          }}
        >
          <SwapCard />
          {/* p2p is hidden */}
        </Card>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Swap));
