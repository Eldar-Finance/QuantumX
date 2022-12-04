import { Box } from "@chakra-ui/react";
import SearchTable from "components/Tables/SearchTable";
import { useSelector } from "react-redux";
import { selectCreatorsFarms } from "redux/slices/farms2/farms2-slice";
import { IScPanelFarms } from "utils/types/sc.interface";
import { panelColumns } from "./columns";

const PanelTable = () => {
  const tableData: IScPanelFarms[] = useSelector(selectCreatorsFarms).data;
  return (
    <Box w="full" maxW={"1000px"} mx="auto" minH="70vh" overflow={"auto"}>
      <SearchTable tableData={tableData} columnsData={panelColumns} />
    </Box>
  );
};

export default PanelTable;
