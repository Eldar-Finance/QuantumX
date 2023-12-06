import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import WrapperPages from "hoc/WrapperPages";
import withElronDapp from "hoc/withElronDapp";
import TitleSection from "./Titlesection";
import CryptoTable from "./CryptoTable";
import { Center } from "@chakra-ui/react";

const Ecosystem = () => {
  return (
    <Layout>
      <MyContainer>
        <TitleSection />
        <Center textAlign={"center"}>
        <CryptoTable></CryptoTable>
        </Center>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Ecosystem));
