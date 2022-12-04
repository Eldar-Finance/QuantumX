import { Box, BoxProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const PanelBox = ({ children, ...props }: PropsWithChildren<BoxProps>) => {
  return (
    <Box
      p="4"
      border={"1px solid "}
      borderColor="white.400"
      borderRadius={"lg"}
      {...props}
    >
      {children}
    </Box>
  );
};

export default PanelBox;
