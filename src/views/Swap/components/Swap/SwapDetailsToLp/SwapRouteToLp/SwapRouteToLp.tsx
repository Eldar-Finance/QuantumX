import { SorSwapResponse } from "@ashswap/ash-sdk-js/out";
import { Box, Center, Flex, HStack, Icon, Text , Button, VStack } from "@chakra-ui/react";
import { SwapIcon } from "components/Icons/ui";
import { CiRoute } from "react-icons/ci";
import { formatTokenI } from "utils/functions/tokens";
import { ILpSmartSwap, INomalSmartSwap } from "utils/types/others.interface";
import useGetSwapInfo from "views/Swap/hooks/useGetSwapInfo";
import { TbSum } from "react-icons/tb";
import { MdOutlinePriceChange } from "react-icons/md";
import { swap } from "views/Swap/services/swap";
import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';


const SwapRouteToLp = () => {
  const { data, isSapwToLp } = useGetSwapInfo();

  const routes = data
    ? data.map((swapData, i) => {
        if (!isSapwToLp) {
          const d: INomalSmartSwap = swapData as INomalSmartSwap;
          return {
            token1: formatTokenI(d.token1),
            token2: formatTokenI(d.token2),
          };
        } else {
          if (i === 0) {
            const d: ILpSmartSwap = swapData as ILpSmartSwap;
            return {
              token1: "",
              token2: formatTokenI(d.lptokenidentifier),
            };
          } else {
            const d: INomalSmartSwap = swapData as INomalSmartSwap;
            return {
              token1: formatTokenI(d.token1),
              token2: formatTokenI(d.token2),
            };
          }
        }
      })
    : [];

  let finalRoutes;
  if (routes.length == 4) {
    const route1 = "50% " + routes[1].token1 + " → " + routes[1].token2;
    const route2 = "50% " + routes[2].token1 + " → " + routes[3].token2;
    const route3 = routes[1].token2 + " & " + routes[3].token2 + " → " + "LP";
    finalRoutes = [route1, route2, route3];
  } else if (routes.length == 2) {
    const route1 = "50% " + routes[1].token1 + " → " + routes[1].token2;
    const route2 = routes[1].token1 + " & " + routes[1].token2 + " → " + "LP";
    finalRoutes = [route1, route2];
  } else {
    finalRoutes = [];
  }
  
  return (
    <Flex
      h={"full"}
      w="50%"
      gap={"10px"}
      alignSelf={"flex-start"}
      bg={"black.baseDark"}
      p={2}
      borderRadius={"20px"}
      flex={1} // Add this line
      minH={"95px"}
      maxH={"95px"}
    >
      <Center bg="black.base" boxSize={"34px"} borderRadius="full">
        <CiRoute color={"#22F7DD"} size={"22"}/>
      </Center>
      <Box>
        <Text flex={1} fontSize={'16px'} my={1}>
          Swap routes
        </Text>
        <VStack align="left" justifyContent={"space-evenly"}>
          {finalRoutes.map((route) => {
            return (
              <Text h={finalRoutes.length > 2 ? "8px" : "12px"} key={route} as="li" style={{ listStyleType: 'none' }} whiteSpace={"nowrap"}
                fontSize={{sm: '11px', md: '13px'}} color="white.500"
              >
                {route}
              </Text>
            );
          })}
        </VStack>
      </Box>
    </Flex>
  );
};

export default SwapRouteToLp;
