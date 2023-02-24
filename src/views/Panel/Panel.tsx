import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import MyTabs from "components/MyTabs/MyTabs";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import Faucet from "./components/Faucet/Faucet";
import HubTable from "./components/HubTable/HubTable";
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
        <MyTabs
          tabListProps={{
            overflow: "auto",
          }}
          tabsProps={{
            w: "full",
            display: "flex",
            alignItems: "center",
            flexDir: "column",
          }}
          tabProps={{
            fontSize: { xs: "sm", md: "md" },
            px: "20px",
            fontWeight: "600",
          }}
          tabData={[
            {
              tabText: "Farms",
              tabPanel: <PanelTable />,
            },
            {
              tabText: "Hub",
              tabPanel: <HubTable />,
            },
            {
              tabText: "Faucet",
              tabPanel: <Faucet />,
            },
          ]}
        />
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Panel));
