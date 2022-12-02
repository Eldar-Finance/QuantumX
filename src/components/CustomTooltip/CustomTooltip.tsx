import { QuestionIcon } from "@chakra-ui/icons";
import { Box, Tooltip } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

interface IProps {
  children?: ReactNode;
  text: ReactNode;
  iconSize?: number | string;
}

const CustomTooltip = ({ children, text, iconSize = null }: IProps) => {
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
      bg="main"
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
