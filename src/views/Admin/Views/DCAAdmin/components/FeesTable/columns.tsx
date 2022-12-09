import { Flex, Input, Stack, Text } from "@chakra-ui/react";
import { BytesValue, U64Value } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import { dcaWsp } from "api/sc/sc";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import { useState } from "react";

export const dataColumns = [
  {
    Header: "Category",
    accessor: "category",
    Cell: ({ row }) => {
      const data = row.original;

      return (
        <Stack direction="row">
          <Text
            fontSize={"14px"}
            display={{ xs: "none", md: "flex" }}
            alignItems={"center"}
          >
            {data.category}
          </Text>
        </Stack>
      );
    },
  },
  {
    Header: "Current Value",
    accessor: "fee",
    Cell: ({ row }) => {
      const data = row.original;

      return (
        <Stack direction="row">
          <Text
            fontSize={"14px"}
            display={{ xs: "none", md: "flex" }}
            alignItems={"center"}
          >
            {data.fee}
          </Text>
        </Stack>
      );
    },
  },
  {
    Header: "New Value",
    accessor: "field",
    Cell: ({ row }) => {
      const data = row.original;
      const [fee, setfee] = useState<string>();

      const onUpdate = () => {
        scCall(dcaWsp, "setFee", [
          BytesValue.fromUTF8(data.category),
          new U64Value(new BigNumber(Number(fee) * 100)),
        ]);
      };
      const onDelete = () => {
        scCall(dcaWsp, "deleteFee", [BytesValue.fromUTF8(data.category)]);
      };
      return (
        <Flex alignItems={"center"} gap={3}>
          <Input
            minW="200px"
            maxW="250px"
            placeholder="Fee Value"
            onChange={(e) => setfee(e.target.value)}
          />
          <ActionButton w="50px" px="50px" onClick={onUpdate}>
            Set
          </ActionButton>
          <ActionButton w="50px" px="50px" onClick={onDelete} bg="red.600">
            Delete
          </ActionButton>
        </Flex>
      );
    },
  },
];
