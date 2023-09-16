import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import WrapperPages from "hoc/WrapperPages";
import { Suspense, useEffect } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import Layout from "components/Layout/Layout";
import MyTabs from "components/MyTabs/MyTabs";
import withElronDapp from "hoc/withElronDapp";
import { useAppSelector } from "utils/hooks/redux";
import ElBadges from "./Views/Badges/ElBadges/ElBadges";
import Farms from "./Views/Farms/Farms";
import QxTags from "./Views/QxTags/QxTags";
import Hoot from "./Views/Hoot/Hoot";
import SmartSwap from "./Views/Swap/SmarSwap";

const DCAAdmin: any = dynamic(() => import("./Views/DCAAdmin/DCAAdmin"));
const ProteoElite: any = dynamic(
  () => import("./Views/ProteoElite/ProteoElite")
);
const FastSwap: any = dynamic(() => import("./Views/FastSwap/FastSwap"));

const AdminView = () => {
  const Router = useRouter();
  const myConnectedAddress = useAppSelector(
    (state) => state.userAccount.connectedAddress
  );
  const isAdmin = useAppSelector((state) => state.userAccount.isAdmin);

  useEffect(() => {
    if (!isAdmin) {
      Router.push("/");
    }
  }, [Router, isAdmin]);

  return (
    <Layout>
      <Box position={"relative"}>
        <MyTabs
          tabListWarapperProps={{
            mb: 10,
            display: "flex",
            alignItems: "center",
            flexDir: "column",
            w: "full",
          }}
          tabData={[
            {
              tabText: "Farms",
              tabPanel: (
                <LayOut>
                  <Farms />
                </LayOut>
              ),
            },
            {
              tabText: "Swap",
              tabPanel: (
                <LayOut>
                  <SmartSwap />
                </LayOut>
              ),
            },
            {
              tabText: "DCA",
              tabPanel: (
                <LayOut>
                  <DCAAdmin address={myConnectedAddress} />
                </LayOut>
              ),
            },
            // {
            //   tabText: "Proteo",
            //   tabPanel: (
            //     <LayOut>
            //       <ProteoElite userAddress={myConnectedAddress} />
            //     </LayOut>
            //   ),
            // },
            /* {
              tabText: "Fastp2pSwap",
              tabPanel: (
                <LayOut>
                  <FastSwap />
                </LayOut>
              ),
            }, */
            {
              tabText: "Rewards",
              tabPanel: (
                <LayOut>
                  <ElBadges />
                </LayOut>
              ),
            },
            {
              tabText: "QxTags",
              tabPanel: (
                <LayOut>
                  <QxTags />
                </LayOut>
              ),
            },
            {
              tabText: "Hoot",
              tabPanel: (
                <LayOut>
                  <Hoot />
                </LayOut>
              ),
            },
          ]}
        />
      </Box>
    </Layout>
  );
};


export default withElronDapp(WrapperPages(AdminView));


const LayOut = ({ children }) => {
  return (
    <Suspense
      fallback={
        <Center minHeight={"500px"}>
          <Spinner size={"xl"} />
        </Center>
      }
    >
      <Center flexDirection={"column"} width="full" overflow={"auto"}>
        <Flex width={"95%"} margin="auto" justifyContent={"center"}>
          {children}
        </Flex>
      </Center>
    </Suspense>
  );
};
