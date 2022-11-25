import { Box, BoxProps } from "@chakra-ui/react";
import ImageBg from "components/ImageBg/ImageBg";
import Navbar from "components/Navbar/Navbar";
import { PropsWithChildren } from "react";

interface IProps extends BoxProps {
  bg?: any;
}

const Layout = ({ children, bg, ...props }: PropsWithChildren<IProps>) => {
  return (
    <Box position={"relative"} pt={"208px"} {...props} h="full" minH="100vh">
      {bg && <ImageBg src={bg} zIndex={-1} />}
      <Box
        position={"absolute"}
        w="full"
        left={0}
        right="0"
        top={"50px"}
        px={"30px"}
      >
        <Navbar />
      </Box>
      {children}
    </Box>
  );
};

export default Layout;
