/* eslint-disable react/no-unescaped-entities */
import { Box, Center } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { useAppSelector } from "utils/hooks/redux";
import React, { useState, useEffect } from 'react';



const BuyTab = () => {

  const address = useAppSelector(selectUserAddress);
  const [iframeSrc, setIframeSrc] = useState('');

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
       {address ? (
        <iframe
          src={`https://widget.changelly.com?from=eur&to=egld&amount=30&address=${address}&fromDefault=eur&toDefault=egld&merchant_id=635cd9927ad3&payment_id=&v=3`}
          width="100%"
          height="100%"
          frameBorder="0">
        </iframe>
      ) : (
        <div>Loading...</div> // Or any other placeholder you prefer
      )}
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
