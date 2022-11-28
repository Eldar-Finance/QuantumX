import MyTabs from "components/MyTabs/MyTabs";
import BuyTab from "./BuyTab/BuyTab";
import CoinTab from "./CoinTab/CoinTab";
import OwnedNfts from "./NftsTab/OwnedNfts/OwnedNfts";

const Dashtabs = () => {
  return (
    <MyTabs
      tabListProps={{
        overflow: "auto",
      }}
      tabListWarapperProps={{
        mb: 10,
        display: "flex",
        alignItems: "center",
        flexDir: "column",
        w: "full",
      }}
      tabProps={{
        w: "full",
        display: "flex",
        alignItems: "center",
        flexDir: "column",
      }}
      tabData={[
        {
          tabText: "Coin",
          tabPanel: <CoinTab />,
        },
        {
          tabText: "NFTs",
          tabPanel: <OwnedNfts />,
        },
        {
          tabText: "Buy",
          tabPanel: <BuyTab />,
        },
      ]}
    />
  );
};

export default Dashtabs;
