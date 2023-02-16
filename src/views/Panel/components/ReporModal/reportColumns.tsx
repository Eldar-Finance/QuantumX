import { Flex, useClipboard } from "@chakra-ui/react";
import { formatAddress } from "utils/functions/formatAddress";
import { formatBalance } from "utils/functions/formatBalance";
import { getDateForEpoch } from "utils/functions/time";
import { IElrondToken } from "utils/types/elrond.interface";
import { IScFarms2StakersReport } from "utils/types/sc.interface";

export interface IScFarms2StakersReportWithStakedToken
  extends IScFarms2StakersReport {
  stakingToken: IElrondToken;
  currentEpoch: number;
}

export const reportColumns = [
  {
    Header: "Address",
    accessor: "staker",
    Cell: ({ row }) => {
      const data: IScFarms2StakersReportWithStakedToken = row.original;
      const { hasCopied, onCopy } = useClipboard(data.staker);

      return (
        <Flex onClick={onCopy} cursor="pointer" color={hasCopied && "main"}>
          {formatAddress(data.staker)}
        </Flex>
      );
    },
  },
  {
    Header: "Staked Amount",
    accessor: "stakedAmount",
    Cell: ({ row }) => {
      const data: IScFarms2StakersReportWithStakedToken = row.original;

      return (
        <Flex display={"flex"} alignItems={"center"} justify={"center"}>
          {formatBalance({
            balance: data.stakedAmount,
            decimals: data.stakingToken.decimals,
          })}
        </Flex>
      );
    },
  },
  {
    Header: "Last Stake",
    accessor: "lastStake",
    Cell: ({ row }) => {
      const data: IScFarms2StakersReportWithStakedToken = row.original;
      return (
        <Flex justify={"center"}>
          {" "}
          {getDateForEpoch(data.lastStake, data.currentEpoch)}
        </Flex>
      );
    },
  },
  {
    Header: "Last Unstake",
    accessor: "lastUnstake",
    Cell: ({ row }) => {
      const data: IScFarms2StakersReportWithStakedToken = row.original;
      return (
        <Flex justify={"center"}>
          {" "}
          {getDateForEpoch(data.lastUnstake, data.currentEpoch)}
        </Flex>
      );
    },
  },
  {
    Header: "Last Harvest",
    accessor: "lastHarvest",
    Cell: ({ row }) => {
      const data: IScFarms2StakersReportWithStakedToken = row.original;
      return (
        <Flex justify={"center"}>
          {" "}
          {getDateForEpoch(data.lastHarvest, data.currentEpoch)}
        </Flex>
      );
    },
  },
];
