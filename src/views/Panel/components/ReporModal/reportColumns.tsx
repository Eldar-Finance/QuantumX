import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { formatAddress } from "utils/functions/formatAddress";
import { IScFarms2StakersReport } from "utils/types/sc.interface";

const ActionsModal: any = dynamic(() => import("../ActionsModal/ActionsModal"));
const ReporModal: any = dynamic(() => import("./ReporModal"));
export const reportColumns = [
  {
    Header: "Address",
    accessor: "staker",
    Cell: ({ row }) => {
      const data: IScFarms2StakersReport = row.original;

      return <Flex>{formatAddress(data.staker)}</Flex>;
    },
  },
  {
    Header: "Staked Amount",
    accessor: "stakedAmount",
    Cell: ({ row }) => {
      const data: IScFarms2StakersReport = row.original;

      return (
        <Flex display={"flex"} alignItems={"center"} justify={"center"}>
          {data.stakedAmount}
        </Flex>
      );
    },
  },
  {
    Header: "Last Stake",
    accessor: "lastStake",
    Cell: ({ row }) => {
      const data: IScFarms2StakersReport = row.original;
      return <Flex justify={"center"}> {data.lastStake}</Flex>;
    },
  },
  {
    Header: "Last Unstake",
    accessor: "lastUnstake",
    Cell: ({ row }) => {
      const data: IScFarms2StakersReport = row.original;
      return <Flex justify={"center"}> {data.lastUnstake}</Flex>;
    },
  },
  {
    Header: "Last Harvest",
    accessor: "lastHarvest",
    Cell: ({ row }) => {
      const data: IScFarms2StakersReport = row.original;
      return <Flex justify={"center"}> {data.lastHarvest}</Flex>;
    },
  },
  {
    Header: "Rewards Harvested",
    accessor: "rewardsHarvested",
    Cell: ({ row }) => {
      const data: IScFarms2StakersReport = row.original;
      return <Flex justify={"center"}> {data.rewardsHarvested}</Flex>;
    },
  },
];
