import { Box, Center } from "@chakra-ui/react";

const BuyTab = () => {
  return (
    <Box w="full" h="400px" mb={"100px"}>
      <Center
        maxW={"700px"}
        m="auto"
        h="390px"
        borderRadius={"lg"}
        overflow="hidden"
      >
        <iframe
          width="100%"
          height="100%"
          frameBorder="none"
          allow="camera"
          src="https://widget.changelly.com?from=eur&to=egld&amount=50&address=&fromDefault=eur&toDefault=egld&merchant_id=635cd9927ad3&payment_id=&v=3"
        >
          Can't load widget
        </iframe>
      </Center>
    </Box>
  );
};

export default BuyTab;
