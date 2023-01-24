import { Box, Heading } from "@chakra-ui/react";

import DynamicFormAndTable from "../commons/DynamicFormAndTable/DynamicFormAndTable";
import { useGetFarmsTokens } from "../hooks";

const StakedTokens = () => {
  const { tokens } = useGetFarmsTokens("whitelistedStakedTokens");

  return (
    <Box w="full">
      <Heading mb={10} textAlign="center">
        Staked Tokens
      </Heading>
      <DynamicFormAndTable
        items={tokens}
        dinamuyFormPlaceHolder="Token..."
        dinamuyFormScFunc="addWhitelistedStakedTokens"
        removeItemScFunc="removeWhitelistedStakedTokens"
      />
    </Box>
  );
};

export default StakedTokens;
