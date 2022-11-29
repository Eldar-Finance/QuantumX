import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import DcaCard from "./components/DcaCard/DcaCard";

const Dca = () => {
  return (
    <Layout>
      <MyContainer
        display={"flex"}
        justifyContent="center"
        flexDir={"column"}
        alignItems={"center"}
        h="full"
        gap="25px"
        overflow={"auto"}
      >
        <DcaCard />
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Dca));
