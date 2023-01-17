import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import useGetFarmsFees from "views/Panel/hooks/useGetFarmsFees";
import { becomeCreator } from "views/Panel/scServices/farmsCalls";

const BecomeCreator = () => {
  const fess = useGetFarmsFees();
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
          <Text>One time fee of 25 EGLD</Text>
          <Text>Unlock Quantum Panel</Text>
          <Text>1 Free Staking Pool/Farm Creation</Text>
          <Text>Unlimited QuantumX Team Support</Text>
        </Flex>
        <Text mb={16}>Every extra pool/farm cost 5 EGLD</Text>
        <ActionButton w="full" fontWeight={"bold"} onClick={becomeCreator}>
          Become Creator
        </ActionButton>
      </Box>
    </Center>
  );
};

export default BecomeCreator;
