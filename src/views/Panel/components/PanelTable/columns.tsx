import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, Icon } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { ToolIcon } from "components/Icons/ui";
import dynamic from "next/dynamic";
import { useState } from "react";
import { formatTokenI } from "utils/functions/tokens";
import { IScPanelFarms } from "utils/types/sc.interface";

const ActionsModal: any = dynamic(() => import("../ActionsModal/ActionsModal"));
const ReporModal: any = dynamic(() => import("../ReporModal/ReporModal"));
export const panelColumns = [
  {
    Header: "Pool/Farm id",
    accessor: "id",
    Cell: ({ row }) => {
      const data: IScPanelFarms = row.original;

      return <Flex>{data.farm.farmId}</Flex>;
    },
  },
  {
    Header: "Staked Token",
    accessor: "stakedToken",
    Cell: ({ row }) => {
      const data: IScPanelFarms = row.original;

      return (
        <Flex display={"flex"} alignItems={"center"} justify={"center"}>
          {formatTokenI(data.farm.stakingToken)}
        </Flex>
      );
    },
  },
  {
    Header: "Reward Token",
    accessor: "rewardsToken",
    Cell: ({ row }) => {
      const data: IScPanelFarms = row.original;
      return (
        <Flex justify={"center"}> {formatTokenI(data.farm.rewardToken)}</Flex>
      );
    },
  },
  {
    Header: "Reward Until",
    accessor: "date",
    Cell: ({ row }) => {
      const data = row.original;
      return <Flex justify={"center"}> {data.days}</Flex>;
    },
  },
  {
    Header: "Actions",
    accessor: "",
    Cell: ({ row }) => {
      const data: IScPanelFarms = row.original;
      const [openModal, setopenModal] = useState(false);
      const [openReportInfo, setOpenReportInfo] = useState(false);
      const handleOpenModal = () => {
        setopenModal((s) => !s);
      };
      const handleOpenReportModal = () => {
        setOpenReportInfo((s) => !s);
      };

      return (
        <Flex flexDir={"column"} gap={4}>
          <ActionButton onClick={handleOpenModal}>
            <Icon as={ToolIcon} />
          </ActionButton>
          <ActionButton onClick={handleOpenReportModal}>
            <Icon as={HamburgerIcon} />
          </ActionButton>
          {openModal && (
            <ActionsModal
              isOpen={openModal}
              onClose={handleOpenModal}
              farm={data}
            />
          )}
          {openReportInfo && (
            <ReporModal
              isOpen={openReportInfo}
              onClose={handleOpenModal}
              farmId={data.farm.farmId}
            />
          )}
        </Flex>
      );
    },
  },
];
