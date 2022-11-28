import { Box } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import Footer from "components/Footer/Footer";

import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import InfoText from "./components/InfoText/InfoText";
import MainSection from "./components/MainSection/MainSection";
import QuantumXFeatures from "./components/QuantumXFeatures/QuantumXFeatures";

const Home = () => {
  return (
    <Layout>
      <MyContainer>
        <Box mt={{ xs: "50px", "2xl": "94px" }}>
          <MainSection />
        </Box>
        <Box mt={{ xs: "100px", "2xl": "190px" }}>
          <QuantumXFeatures />
        </Box>
        <Box mt="99px" mb={"50px"}>
          <InfoText />
        </Box>
      </MyContainer>
      <Footer />
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Home));
