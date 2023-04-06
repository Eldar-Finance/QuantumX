import {
  Box,
  Center,
  CloseButton,
  Flex,
  Heading,
  ModalHeader,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { getNetworkStats } from "api/rest/elrondApi/network";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";
import SearchTable from "components/Tables/SearchTable";
import { useState } from "react";
import useSWR from "swr";
import { exportToCsv, exportToExcel } from "utils/functions/array";
import { formatBalance } from "utils/functions/formatBalance";
import { getDateForEpoch } from "utils/functions/time";
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
const exportOptions = [
  {
    value: "csv",
    label: "CSV",
  },
  {
    value: "excel",
    label: "EXCEL",
  },
];

const ReporModal = ({ isOpen, onClose, farmId, stakedToken }: IProps) => {
  const swrConfig = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  };
  const { report, isLoading } = useGetStakersReport(farmId);
  const { token } = useGetElrondToken(stakedToken);
  const { data: statsRes } = useSWR("/stats", getNetworkStats, swrConfig);
  const [exportMethod, setExportMethod] = useState(exportOptions[0].value);
  const handleExportReport = () => {
    const dataToExport = report.map((r) => {
      const data = {
        address: r.staker,
        stakedAmount: formatBalance({
          balance: r.stakedAmount,
          decimals: token.decimals,
        }),
        lastStake: getDateForEpoch(r.lastStake, statsRes.data.epoch),
        lastUnstake: getDateForEpoch(r.lastUnstake, statsRes.data.epoch),
        lastHarvest: getDateForEpoch(r.lastHarvest, statsRes.data.epoch),
      };
      return data;
    });

    switch (exportMethod) {
      case exportOptions[0].value:
        exportToCsv(dataToExport, "stakers-report.csv");
        break;

      case exportOptions[1].value:
        exportToExcel(dataToExport, "stakers-report.xlsx");
        break;

      default:
        break;
    }
  };
  const handleSelectExporMethod = (e) => {
    setExportMethod(e.target.value);
  };
  return (
    <MyModal isOpen={isOpen} onClose={onClose} size={"4xl"} isCentered={false}>
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
            <Flex width="full" justifyContent={"flex-end"} px={10} gap={5}>
              <Box width="120px !important">
                <Select onChange={handleSelectExporMethod} value={exportMethod}>
                  {exportOptions.map((o) => {
                    return (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    );
                  })}
                </Select>
              </Box>
              <ActionButton onClick={handleExportReport}>Export</ActionButton>
            </Flex>
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
