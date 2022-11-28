import { Box, Card } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";

import Layout from "components/Layout/Layout";
import MyTabs from "components/MyTabs/MyTabs";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import SwapCard from "./components/SwapP2P/SwapCard/SwapCard";
import WrapEgld from "./components/SwapP2P/WrapEgld/WrapEgld";

const Swap = () => {
  return (
    <Layout>
      <MyContainer
        display={"flex"}
        flexDir="column"
        alignItems={"center"}
        pb={"500px"}
      >
        <Card
          maxW={"620px"}
          bg="black.light"
          p={{ xs: "20px", md: "56px" }}
          borderRadius={{ xs: "xl", md: "4xl" }}
        >
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
                tabText: "P2P Swap",
                tabPanel: (
                  <Box>
                    <WrapEgld />
                    <SwapCard />{" "}
                  </Box>
                ),
              },
              {
                tabText: "Swap Lp",
                tabPanel: <SwapCard />,
              },
              {
                tabText: "LKMEX Swap",
                tabPanel: <SwapCard />,
              },
            ]}
          />
        </Card>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Swap));
