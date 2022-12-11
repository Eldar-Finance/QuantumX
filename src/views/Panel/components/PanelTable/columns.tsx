import { Flex, Icon } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { ToolIcon } from "components/Icons/ui";
import { useState } from "react";
import { formatTokenI } from "utils/functions/tokens";
import { IScPanelFarms } from "utils/types/sc.interface";

import ActionsModal from "../ActionsModal/ActionsModal";

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
      const handleOpenModal = () => {
        setopenModal((s) => !s);
      };

      return (
        <Flex flexDir={"column"} gap={4}>
          <ActionButton onClick={handleOpenModal}>
            <Icon as={ToolIcon} />
          </ActionButton>
          <ActionsModal
            isOpen={openModal}
            onClose={handleOpenModal}
            farm={data}
          />
        </Flex>
      );
    },
  },
];
