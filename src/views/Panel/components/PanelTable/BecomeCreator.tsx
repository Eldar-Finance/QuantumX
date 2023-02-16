import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { formatBalance } from "utils/functions/formatBalance";
import useGetFarmsFees from "views/Panel/hooks/useGetFarmsFees";
import { becomeCreator } from "views/Panel/scServices/farmsCalls";

const BecomeCreator = () => {
  const { fees } = useGetFarmsFees();
  return (
    <Center textAlign={"center"}>
      <Box
        p={"20px"}
        flexDir="column"
        bg="black.light"
        borderRadius={"lg"}
        w="full"
        maxW={"500px"}
      >
        <Heading mb={8}>Become QCreator</Heading>
        <Flex gap={4} flexDir="column" mb={12}>
          <Text>
            One time fee of {formatBalance({ balance: fees.creator })} EGLD
          </Text>
          <Text>Unlock Quantum Panel</Text>
          <Text>Unlimited QuantumX Team Support</Text>
        </Flex>
        <Text mb={16}>
          Every pool/farm costs {formatBalance({ balance: fees.farmCreation })}{" "}
          EGLD
        </Text>
        <ActionButton
          w="full"
          fontWeight={"bold"}
          onClick={() =>
            becomeCreator(formatBalance({ balance: fees.creator }, true))
          }
        >
          Become Creator
        </ActionButton>
      </Box>
    </Center>
  );
};

export default BecomeCreator;
