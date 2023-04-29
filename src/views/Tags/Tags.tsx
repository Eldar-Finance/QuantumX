import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import WrapperPages from "hoc/WrapperPages";
import withElronDapp from "hoc/withElronDapp";
import ClaimedView from "./components/ClaimedView/ClaimedView";
import UnclaimedView from "./components/UnclaimedView/UnclaimedView";
import useGetUserQTag from "./hooks/useGetQTag";

const Tags = () => {
  const { tagInfo } = useGetUserQTag();

  return (
    <Layout>
      <MyContainer
        display={"flex"}
        flexDir="column"
        alignItems={"center"}
        pb={"500px"}
        pt={10}
      >
        {tagInfo.tag === "" ? <UnclaimedView /> : <ClaimedView />}
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Tags));
