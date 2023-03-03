import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import TitlePage from "components/TitlePage/TitlePage";
import WrapperPages from "hoc/WrapperPages";
import { useEffect } from "react";
import { FetchWhitelistedTokens } from "redux/slices/smartSwaps/funcs";
import { useAppDispatch } from "utils/hooks/redux";
import ConvertCard from "./components/ConvertCard/ConvertCard";

const ConverterView = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(FetchWhitelistedTokens());
  }, [dispatch]);
  return (
    <Layout>
      <MyContainer maxW="730px" mt={-8} mb={20}>
        <TitlePage
          title="Quantumx Converter"
          subtitle="Convert your tokens to Rare"
          mb={10}
        />

        <ConvertCard />
      </MyContainer>
    </Layout>
  );
};

export default WrapperPages(ConverterView);
