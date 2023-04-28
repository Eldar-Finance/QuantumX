import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import WrapperPages from "hoc/WrapperPages";
import withElronDapp from "hoc/withElronDapp";
import UnclaimedView from "./components/UnclaimedView/UnclaimedView";

const Tags = () => {
  return (
    <Layout>
      <MyContainer
        display={"flex"}
        flexDir="column"
        alignItems={"center"}
        pb={"500px"}
        pt={10}
      >
        <UnclaimedView />
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Tags));
