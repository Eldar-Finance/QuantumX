import { Center, Stack, Text } from "@chakra-ui/react";
import { formatAddress } from "utils/functions/formatAddress";

export const earnersColumns = [
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => {
      const earner = row.original;

      return (
        <Stack direction="row">
          <Text fontSize={"14px"} alignItems={"center"}>
            {earner.name}
          </Text>
        </Stack>
      );
    },
  },
  {
    Header: "Address",
    accessor: "address",
    Cell: ({ row }) => {
      const earner = row.original;

      return (
        <Stack direction="row">
          <Text fontSize={"14px"} alignItems={"center"} whiteSpace="nowrap">
            {formatAddress(earner.address)}
          </Text>
        </Stack>
      );
    },
  },
  {
    Header: "Percent",
    accessor: "percent",
    Cell: ({ row }) => {
      const earner = row.original;

      return (
        <Center>
          <Text fontSize={"14px"} textAlign="center" alignItems={"center"}>
            {earner.percent}
          </Text>
        </Center>
      );
    },
  },
];
