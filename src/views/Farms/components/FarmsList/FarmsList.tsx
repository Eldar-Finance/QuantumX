import { Box, Center, Flex, Switch, extendTheme } from "@chakra-ui/react";
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
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { useAppSelector } from "utils/hooks/redux";

const FarmsList = () => {
  const userFarm2Info = useSelector(selectUserFarms2Info);
  const userFarm2Rewards = useSelector(selectUserFarms2Rewards);
  const farms2 = useSelector(selectFarms);
  const address = useAppSelector(selectUserAddress);

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

  
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    if (farms2ToSearch.length > 0 && address) {
      setIsLoading(false); // Set loading state to false when farms2ToSearch is not empty
    }
  }, [address, farms2ToSearch]);

  const handleToggle = () => {
    if (!isLoading) { // Only run the logic if the loading state is false
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
      } else {
        setFarms2ToSearch(farms2);
      }
    }
  };

  return (
    <>
      <Flex w="full" justifyContent={"flex-end"} mt="12">
      <Flex w="full" gap="50px" alignItems="center" justifyContent={"flex-end"} mt="12">
          { address && (<Flex alignItems="center" gap="10px">
              <Switch size="md" isChecked={isOpen} colorScheme="teal" onChange={handleToggle} />
              <Box>My Farms</Box>
            </Flex>
          )}
          <Search onChange={handleSearch}/>
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
