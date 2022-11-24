import { Box } from "@chakra-ui/react";
import Layout from "components/Layout/Layout";
import MainSection from "./components/MainSection/MainSection";
const Home = () => {
  return (
    <Layout>
      <Box mt="94px">
        <MainSection />
      </Box>
    </Layout>
  );
};

export default Home;
