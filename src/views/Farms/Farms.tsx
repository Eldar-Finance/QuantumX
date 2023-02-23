import { Box, Center, Flex, Link } from "@chakra-ui/react";
import auditImg from "assets/farms/audit.png";
import MyContainer from "components/Container/Container";
import Title from "components/Farms/Title/Title";
import Layout from "components/Layout/Layout";
import MyTabs from "components/MyTabs/MyTabs";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import Image from "next/image";
import { useEffect } from "react";
import { fetchStats } from "redux/slices/elrond/elrond-slice";
import {
  fetchAllFarms,
  fetchMultiFarms2RewardsLeft,
  fetchUSerFarmInfo,
  fetchUSerRewardsInfo,
} from "redux/slices/farms2/funcs";
import {
  fetchGeneralInfo,
  fetchIndex,
  fetchPrice,
  fetchRanking,
  fetchUserInfo,
  fetchWithdrawInfo,
} from "redux/slices/proteo/funcs";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import useGetTotalValueInFarms from "utils/hooks/useGetTotalValueInFarms";
import BearlyBonding from "./components/BearlyBonding/BearlyBonding";
import FarmsList from "./components/FarmsList/FarmsList";
const Farms = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  const totalValueLocked = useGetTotalValueInFarms();
  useEffect(() => {
    if (address) {
      //farms from proteo
      dispatch(fetchUserInfo(address));
      dispatch(fetchRanking(address));
      dispatch(fetchWithdrawInfo(address));

      //farms from oteher farms (Quantumn smart constract)
      dispatch(fetchUSerFarmInfo(address));
    }
    dispatch(fetchUSerRewardsInfo(address));
  }, [address, dispatch]);

  useEffect(() => {
    dispatch(fetchPrice());
    dispatch(fetchIndex());
    dispatch(fetchGeneralInfo());
    dispatch(fetchMultiFarms2RewardsLeft());

    //elrond network
    dispatch(fetchStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllFarms());
  }, [dispatch]);
  return (
    <Layout>
      <MyContainer pb="70px">
        <Flex
          w="full"
          justifyContent={"center"}
          flexDir="column"
          alignContent={"center"}
          maxW="1200px"
          mx="auto"
        >
          <Title
            title="Farms"
            subtitle="Stake Liquidity Pool (LP) tokens"
            amount={totalValueLocked}
          />
          <MyTabs
            tabListProps={{
              overflow: "auto",
            }}
            tabsProps={{
              w: "full",
              mt: 14,
            }}
            tabListWarapperProps={{
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
                tabText: "Farms",
                tabPanel: <FarmsList />,
              },
              {
                tabText: "BearlyBonding",
                tabPanel: <BearlyBonding />,
              },
            ]}
          />
        </Flex>
      </MyContainer>
      <Box pb="100px">
        <Center>
          <Link
            isExternal
            href="https://bhero.com/pdf/audits/elrond/SuperRareBears_SmartContract_Audit_FarmsSmartContract_v.0.1.pdf"
          >
            <Image src={auditImg} alt="audit" height={150} />
          </Link>
        </Center>
      </Box>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Farms));
