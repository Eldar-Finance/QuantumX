import { Box } from "@chakra-ui/react";
import SearchTable from "components/Tables/SearchTable";
import { IHubOffer } from "utils/types/sc.interface";
import { hubColumns } from "./columns";

const tableData: IHubOffer[] = [
  {
    id: 1,
    collection: "Bear-1f32",
    available: 100,
    withdrawable: "2500 RARE",
    cost: "100 RARE",
  },
  {
    id: 2,
    collection: "EAPES-3941",
    available: 98,
    withdrawable: "2 EGLD",
    cost: "1 EGLD",
  },
];

const HubTable = () => {
  return (
    <Box w="full" maxW={"1000px"} mx="auto" minH="70vh" overflow={"auto"}>
      <SearchTable tableData={tableData} columnsData={hubColumns} />
    </Box>
  );
};

export default HubTable;
