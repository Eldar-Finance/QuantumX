import { Box } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import NftList from "./components/NFTList/NftList";
import TitleSection from "./components/TitleSection/TitleSection";

const Heroes = () => {
  return (
    <Layout pb={20}>
      <MyContainer>
        <TitleSection />
        <Box>
          <NftList />
        </Box>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Heroes));
