import { Box } from "@chakra-ui/react";
import ChangeRewards from "./ChangeRewards";
import DepositHype from "./DepositHype";

const FaucetForms = () => {
  return (
    <Box>
      <Box mb={10}>
        <DepositHype />
      </Box>
      <Box>
        <ChangeRewards />
      </Box>
    </Box>
  );
};

export default FaucetForms;
