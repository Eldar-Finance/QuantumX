import { Box, BoxProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const Card = ({ children, ...props }: PropsWithChildren<BoxProps>) => {
  return (
    <Box bg={"black.baseDark"} borderRadius="2xl" p="20px" {...props}>
      {children}
    </Box>
  );
};

export default Card;
