import { Box, Center, Flex, Link, Switch } from "@chakra-ui/react";
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
import { InfoIcon } from "@chakra-ui/icons";
import AutoHarvestInfoModal from "views/Admin/Views/Farms/AutoHarvestInfoModal";

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

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        await Promise.all([
          dispatch(fetchUserInfo(address)),
          dispatch(fetchRanking(address)),
          dispatch(fetchWithdrawInfo(address)),
          dispatch(fetchUSerFarmInfo(address)),
          dispatch(fetchUSerRewardsInfo(address)),
          dispatch(fetchPrice()),
          dispatch(fetchIndex()),
          dispatch(fetchGeneralInfo()),
          dispatch(fetchMultiFarms2RewardsLeft()),
          dispatch(fetchStats()),
          dispatch(fetchAllFarms()),
        ]);
  
        setIsLoading(false); // Set loading state to false once all the requests are completed
      }
    };
  
    fetchData();
  }, [address, dispatch]);
  
  const handleToggle = () => {
    if (!isLoading) { // Only run the logic if the data fetching is completed
      setIsOpen(!isOpen);
  
      if (!isOpen) {
        const newFarm2 = farms2.filter((farm) => {
          return userFarm2Info.data.some(
            (userFarm) =>
              userFarm.farmId === farm.farm.farmId &&
              Number(userFarm.stakedBalance) > 0
          );
        });
        setFarms2ToSearch(newFarm2);
        setproteoPoolsArrToSearch([]);
      } else {
        setFarms2ToSearch(farms2);
        setproteoPoolsArrToSearch(proteoPoolsArr);
      }
    }
  };

  const isSmallDevice = window.innerWidth <= 768;
  const [modalOpen, setModalOpen] = useState(false);

  const handleInfoModal = async () => {
      setModalOpen(!modalOpen);
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
            tvlText = "Total value Locked in Pools"
          />
          <Flex w="full" justifyContent={"flex-end"} mt={{ xs: "10px", md: "30px" }}>
            {!isSmallDevice && <Flex w="50px" alignItems="center" justifyContent={"flex-start"} mt={{ xs: "30px", md: "30px" }} onClick={handleInfoModal}>
              <InfoIcon color="white" ml="3" boxSize={6} onClick={handleInfoModal}/>
            </Flex>}
            <Flex w="full" gap={isSmallDevice ? "15px" : "50px"} alignItems="center" justifyContent={isSmallDevice ? "flex-start" : "flex-end"} mt={{ xs: "30px", md: "30px" }} whiteSpace={"nowrap"}>
              { address && (<Flex alignItems="center" gap="10px">
                  <Switch size="md" isChecked={isOpen} colorScheme="teal" onChange={handleToggle} />
                  <Box>My Pools</Box>
                </Flex>
              )}
              <Search onChange={handleSearch}/>
            </Flex>
            {isSmallDevice && <Flex w="20px" alignItems="center" justifyContent={"flex-end"} mt={{ xs: "30px", md: "30px" }} onClick={handleInfoModal}>
              <InfoIcon color="white" ml="3" boxSize={6} onClick={handleInfoModal}/>
            </Flex>}
          </Flex>
          {modalOpen && 
            <AutoHarvestInfoModal onClose={() => setModalOpen(false)}/>
          }
          <Center mt={{ xs: "15px", md: "30px" }} w="full">
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
