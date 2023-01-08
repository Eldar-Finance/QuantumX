import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import NftList from "./components/NFTList/NftList";
import TitleSection from "./components/TitleSection/TitleSection";

const Hub = () => {
  return (
    <Layout>
      <MyContainer>
        <TitleSection />
        <NftList />
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Hub));
