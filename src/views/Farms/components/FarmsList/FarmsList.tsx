import { Center, Flex } from "@chakra-ui/react";
import FarmsCard from "components/Farms/FarmsCard/FarmsCard";
import Search from "components/Farms/Search/Search";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectFarms,
  selectUserFarms2Info,
  selectUserFarms2Rewards,
} from "redux/slices/farms2/farms2-slice";
import { formatTokenI } from "utils/functions/tokens";
import { proteoFarmsArr } from "views/Farms/constants";

const FarmsList = () => {
  const userFarm2Info = useSelector(selectUserFarms2Info);
  const userFarm2Rewards = useSelector(selectUserFarms2Rewards);
  const farms2 = useSelector(selectFarms);

  const [farms2ToSearch, setFarms2ToSearch] = useState(farms2);
  const [proteoFarmsArrToSearch, setproteoFarmsArrToSearch] = useState(
    proteoFarmsArr
  );

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

  return (
    <>
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
            userFarm2Rewards: userFarm2Rewards.data,
          }}
        />
      </Center>
    </>
  );
};

export default FarmsList;
