import { Stack } from "@chakra-ui/react";
import Slippage from "./Slippge/Slippage";
import SwapRoute from "./SwapRoute/SwapRoute";

const SwapDetails = () => {
  return (
    <Stack w="full" spacing={"10px"} mt="30px">
      <SwapRoute />
      <Slippage />
    </Stack>
  );
};

export default SwapDetails;
