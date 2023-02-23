import { Box } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import Footer from "components/Footer/Footer";

import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import { useEffect } from "react";
import { fetchAllFarms } from "redux/slices/farms2/funcs";
import { fetchGeneralInfo } from "redux/slices/proteo/funcs";
import { useAppDispatch } from "utils/hooks/redux";
import InfoText from "./components/InfoText/InfoText";
import MainSection from "./components/MainSection/MainSection";
import QuantumXFeatures from "./components/QuantumXFeatures/QuantumXFeatures";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGeneralInfo());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllFarms());
  }, [dispatch]);
  return (
    <Layout>
      <MyContainer>
        <Box mt={{ xs: "50px", "2xl": "94px" }}>
          <MainSection />
        </Box>
        <Box mt={{ xs: "100px", "2xl": "180px" }}>
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
