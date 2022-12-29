import { Box, Center, Flex, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { EgldlogoIcon } from "components/Icons/ui";

import {
  formatBalance,
  formatBalanceDolar,
} from "utils/functions/formatBalance";
import { useAppSelector } from "utils/hooks/redux";

const TotalLCACard = () => {
  const totalVolume = useAppSelector(
    (state) => state.lkmexAveraging.totalVolume.data
  );
  const economics = useAppSelector((state) => state.elrond.economics);

  return (
    <Card borderRadius={{ xs: "3xl", md: "6xl" }} bg="black.light">
      <Box>
        <Text
          fontSize={"2xl"}
          as="h2"
          fontWeight={"bold"}
          textAlign="center"
          w={"full"}
        >
          Total LCA Volume
        </Text>
      </Box>
      <Box>
        <Center w={"full"} pb={5}>
          <Flex flexDir={"column"} mr={3} alignItems="flex-end">
            <Text fontSize={"3xl"} fontWeight="bold">
              {formatBalance({ balance: totalVolume, decimals: 18 })}
            </Text>
            <Text>
              &asymp;&nbsp;
              {formatBalanceDolar(
                { balance: totalVolume, decimals: 18 },
                economics.data?.price,
                true
              )}
              $
            </Text>
          </Flex>
          <EgldlogoIcon wp="15px" fontSize={"65px"} />
        </Center>
      </Box>
    </Card>
  );
};

export default TotalLCACard;
