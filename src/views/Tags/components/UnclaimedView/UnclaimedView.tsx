import { Box } from "@chakra-ui/react";
import ClaimTag from "../ClaimTag/ClaimTag";
import HeadingSection from "../Heading/Heading";
import LearnMore from "../LearnMore/LearnMore";

const UnclaimedView = () => {
  return (
    <Box w="full" maxW={"800px"}>
      {" "}
      <HeadingSection />
      <LearnMore />
      <ClaimTag />
    </Box>
  );
};

export default UnclaimedView;
