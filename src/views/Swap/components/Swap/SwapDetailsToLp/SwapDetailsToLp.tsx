import { HStack, Stack, VStack } from "@chakra-ui/react";
import SwapRouteToLp from "./SwapRouteToLp/SwapRouteToLp";
import SlippageToLp from "./SlippageToLp/SlippageToLp";

const SwapDetailsToLp = () => {
  return (
    <HStack w="full" mt="10px" fontSize={"10px"} bg={"black.base"} gap={3} p={3} borderRadius={"20px"}>
      <SlippageToLp/>
      <SwapRouteToLp/>
    </HStack>
  );
};

export default SwapDetailsToLp;
