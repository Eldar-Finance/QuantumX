import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
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

export default WrapperPages(Hub);
