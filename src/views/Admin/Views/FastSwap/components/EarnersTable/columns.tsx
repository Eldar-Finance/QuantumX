import { Stack, Text } from "@chakra-ui/react";
import { formatAddress } from "utils/functions/formatAddress";

export const earnersColumns = [
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => {
      const earner = row.original;

      return (
        <Stack direction="row">
          <Text
            fontSize={"14px"}
            display={{ xs: "none", md: "flex" }}
            alignItems={"center"}
          >
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
        <Stack direction="row" minW={"200px"}>
          <Text
            fontSize={"14px"}
            display={{ xs: "none", md: "flex" }}
            alignItems={"center"}
          >
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
        <Stack direction="row">
          <Text
            fontSize={"14px"}
            display={{ xs: "none", md: "flex" }}
            alignItems={"center"}
          >
            {earner.percent}
          </Text>
        </Stack>
      );
    },
  },
];
