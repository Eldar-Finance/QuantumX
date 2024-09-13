import { Box, BoxProps } from "@chakra-ui/react";
import bg from "assets/home/bg.png";
import ImageBg from "components/ImageBg/ImageBg";
import Navbar from "components/Navbar/Navbar";
import { PropsWithChildren } from "react";

interface IProps extends BoxProps {}

const Layout = ({ children, ...props }: PropsWithChildren<IProps>) => {
  return (
    <Box
      position={"relative"}
      pt={{ xs: "160px", md: "180px", "2xl": "248px" }}
      pb={{ base: "96px", md: "0" }} // Add padding at the bottom for mobile
      h="full"
      minH="100vh"
      {...props}
    >
      <Box
        position={"fixed"}
        top={0}
        left={0}
        right={0}
        zIndex={-2}
        h="100vh"
        overflow={"hidden"}
      >
        <ImageBg src={bg} zIndex={-1} />
      </Box>
      <Box
        position={"absolute"}
        w="full"
        left={0}
        right="0"
        top={{ xs: "10px", md: "40px" }}
        px={{ xs: "10px", md: "30px" }}
      >
        <Navbar />
      </Box>
      {children}
    </Box>
  );
};

export default Layout;
