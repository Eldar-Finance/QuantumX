import { QuestionIcon } from "@chakra-ui/icons";
import { Box, Tooltip } from "@chakra-ui/react";
import { useState } from "react";

const CustomTooltip = ({ children = null, text = "", iconSize = null }) => {
  const [open, setOpen] = useState(false);
  const openTooltip = () => {
    setOpen(true);
  };
  const closeTooltip = () => {
    setOpen(false);
  };

  return (
    <Tooltip
      hasArrow
      label={text}
      isOpen={open}
      bg="brand.600"
      maxWidth={"250px"}
      aria-label="info tooltip"
      fontWeight={"medium"}
      borderRadius={"12px"}
      p={4}
    >
      {children || (
        <Box as="span" cursor={"pointer"}>
          <QuestionIcon
            fontSize={iconSize || "18px"}
            onClick={openTooltip}
            onMouseDown={openTooltip}
            onMouseEnter={openTooltip}
            onMouseLeave={closeTooltip}
          />
        </Box>
      )}
    </Tooltip>
  );
};

export default CustomTooltip;
