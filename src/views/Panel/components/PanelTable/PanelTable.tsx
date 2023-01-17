import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { getNetworkStats } from "api/rest/elrondApi/network";
import ActionButton from "components/ActionButton/ActionButton";
import SearchTable from "components/Tables/SearchTable";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCreatorsFarms } from "redux/slices/farms2/farms2-slice";
import { fetchCreatorsFarms } from "redux/slices/farms2/funcs";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import useSWR from "swr";
import { useAppDispatch } from "utils/hooks/redux";
import { IScPanelFarms } from "utils/types/sc.interface";
import BecomeCreator from "./BecomeCreator";
import { panelColumns } from "./columns";

const NewFarmModal: any = dynamic(() => import("./NewFarmModal"));

const PanelTable = () => {
  const dispatch = useAppDispatch();
  const address = useSelector(selectUserAddress);
  const { onToggle, isOpen } = useDisclosure();
  useEffect(() => {
    if (address) {
      dispatch(fetchCreatorsFarms(address));
    }
  }, [address, dispatch]);
  const creatorsInfo = useSelector(selectCreatorsFarms);
  const tableData: IScPanelFarms[] = creatorsInfo.data;
  const { data: statsRes } = useSWR("/stats", getNetworkStats);

  const currentEpoch = statsRes?.data?.epoch;

  return (
    <Box w="full" maxW={"1000px"} mx="auto" minH="70vh" overflow={"auto"}>
      {creatorsInfo.status === "succeeded" && tableData.length === 0 && (
        <BecomeCreator />
      )}
      {tableData.length > 0 && (
        <Box>
          <Flex justifyContent={"flex-end"} mb={4}>
            <ActionButton onClick={onToggle}>new poo/farm</ActionButton>
          </Flex>
          <SearchTable
            tableData={tableData.map((creatorFarm) => {
              let days = 0;
              if (currentEpoch) {
                days = creatorFarm.lastReawardEpoch - currentEpoch;
              }
              const data = {
                ...creatorFarm,
                days: days,
              };
              return data;
            })}
            columnsData={panelColumns}
          />
        </Box>
      )}

      <NewFarmModal isOpen={isOpen} onClose={onToggle} />
    </Box>
  );
};

export default PanelTable;
