import { Box } from "@chakra-ui/react";
import Counter from "components/Counter/Counter";
import SftMedia from "../SftMedia/SftMedia";

const SFtToSelect = ({ sft, setSftAmount, sftAmount }) => {
  return (
    <Box mb={4} px={1}>
      <SftMedia sft={sft} removeBottomText />
      <Box mt={8}>
        <Counter
          stock={Number(sft.balance)}
          initial={0}
          count={sftAmount}
          setCountAction={setSftAmount}
        />
      </Box>
    </Box>
  );
};

export default SFtToSelect;
