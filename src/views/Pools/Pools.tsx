import { Center, Flex } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import ProteoFarmsCard from "components/Farms/FarmsCard/FarmsCard";
import Search from "components/Farms/Search/Search";
import Title from "components/Farms/Title/Title";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import { useEffect, useState } from "react";
import { fetchStats } from "redux/slices/elrond/elrond-slice";
import { selectUserFarms2Info } from "redux/slices/farms2/farms2-slice";
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
import { proteoPoolsArr } from "./constants";
const Pools = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  // const farms2 = useAppSelector(selectAllFarms2);
  const userFarm2Info = useAppSelector(selectUserFarms2Info);

  // const [farms2ToSearch, setFarms2ToSearch] = useState(farms2.data);
  const [proteoPoolsArrToSearch, setproteoPoolsArrToSearch] = useState(
    proteoPoolsArr
  );

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

  // useEffect(() => {
  //   if (farms2.data) {
  //     setFarms2ToSearch(farms2.data);
  //   }
  // }, [farms2.data]);

  const handleSearch = (query: string) => {
    if (query === "") {
      setproteoPoolsArrToSearch(proteoPoolsArr);
    } else {
      // const newFarm2 = farms2.data.filter((farm) => {
      //   return (
      //     formatTokenI(farm.farm.stakingToken)
      //       .toString()
      //       .toLowerCase()
      //       .indexOf(query.toLowerCase()) > -1
      //   );
      // });
      const newProteoFarms = proteoPoolsArr.filter((farm) => {
        return (
          farm.stakedCoin
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        );
      });

      // setFarms2ToSearch(newFarm2);
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
          <Title title="Pools" subtitle="Stake in Single Asset (SA) Pools" />
          <Flex w="full" justifyContent={"flex-end"} mt="12">
            <Flex gap="20px">
              <Search onChange={handleSearch} />
              {/* <Selector
                onchange={(e) => console.log(e)}
                sortKey="new"
                sorts={["new", "amount"]}
              /> */}
            </Flex>
          </Flex>
          <Center mt="50px" w="full">
            <ProteoFarmsCard proteoArr={proteoPoolsArrToSearch} />
          </Center>
        </Flex>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Pools));
