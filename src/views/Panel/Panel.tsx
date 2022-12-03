import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import PanelTable from "./components/PanelTable/PanelTable";
import PanelTitle from "./components/PanelTitle/PanelTitle";

const Panel = () => {
  return (
    <Layout>
      <MyContainer
        display={"flex"}
        justifyContent="center"
        flexDir={"column"}
        alignItems={"center"}
        h="full"
        gap="25px"
        w="full"
      >
        <PanelTitle />
        <PanelTable />
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Panel));
