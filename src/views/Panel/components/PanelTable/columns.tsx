import { Flex } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import dynamic from "next/dynamic";
import { useState } from "react";

import { ITableData } from "views/Panel/types";

const UnboundingModal: any = dynamic(() =>
  import("../UnboundingModal/UnboundingModal")
);
const DespositModal: any = dynamic(() =>
  import("../DespositModal/DespositModal")
);

export const panelColumns = [
  {
    Header: "Pool/Farm id",
    accessor: "id",
    Cell: ({ row }) => {
      const data: ITableData = row.original;

      return <Flex justify={"center"}>{data.id}</Flex>;
    },
  },
  {
    Header: "Staked Token",
    accessor: "stakedToken",
    Cell: ({ row }) => {
      const data: ITableData = row.original;

      return (
        <Flex display={"flex"} alignItems={"center"} justify={"center"}>
          {data.stakedToken}
        </Flex>
      );
    },
  },
  {
    Header: "Reward Token",
    accessor: "rewardsToken",
    Cell: ({ row }) => {
      const data: ITableData = row.original;
      return <Flex justify={"center"}>{data.rewardsToken}</Flex>;
    },
  },
  {
    Header: "Reward Until",
    accessor: "date",
    Cell: ({ row }) => {
      const data: ITableData = row.original;
      return <Flex justify={"center"}>{data.date}</Flex>;
    },
  },
  {
    Header: "Actions",
    accessor: "",
    Cell: ({ row }) => {
      const [openUnboundmodal, setopenUnboundmodal] = useState(false);
      const handleToggleUnbounding = () => {
        setopenUnboundmodal((s) => !s);
      };
      const [openDepositdmodal, setopenDepositmodal] = useState(false);
      const handleToggleDeposit = () => {
        setopenDepositmodal((s) => !s);
      };
      return (
        <Flex flexDir={"column"} gap={4}>
          <ActionButton onClick={handleToggleUnbounding}>
            Set Unbound
          </ActionButton>
          <ActionButton onClick={handleToggleDeposit}>
            Deposit Rewards
          </ActionButton>

          {openUnboundmodal && (
            <UnboundingModal
              isOpen={openUnboundmodal}
              onClose={handleToggleUnbounding}
            />
          )}
          {openDepositdmodal && (
            <DespositModal
              isOpen={openDepositdmodal}
              onClose={handleToggleDeposit}
            />
          )}
        </Flex>
      );
    },
  },
];
