import { DeleteIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { BigUIntValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import { useState } from "react";
import { IHubCreatorInfo } from "utils/types/sc.interface";
import HubActionModal from "../HubActionsModal/HubActionModa";

export interface IHubCreatorTableInfo {
  id: number;
  collection: string;
  cost: string;
  available: number;
  withdrawable: string;
  hub: IHubCreatorInfo;
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
      const [openModal, setopenModal] = useState(false);
      const handleOpenModal = () => {
        setopenModal((s) => !s);
      };

      const handleWithdraw = () => {
        scCall("hubWsp", "withdrawFunds", [
          new BigUIntValue(new BigNumber(data.id)),
        ]);
      };
      const handleDelete = () => {
        scCall("hubWsp", "deleteOffer", [
          new BigUIntValue(new BigNumber(data.id)),
        ]);
      };

      return (
        <>
          <Flex alignItems={"center"} gap={3}>
            <Flex flexDir={"column"} gap={4}>
              <ActionButton onClick={handleOpenModal}>
                Add/Remove NFTs
              </ActionButton>
              <ActionButton onClick={handleWithdraw}>
                Withdraw funds
              </ActionButton>
            </Flex>
            <ActionButton onClick={handleDelete}>
              <DeleteIcon />
            </ActionButton>
          </Flex>

          <HubActionModal
            isOpen={openModal}
            onClose={handleOpenModal}
            hubInfo={data.hub}
          />
        </>
      );
    },
  },
];
