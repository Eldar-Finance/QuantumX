import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import useGetfaucetInfo from "views/Panel/hooks/useGetfaucetInfo";

const FaucetInfo = () => {
  const { info, error, isLoading } = useGetfaucetInfo();

  const { tokens } = useGetMultipleElrondTokens([
    info?.currentBalance.token,
    info?.reward.token,
    info?.cost.token,
  ]);
  const currentBalanceDecimals = tokens.find(
    (token) => token.identifier === info?.currentBalance.token
  )?.decimals;
  const rewardDecimals = tokens.find(
    (token) => token.identifier === info?.reward.token
  )?.decimals;
  const costDecimals = tokens.find(
    (token) => token.identifier === info?.cost.token
  )?.decimals;
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th textAlign={"center"} fontSize="md">
              {" "}
              Current Balance{" "}
            </Th>
            <Th textAlign={"center"} fontSize="md">
              Reward
            </Th>
            <Th textAlign={"center"} fontSize="md">
              Cost
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td textAlign={"center"}>
              {" "}
              {formatBalance({
                balance: info.currentBalance.amount,
                decimals: currentBalanceDecimals,
              })}{" "}
              {formatTokenI(info.currentBalance.token)}
            </Td>
            <Td textAlign={"center"}>
              {formatBalance({
                balance: info.reward.amount,
                decimals: rewardDecimals,
              })}{" "}
              {formatTokenI(info.reward.token)}
            </Td>
            <Td textAlign={"center"}>
              {formatBalance({
                balance: info.cost.amount,
                decimals: costDecimals,
              })}{" "}
              {formatTokenI(info.cost.token)}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default FaucetInfo;
