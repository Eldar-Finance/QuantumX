import { Box, BoxProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface IProps extends BoxProps {
  text: string;
  show?: boolean;
}
const Badge = ({
  text,
  children,
  show = true,
  ...props
}: PropsWithChildren<IProps>) => {
  return (
    <Box position={"relative"}>
      {children}
      {show && (
        <Box
          position={"absolute"}
          top={"-10px"}
          right={"-20px"}
          bg="main"
          color="black"
          fontSize={"xs"}
          rounded={"full"}
          px={1}
          fontWeight="bold"
          {...props}
        >
          {text}
        </Box>
      )}
    </Box>
  );
};

export default Badge;
