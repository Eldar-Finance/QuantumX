/* eslint-disable react/no-unescaped-entities */
import { Box, Center } from "@chakra-ui/react";
import styled from "@emotion/styled";

const BuyTab = () => {
  return (
    <WrapperS w="full">
      <Center
        maxW={"700px"}
        m="auto"
        h="390px"
        borderRadius={"lg"}
        overflow="hidden"
        background={"black"}
      >
        <iframe
          width="100%"
          height="100%"
          frameBorder="none"
          allow="camera"
          color="black"
          src="https://widget.changelly.com?from=eur%2Cusd&to=egld&amount=50&address=&fromDefault=eur&toDefault=egld&merchant_id=MEdittd0p-jm_BZ1&payment_id=&v=3&type=no-rev-share&color=22F6DC&headerId=1&logo=hide&buyButtonTextId=1"
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
