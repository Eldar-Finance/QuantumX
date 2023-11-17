import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import WrapperPages from "hoc/WrapperPages";
import withElronDapp from "hoc/withElronDapp";
import AddressSection from "./components/AddressSection/AddressSection";
import Dashtabs from "./components/Dashtabs/Dashtabs";
import SendTokens from "./components/SendTokens/SendTokens";
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
        gap={{ xs: "10px", md: "25px" }}
        overflow={"auto"}
      >
        <TotalAmount />
        <AddressSection />
        <SendTokens />
        <Dashtabs />
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Dashboard));
