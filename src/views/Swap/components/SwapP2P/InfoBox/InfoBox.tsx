import { Box, Collapse } from "@chakra-ui/react";
import OperationsList from "./OperationList/OperationsList";

const InfoBox = ({ open }) => {
  return (
    <Collapse in={open} animateOpacity>
      <Box
        p="20px "
        color="white"
        bg="mainDark"
        shadow="md"
        width="full"
        maxW={{ xs: "320px", tablet: "400px" }}
        m="auto"
        borderRadius={"0 0 12px 12px"}
        mb={5}
        position="relative"
      >
        <Box position="relative" zIndex={1} mb={2}>
          <OperationsList />
        </Box>
      </Box>
    </Collapse>
  );
};

export default InfoBox;
