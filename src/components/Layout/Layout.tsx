import { Box, BoxProps, Alert, AlertIcon, Text, useDisclosure, Center } from "@chakra-ui/react";
import bg from "assets/home/bg.png";
import ImageBg from "components/ImageBg/ImageBg";
import Navbar from "components/Navbar/Navbar";
import { PropsWithChildren } from "react";

interface IProps extends BoxProps {}

const Layout = ({ children, ...props }: PropsWithChildren<IProps>) => {
  const { isOpen } = useDisclosure({ defaultIsOpen: true });

  return (
    <Box
      position={"relative"}
      pt={{ 
        xs: isOpen ? "190px" : "160px", 
        md: isOpen ? "200px" : "180px", 
        "2xl": "248px" 
      }}
      pb={{ base: "96px", md: "0" }}
      h="full"
      minH="100vh"
      {...props}
    >
      {isOpen && (
        <Center
          position="fixed"
          top={0}
          left={0}
          right={0}
          zIndex={1000}
          bg="rgba(0,0,0,0.9)"
          py={1.5}
          borderBottom="1px solid"
          borderColor="whiteAlpha.100"
        >
          <Alert
            status="info"
            variant="solid"
            bg="transparent"
            w="auto"
            maxW="800px"
            border="none"
            boxShadow="none"
            py={0}
            height="auto"
            px={{ base: 4, md: 6 }}
          >
            <AlertIcon color="blue.400" boxSize="16px" />
            <Text 
              color="whiteAlpha.900" 
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight="600"
              letterSpacing="0.2px"
              textAlign={{ base: "left", md: "center" }}
            >
              Upgrade to Burnium: Trade your SFTs or Early Investor status for exclusive access to advanced trading / crypto tools
            </Text>
          </Alert>
        </Center>
      )}

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
        top={{ 
          xs: isOpen ? "40px" : "10px",
          md: isOpen ? "60px" : "40px" 
        }}
        px={{ xs: "10px", md: "30px" }}
      >
        <Navbar />
      </Box>
      {children}
    </Box>
  );
};

export default Layout;
