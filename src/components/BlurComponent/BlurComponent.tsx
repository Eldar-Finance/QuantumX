import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface IProps {
  blur?: boolean;
}

const BlurComponent = ({ blur, children }: PropsWithChildren<IProps>) => {
  return (
    <Box
      position={"relative"}
      filter={blur && "blur(8px)"} // set the amount of blur
    >
      {blur && (
        <Box position={"absolute"} top={0} left={0} right={0} bottom={0} />
      )}
      {children}
    </Box>
  );
};

export default BlurComponent;
