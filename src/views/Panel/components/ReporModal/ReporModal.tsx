import { Box, Center, Spinner } from "@chakra-ui/react";
import MyModal from "components/Modal/Modal";
import SearchTable from "components/Tables/SearchTable";
import useGetStakersReport from "views/Panel/hooks/useGetStakersReport";
import { reportColumns } from "./reportColumns";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  farmId: number;
}

const ReporModal = ({ isOpen, onClose, farmId }: IProps) => {
  const { report, isLoading } = useGetStakersReport(farmId);
  return (
    <MyModal isOpen={isOpen} onClose={onClose} size={"4xl"}>
      <Box w="full" maxW={"1000px"} mx="auto" minH="70vh" overflow={"auto"}>
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <Box>
            <SearchTable tableData={report} columnsData={reportColumns} />
          </Box>
        )}
      </Box>
    </MyModal>
  );
};

export default ReporModal;
