/* eslint-disable react/no-unescaped-entities */
import { Box, Center } from "@chakra-ui/react";
import styled from "@emotion/styled";

const BuyTab = () => {
  return (
    <WrapperS w="full" h="400px" mb={"100px"}>
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
    </WrapperS>
  );
};

export default BuyTab;

const WrapperS = styled(Box)`
  .base-style_widget-app-wrapper__o5dp1 {
    background: #151515;
  }

  .style_heading__mFYLj.style_size-sm__7zd3F {
    color: white;
  }

  .style_checkbox-wrapper__JbGIq.style_size-medium__tlJUf
    .style_cl-checkbox-label__Kg7M3 {
    color: white;
  }

  .style_route-wrapper__qXezp.style_light-gray__hPBEJ {
    background: #43f7dd;
  }
`;
