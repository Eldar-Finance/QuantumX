import { Box } from "@chakra-ui/react";
import { getNetworkStats } from "api/rest/elrondApi/network";
import SearchTable from "components/Tables/SearchTable";
import { useSelector } from "react-redux";
import { selectCreatorsFarms } from "redux/slices/farms2/farms2-slice";
import useSWR from "swr";
import { IScPanelFarms } from "utils/types/sc.interface";
import { panelColumns } from "./columns";

const PanelTable = () => {
  const tableData: IScPanelFarms[] = useSelector(selectCreatorsFarms).data;
  const { data: statsRes } = useSWR({}, getNetworkStats);

  const currentEpoch = statsRes?.data?.epoch;

  return (
    <Box w="full" maxW={"1000px"} mx="auto" minH="70vh" overflow={"auto"}>
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
  );
};

export default PanelTable;
