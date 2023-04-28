import { Box } from "@chakra-ui/react";
import ChangeTag from "../ChangeTag/Changetag";
import HeadingSection from "../Heading/Heading";
import LearnMore from "../LearnMore/LearnMore";

const ClaimedView = () => {
  return (
    <Box w="full" maxW={"800px"}>
      {" "}
      <HeadingSection claimed />
      <LearnMore />
      <ChangeTag />
    </Box>
  );
};

export default ClaimedView;
