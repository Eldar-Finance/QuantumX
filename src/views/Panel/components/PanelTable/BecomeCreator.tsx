import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { formatBalance } from "utils/functions/formatBalance";
import useGetFarmsFees from "views/Panel/hooks/useGetFarmsFees";
import { becomeCreator } from "views/Panel/scServices/farmsCalls";

const BecomeCreator = () => {
  const { fees, isLoading, error } = useGetFarmsFees();

  const noCost = !isLoading && !error && formatBalance({ balance: fees.creator }) < 0.001;

  return (
    <Center textAlign={"center"}>
      <Box
        p={"20px"}
        flexDir="column"
        bg="black.baseDark"
        borderRadius={"xl"}
        w="full"
        maxW={"500px"}
        minW={"400px"}
      >
        <Heading mt={2} mb={8}>Become a QxCreator</Heading>
        
        <Flex gap={4} flexDir="column" mb={10}>
          <Text>· Unlock Quantum Panel Features</Text>
          <Text> · Create Farms, Pools, or NFT offers</Text>
          <Text>· Get unlimited support from QuantumX Team</Text>
          {/* <Text>
            · Every new Farm/Pool costs {formatBalance({ balance: fees.farmCreation })} EGLD
          </Text> */}
          <Text>
            · Default fee of {fees.harvest / 100}% in users&apos; harvested rewards
          </Text>
        </Flex>
        
        {/* <Text my={8}>
          <b>Cost:</b> One-time payment of {formatBalance({ balance: fees.creator })} EGLD
        </Text> */}

        <ActionButton
          w="fit"
          px={10}
          fontWeight={"bold"}
          onClick={() =>
            becomeCreator(formatBalance({ balance: fees.creator }, true))
          }
        >
          Become Creator&nbsp;&nbsp;-{noCost ?
          <Text>&nbsp;&nbsp;IT&apos;S FREE</Text> :
          <Text>&nbsp;&nbsp;Pay {formatBalance({ balance: fees.creator })} EGLD</Text>
          }
        </ActionButton>
      </Box>
    </Center>
  );
};

export default BecomeCreator;
