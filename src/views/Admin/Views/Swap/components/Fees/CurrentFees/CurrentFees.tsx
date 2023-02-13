import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { formatBalance } from "utils/functions/formatBalance";
import { useGetFees } from "../../../hooks";

const CurrentFees = () => {
  const { fees, isLoading } = useGetFees();
  return (
    <div>
      {" "}
      <Heading mb={3}>Current Fees Values : </Heading>
      <Flex gap={"40px"} flexWrap="wrap" w="full">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text>
              Fee : {formatBalance({ balance: fees.fee, decimals: 2 })} %
            </Text>
            <Text>
              LP Fee : {formatBalance({ balance: fees.lpFee, decimals: 2 })} %
            </Text>
          </>
        )}
      </Flex>
    </div>
  );
};

export default CurrentFees;
