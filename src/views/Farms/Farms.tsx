import { Center, Flex } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import FarmsCard from "components/Farms/FarmsCard/FarmsCard";
import Search from "components/Farms/Search/Search";
import Selector from "components/Farms/Selector/Selector";
import Title from "components/Farms/Title/Title";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchStats } from "redux/slices/elrond/elrond-slice";
import {
  selectAllFarms2,
  selectUserFarms2Info,
} from "redux/slices/farms2/farms2-slice";
import { fetchAllFarms, fetchUSerFarmInfo } from "redux/slices/farms2/funcs";
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
  const farms2 = useSelector(selectAllFarms2);
  const userFarm2Info = useSelector(selectUserFarms2Info);
  useEffect(() => {
    if (address) {
      //farms from proteo
      dispatch(fetchUserInfo(address));
      dispatch(fetchRanking(address));
      dispatch(fetchWithdrawInfo(address));
      dispatch(fetchAllFarms());
      dispatch(fetchPrice());
      dispatch(fetchIndex());

      //farms from oteher farms (Quantumn smart constract)
      dispatch(fetchUSerFarmInfo(address));
      dispatch(fetchGeneralInfo());

      //elrond network
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
            <FarmsCard
              proteoArr={proteoFarmsArr}
              othersArr={{
                allFarms: farms2.data,
                userFarmInfo: userFarm2Info.data,
              }}
            />
          </Center>
        </Flex>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Farms));
