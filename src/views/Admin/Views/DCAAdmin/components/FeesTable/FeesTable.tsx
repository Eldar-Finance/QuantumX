import { Card, CardBody, CardHeader, Center, Text } from "@chakra-ui/react";
import SearchTable from "components/Tables/SearchTable";
import { useEffect } from "react";
import { selectFees } from "redux/slices/dca/dca-slice";
import { fetchFeesInfo } from "redux/slices/dca/func";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { dataColumns } from "./columns";

// Data
const FeesTable = () => {
  const { data: tableData } = useAppSelector(selectFees);
  // const tableData = [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeesInfo());
  }, [dispatch]);
  if (tableData.length === 0) {
    return (
      <Card px="0px" mb={{ xs: "15px", lg: "0px" }} w="100%">
        <CardHeader px="12px"></CardHeader>
        <CardBody w="100%">
          <Center w="100%" mt="34px" mb="34px">
            <Text fontSize={"xl"}>Empty data</Text>
          </Center>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card
      px="0px"
      mb={{ xs: "15px", lg: "0px" }}
      overflowX="auto"
      bg="secondary"
    >
      <CardHeader px="12px"></CardHeader>
      <CardBody>
        <SearchTable tableData={tableData} columnsData={dataColumns} />
      </CardBody>
    </Card>
  );
};

export default FeesTable;
