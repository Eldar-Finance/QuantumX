import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import MyTabs from "components/MyTabs/MyTabs";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import Faucet from "./components/Faucet/Faucet";
import HubTable from "./components/HubTable/HubTable";
import PanelTable from "./components/PanelTable/PanelTable";
import PanelTitle from "./components/PanelTitle/PanelTitle";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { useSelector } from "react-redux";
import useGetFarmCreators from "./hooks/useGetFarmCreators";
import { SWRConfig } from "swr";
import BecomeCreator from "./components/PanelTable/BecomeCreator";

const Panel = () => {
  const address = useSelector(selectUserAddress);
  const { creators, isLoading } = useGetFarmCreators(SWRConfig);
  const isCreator = Boolean(
    creators.find((creatorAddress) => creatorAddress === address)
  );

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
        {
          !isCreator && !isLoading
          ?
          <BecomeCreator/>
          :
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
        }
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Panel));
