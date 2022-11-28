import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import AddressSection from "./components/AddressSection/AddressSection";
import Dashtabs from "./components/Dashtabs/Dashtabs";
import TotalAmount from "./components/TotalAmount/TotalAmount";

const Dashboard = () => {
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
        <TotalAmount />
        <AddressSection />
        <Dashtabs />
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Dashboard));
