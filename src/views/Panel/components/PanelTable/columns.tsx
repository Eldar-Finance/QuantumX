import { HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import { Flex, HStack, Icon, Link, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { ToolIcon } from "components/Icons/ui";
import { network } from "api/net.config";
import dynamic from "next/dynamic";
import { useState } from "react";
import { formatAddress } from "utils/functions/formatAddress";
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
    Header: "Creator",
    accessor: "creator",
    Cell: ({ row }) => {
      const data: IScPanelFarms = row.original;
      const address = data.farm.creator;

      return (
        <Flex display={"flex"} alignItems={"center"} justify={"center"}>
          <Link
            isExternal
            href={`${network.explorerAddress}/accounts/${address}`}
            aria-label="find in explorer"
            whiteSpace={"nowrap"}
            color={"blue.500"}
          >
            <Flex display={"flex"} alignItems={"center"} justify={"center"}>
              {formatAddress(data.farm.creator)}
            </Flex>
          </Link>
        </Flex>
      );
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
        <Flex display={"flex"} alignItems={"center"} justify={"center"}> {formatTokenI(data.farm.rewardToken || 'MULTIPLE TOKENS')}</Flex>
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
      const closeModal = () => {
        setopenModal(false);
      };
      const closeReport = () => {
        setOpenReportInfo(false);
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
            <ActionsModal isOpen={openModal} onClose={closeModal} farm={data} />
          )}
          {openReportInfo && (
            <ReporModal
              isOpen={openReportInfo}
              onClose={closeReport}
              farmId={data.farm.farmId}
              stakedToken={data.farm.stakingToken}
            />
          )}
        </Flex>
      );
    },
  },
];
