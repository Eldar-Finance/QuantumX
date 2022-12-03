import MyTabs from "components/MyTabs/MyTabs";
import BuyTab from "./BuyTab/BuyTab";
import OwnedNfts from "./NftsTab/OwnedNfts/OwnedNfts";
import CoinTab from "./WalletTab/CoinTab";

const Dashtabs = () => {
  return (
    <MyTabs
      tabListProps={{
        overflow: "auto",
      }}
      tabsProps={{
        w: "full",
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
          tabText: "Wallet",
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
