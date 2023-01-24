import { Box, Heading } from "@chakra-ui/react";

import DynamicFormAndTable from "../commons/DynamicFormAndTable/DynamicFormAndTable";
import { useGetFarmsTokens } from "../hooks";

const RewardToken = () => {
  const { tokens } = useGetFarmsTokens("whitelistedRewardTokens");

  return (
    <Box w="full">
      <Heading mb={10} textAlign="center">
        RewardToken Tokens
      </Heading>
      <DynamicFormAndTable
        items={tokens}
        dinamuyFormPlaceHolder="Token..."
        dinamuyFormScFunc="addWhitelistedRewardTokens"
        removeItemScFunc="removeWhitelistedRewardTokens"
      />
    </Box>
  );
};

export default RewardToken;
