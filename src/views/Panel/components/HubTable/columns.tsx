import { CloseIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";

export interface IHubCreatorTableInfo {
  id: number;
  collection: string;
  cost: string;
  available: number;
  withdrawable: string;
}

export const hubColumns = [
  {
    Header: "OfferID",
    accessor: "id",
    Cell: ({ row }) => {
      const data: IHubCreatorTableInfo = row.original;
      return <Flex>{data.id}</Flex>;
    },
  },
  {
    Header: "NFT Collection",
    accessor: "collection",
    Cell: ({ row }) => {
      const data: IHubCreatorTableInfo = row.original;

      return (
        <Flex
          display={"flex"}
          alignItems={"center"}
          justify={"center"}
          whiteSpace="nowrap"
        >
          {data.collection}
        </Flex>
      );
    },
  },
  {
    Header: "Cost",
    accessor: "cost",
    Cell: ({ row }) => {
      const data: IHubCreatorTableInfo = row.original;
      return (
        <Flex justify={"center"} whiteSpace="nowrap">
          {" "}
          {data.cost}
        </Flex>
      );
    },
  },
  {
    Header: "Avilable NFTs",
    accessor: "available",
    Cell: ({ row }) => {
      const data: IHubCreatorTableInfo = row.original;
      return <Flex justify={"center"}> {data.available}</Flex>;
    },
  },
  {
    Header: "Withdrawable Funds",
    accessor: "withdrawable",
    Cell: ({ row }) => {
      const data: IHubCreatorTableInfo = row.original;
      return <Flex justify={"center"}> {data.withdrawable}</Flex>;
    },
  },
  {
    Header: "Actions",
    accessor: "",
    Cell: ({ row }) => {
      const data: IHubCreatorTableInfo = row.original;

      return (
        <Flex alignItems={"center"} gap={3}>
          <Flex flexDir={"column"} gap={4}>
            <ActionButton>Add/Remove NFTs</ActionButton>
            <ActionButton>Withdaw funds</ActionButton>
          </Flex>
          <ActionButton>
            <CloseIcon />
          </ActionButton>
        </Flex>
      );
    },
  },
];
