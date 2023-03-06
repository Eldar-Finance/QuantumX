import { QuestionIcon } from "@chakra-ui/icons";
import { Box, Tooltip } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

interface IProps {
  children?: ReactNode;
  text: ReactNode;
  componentWithIcon?: ReactNode;
  iconSize?: number | string;
  maxWidth?: number | string;
}

const CustomTooltip = ({
  children,
  text,
  iconSize = null,
  maxWidth,
  componentWithIcon,
}: IProps) => {
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
      maxWidth={maxWidth || "250px"}
      aria-label="info tooltip"
      fontWeight={"medium"}
      borderRadius={"12px"}
      p={4}
    >
      {children || (
        <Box
          as="span"
          cursor={"pointer"}
          fontSize={iconSize || "18px"}
          display="flex"
          alignItems={"center"}
          onClick={openTooltip}
          onMouseDown={openTooltip}
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}
        >
          {componentWithIcon}
          <QuestionIcon />
        </Box>
      )}
    </Tooltip>
  );
};

export default CustomTooltip;
