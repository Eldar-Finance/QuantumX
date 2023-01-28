import {
  Box,
  Center,
  CloseButton,
  Flex,
  Heading,
  ModalHeader,
  Spinner,
} from "@chakra-ui/react";
import { getNetworkStats } from "api/rest/elrondApi/network";
import MyModal from "components/Modal/Modal";
import SearchTable from "components/Tables/SearchTable";
import useSWR from "swr";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import useGetStakersReport from "views/Panel/hooks/useGetStakersReport";
import {
  IScFarms2StakersReportWithStakedToken,
  reportColumns,
} from "./reportColumns";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  farmId: number;
  stakedToken: string;
}

const ReporModal = ({ isOpen, onClose, farmId, stakedToken }: IProps) => {
  const { report, isLoading } = useGetStakersReport(farmId);
  const { token } = useGetElrondToken(stakedToken);
  const { data: statsRes } = useSWR("/stats", getNetworkStats);

  return (
    <MyModal isOpen={isOpen} onClose={onClose} size={"4xl"}>
      <ModalHeader>
        <Flex w="full" justify="space-between">
          <Heading>Stakers Report</Heading>
          <CloseButton onClick={onClose} />
        </Flex>
      </ModalHeader>
      <Box w="full" maxW={"1000px"} mx="auto" minH="70vh" overflow={"auto"}>
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <Box>
            <SearchTable
              tableData={report.map((r) => {
                const data: IScFarms2StakersReportWithStakedToken = {
                  ...r,
                  stakingToken: token,
                  currentEpoch: statsRes?.data.epoch,
                };
                return data;
              })}
              columnsData={reportColumns}
            />
          </Box>
        )}
      </Box>
    </MyModal>
  );
};

export default ReporModal;
