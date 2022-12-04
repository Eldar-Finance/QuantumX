import { Center, Flex } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import ProteoFarmsCard from "components/Farms/FarmsCard/FarmsCard";
import Search from "components/Farms/Search/Search";
import Selector from "components/Farms/Selector/Selector";
import Title from "components/Farms/Title/Title";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import { useEffect } from "react";
import { fetchStats } from "redux/slices/elrond/elrond-slice";
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
import { proteoFarmsArr } from "./constants";

const Farms = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  useEffect(() => {
    if (address) {
      dispatch(fetchUserInfo(address));
      dispatch(fetchRanking(address));
      dispatch(fetchWithdrawInfo(address));

      dispatch(fetchGeneralInfo());
      dispatch(fetchPrice());
      dispatch(fetchIndex());
      dispatch(fetchStats());
    }
  }, [address, dispatch]);
  return (
    <Layout>
      <MyContainer pb="100px">
        <Flex
          w="full"
          justifyContent={"center"}
          flexDir="column"
          alignContent={"center"}
          maxW="1000px"
          mx="auto"
        >
          <Title title="Farms" subtitle="Stake Liquidity Pool (LP) tokens" />
          <Flex w="full" justifyContent={"flex-end"} mt="12">
            <Flex gap="20px">
              <Search />
              <Selector
                onchange={(e) => console.log(e)}
                sortKey="new"
                sorts={["new", "amount"]}
              />
            </Flex>
          </Flex>
          <Center mt="50px" w="full">
            <ProteoFarmsCard proteoArr={proteoFarmsArr} />
          </Center>
        </Flex>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Farms));
