import { Box, Center, Flex, Icon, Switch, Tooltip, extendTheme } from "@chakra-ui/react";
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
import { InfoIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import AutoHarvestInfoModal from "views/Admin/Views/Farms/AutoHarvestInfoModal";
import ActionButton from "components/ActionButton/ActionButton";
import HarvestAll from "components/Farms/HarvestAll/HarvestAll";

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

  const isSmallDevice = window.innerWidth <= 768;
  const [modalOpen, setModalOpen] = useState(false);

  const handleInfoModal = async () => {
      setModalOpen(!modalOpen);
  };

  // const userHarvestableFarms = userFarm2Rewards.data.filter((farm) => {
  //   return farm.harvestableAmount > 0 && farms2ToSearch.some((f) => f.farm.farmId === farm.farmId);
  // });
  // console.log("⚠️ ~ harvestable farms: ", userHarvestableFarms)

  return (
    <>
      <Flex w="full" justifyContent={"flex-end"} mt={"1px"}>
        {!isSmallDevice && <Flex w="150px" alignItems="center" justifyContent={"flex-start"} mt={{ xs: "30px", md: "30px" }} onClick={handleInfoModal}>
          {/* <InfoIcon color="white" ml="3" boxSize={6} onClick={handleInfoModal}/> */}
          <ActionButton
              height={"30px"}
              bg="white"
              // mt={5}
              onClick={handleInfoModal}
              disabled={false}
              fontSize={"15px"}
          >
              <InfoIcon/> &nbsp;&nbsp; Auto-Harvest
          </ActionButton>
        </Flex>}
        <Flex w="full" gap={isSmallDevice ? "15px" : "10px"} alignItems="center" justifyContent={isSmallDevice ? "flex-start" : "flex-end"} mt={{ xs: "30px", md: "30px" }} whiteSpace={"nowrap"}>
          { address && (<Flex alignItems="center" gap="10px">
              <Switch size="md" isChecked={isOpen} colorScheme="teal" onChange={handleToggle} />
              <Box>My Farms</Box>
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
      <Center mt={"15px"} w="full">
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
