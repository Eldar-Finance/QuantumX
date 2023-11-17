import { Center, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";
import SearchTable from "components/Tables/SearchTable";
import { useGetEarnersInfo } from "../hooks";

// Data
import { earnersColumns } from "./columns";
const EarnersTable = () => {
  const { earnersInfo: tableData } = useGetEarnersInfo();

  if (tableData.length === 0) {
    return (
      <Card px="0px" mb={{ xs: "15px", lg: "0px" }} w="100%">
        <Center w="100%" mt="34px" mb="34px">
          <Text fontSize={"xl"}>Empty data</Text>
        </Center>
      </Card>
    );
  }

  return (
    <Card
      px="30px"
      mb={{ xs: "15px", lg: "0px" }}
      overflowX="auto"
      h="fit-content"
    >
      <SearchTable tableData={tableData} columnsData={earnersColumns} />
    </Card>
  );
};

export default EarnersTable;
