import { Center, Flex } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import FarmsCard from "components/Farms/FarmsCard/FarmsCard";
import Search from "components/Farms/Search/Search";
import Title from "components/Farms/Title/Title";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchStats } from "redux/slices/elrond/elrond-slice";
import {
  selectFarms,
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
import { formatTokenI } from "utils/functions/tokens";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import useGetTotalValueInFarms from "utils/hooks/useGetTotalValueInFarms";
import { proteoFarmsArr } from "./constants";

const Farms = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  const userFarm2Info = useSelector(selectUserFarms2Info);
  const farms2 = useSelector(selectFarms);

  const [farms2ToSearch, setFarms2ToSearch] = useState(farms2);
  const [proteoFarmsArrToSearch, setproteoFarmsArrToSearch] = useState(
    proteoFarmsArr
  );

  useEffect(() => {
    if (address) {
      //farms from proteo
      dispatch(fetchUserInfo(address));
      dispatch(fetchRanking(address));
      dispatch(fetchWithdrawInfo(address));

      //farms from oteher farms (Quantumn smart constract)
      dispatch(fetchUSerFarmInfo(address));
    }
  }, [address, dispatch]);

  useEffect(() => {
    dispatch(fetchPrice());
    dispatch(fetchIndex());
    dispatch(fetchGeneralInfo());
    dispatch(fetchAllFarms());

    //elrond network
    dispatch(fetchStats());
  }, [dispatch]);
  useEffect(() => {
    if (farms2) {
      setFarms2ToSearch(farms2);
    }
  }, [farms2]);

  const handleSearch = (query: string) => {
    if (query === "") {
      setFarms2ToSearch(farms2);
      setproteoFarmsArrToSearch(proteoFarmsArr);
    } else {
      const newFarm2 = farms2.filter((farm) => {
        return (
          formatTokenI(farm.farm.stakingToken)
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        );
      });
      const newProteoFarms = proteoFarmsArr.filter((farm) => {
        return (
          farm.stakedCoin
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        );
      });

      setFarms2ToSearch(newFarm2);
      setproteoFarmsArrToSearch(newProteoFarms);
    }
  };

  const totalValueLocked = useGetTotalValueInFarms();

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
          <Title
            title="Farms"
            subtitle="Stake Liquidity Pool (LP) tokens"
            amount={totalValueLocked}
          />
          <Flex w="full" justifyContent={"flex-end"} mt="12">
            <Flex gap="20px">
              <Search onChange={handleSearch} />
            </Flex>
          </Flex>
          <Center mt="50px" w="full">
            <FarmsCard
              proteoArr={proteoFarmsArrToSearch}
              othersArr={{
                allFarms: farms2ToSearch,
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
