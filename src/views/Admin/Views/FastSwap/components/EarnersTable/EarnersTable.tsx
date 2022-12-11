import { Card, CardBody, CardHeader, Center, Text } from "@chakra-ui/react";
import SearchTable from "components/Tables/SearchTable";
import { useEffect } from "react";
import { selectEarnersInfo } from "redux/slices/fastSwap/fastSwap";
import { fetchEarnersInfo } from "redux/slices/fastSwap/funcs";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";

// Data
import { earnersColumns } from "./columns";
const EarnersTable = () => {
  const { data: tableData } = useAppSelector(selectEarnersInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEarnersInfo());
  }, [dispatch]);
  if (tableData.length === 0) {
    return (
      <Card px="0px" mb={{ xs: "15px", lg: "0px" }} w="100%" bg="secondary">
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
      bg="black.baseDark"
    >
      <CardBody>
        <SearchTable tableData={tableData} columnsData={earnersColumns} />
      </CardBody>
    </Card>
  );
};

export default EarnersTable;
