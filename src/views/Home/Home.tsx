import { Box } from "@chakra-ui/react";
import bg from "assets/home/bg.png";
import Footer from "components/Footer/Footer";
import Layout from "components/Layout/Layout";
import InfoText from "./components/InfoText/InfoText";
import MainSection from "./components/MainSection/MainSection";
import QuantumXFeatures from "./components/QuantumXFeatures/QuantumXFeatures";
const Home = () => {
  return (
    <Layout bg={bg}>
      <Box mt="94px">
        <MainSection />
      </Box>
      <Box mt="190px">
        <QuantumXFeatures />
      </Box>
      <Box mt="99px" mb={"50px"}>
        <InfoText />
      </Box>
      <Footer />
    </Layout>
  );
};

export default Home;
