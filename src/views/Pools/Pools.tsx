import { Box, Center, Flex, Link } from "@chakra-ui/react";
import auditImg from "assets/farms/audit.png";
import MyContainer from "components/Container/Container";
import ProteoFarmsCard from "components/Farms/FarmsCard/FarmsCard";
import Search from "components/Farms/Search/Search";
import Title from "components/Farms/Title/Title";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchStats } from "redux/slices/elrond/elrond-slice";
import {
  selectPools,
  selectUserFarms2Info,
  selectUserFarms2Rewards,
} from "redux/slices/farms2/farms2-slice";
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
import { formatTokenI } from "utils/functions/tokens";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import useGetTotalValuePools from "utils/hooks/useGetTotalValuePools";
import { proteoPoolsArr } from "./constants";

const Pools = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  const farms2 = useSelector(selectPools);
  const userFarm2Info = useSelector(selectUserFarms2Info);
  const userFarm2Rewards = useSelector(selectUserFarms2Rewards);

  const [farms2ToSearch, setFarms2ToSearch] = useState(farms2);
  const [proteoPoolsArrToSearch, setproteoPoolsArrToSearch] = useState(
    proteoPoolsArr
  );

  const totalValueLocked = useGetTotalValuePools();

  useEffect(() => {
    if (address) {
      //farms from proteo
      dispatch(fetchUserInfo(address));
      dispatch(fetchRanking(address));
      dispatch(fetchWithdrawInfo(address));

      //farms from oteher farms (Quantumn smart constract)
      dispatch(fetchUSerFarmInfo(address));
      dispatch(fetchUSerRewardsInfo(address));
    }
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

  useEffect(() => {
    if (farms2) {
      setFarms2ToSearch(farms2);
    }
  }, [farms2]);

  const handleSearch = (query: string) => {
    if (query === "") {
      setFarms2ToSearch(farms2);
      setproteoPoolsArrToSearch(proteoPoolsArr);
    } else {
      const newFarm2 = farms2.filter((farm) => {
        return (
          formatTokenI(farm.farm.stakingToken)
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        );
      });
      const newProteoFarms = proteoPoolsArr.filter((farm) => {
        return (
          farm.stakedCoin
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        );
      });

      setFarms2ToSearch(newFarm2);
      setproteoPoolsArrToSearch(newProteoFarms);
    }
  };

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
            title="Pools"
            subtitle="Stake in Single Asset (SA) Pools"
            amount={totalValueLocked}
          />
          <Flex w="full" justifyContent={"flex-end"} mt="12">
            <Flex gap="20px">
              <Search onChange={handleSearch} />
            </Flex>
          </Flex>
          <Center mt="50px" w="full">
            <ProteoFarmsCard
              proteoArr={proteoPoolsArrToSearch}
              othersArr={{
                allFarms: farms2ToSearch,
                userFarmInfo: userFarm2Info.data,
                userFarm2Rewards: userFarm2Rewards.data,
              }}
              isPool
            />
          </Center>
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

export default withElronDapp(WrapperPages(Pools));
