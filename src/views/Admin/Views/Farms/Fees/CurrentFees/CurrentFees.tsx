import { Flex, Heading, Text } from "@chakra-ui/react";
import { formatBalance } from "utils/functions/formatBalance";
import useGetFarmsFees from "views/Panel/hooks/useGetFarmsFees";

const CurrentFees = () => {
  const { fees } = useGetFarmsFees();
  return (
    <div>
      {" "}
      <Heading mb={3}>Current Fees Values : </Heading>
      <Flex gap={"40px"} flexWrap="wrap" w="full">
        <Text>
          General Fee : {formatBalance({ balance: fees.earners, decimals: 2 })}{" "}
          %
        </Text>
        <Text>
          Harvest Fee : {formatBalance({ balance: fees.harvest, decimals: 2 })}{" "}
          %
        </Text>
        <Text>
          Creator Fee : {formatBalance({ balance: fees.creator })} EGLD
        </Text>
        <Text>
          Farm Creation Fee : {formatBalance({ balance: fees.farmCreation })}{" "}
          EGLD
        </Text>
      </Flex>
    </div>
  );
};

export default CurrentFees;
