import { Card, CardBody, Center, Text } from "@chakra-ui/react";
import SearchTable from "components/Tables/SearchTable";

import { useEffect } from "react";
import { selectFees } from "redux/slices/fastSwap/fastSwap";
import { fetchFeesInfo } from "redux/slices/fastSwap/funcs";
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
      <Card
        px="0px"
        mb={{ xs: "15px", lg: "0px" }}
        w="100%"
        bg="black.baseDark"
      >
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
      bg="black.baseDark"
    >
      <CardBody>
        <SearchTable tableData={tableData} columnsData={dataColumns} />
      </CardBody>
    </Card>
  );
};

export default FeesTable;
