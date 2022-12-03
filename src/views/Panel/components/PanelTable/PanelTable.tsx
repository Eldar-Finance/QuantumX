import { Box } from "@chakra-ui/react";
import SearchTable from "components/Tables/SearchTable";
import { panelColumns } from "./columns";

const PanelTable = () => {
  return (
    <Box w="full" maxW={"1000px"} mx="auto" minH="70vh" overflow={"auto"}>
      <SearchTable
        tableData={[
          {
            id: 2132,
            stakedToken: "EGLD",
            rewardsToken: "EGLD",
            date: "12/12/2021",
          },
          {
            id: 2112,
            stakedToken: "MEX",
            rewardsToken: "EGLD",
            date: "12/12/2021",
          },
          {
            id: 2632,
            stakedToken: "USDC",
            rewardsToken: "PROTEO",
            date: "12/12/2021",
          },
        ]}
        columnsData={panelColumns}
      />
    </Box>
  );
};

export default PanelTable;
