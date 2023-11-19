import { SorSwapResponse } from "@ashswap/ash-sdk-js/out";
import { Box, Center, Flex, HStack, Icon, Text , Button } from "@chakra-ui/react";
import { SwapIcon } from "components/Icons/ui";
import { CiRoute } from "react-icons/ci";
import { formatTokenI } from "utils/functions/tokens";
import { ILpSmartSwap, INomalSmartSwap } from "utils/types/others.interface";
import useGetSwapInfo from "views/Swap/hooks/useGetSwapInfo";
import { TbSum } from "react-icons/tb";
import { MdOutlinePriceChange } from "react-icons/md";
import { swap } from "views/Swap/services/swap";
import React, { useState } from 'react';

const SwapRoute = ({ swapPaths }: { swapPaths?: SorSwapResponse }) => {
  // console.log("⚠️ ~ file: SwapRoute.tsx:9 ~ swapPaths:", swapPaths)
  const { data, isSapwToLp } = useGetSwapInfo();

  const routes = swapPaths.swaps?.map((path) => {
    return {
      token1: formatTokenI(path.assetIn),
      token2: formatTokenI(path.assetOut),
    };
  });

  let finalRoutes = routes;
  // if (routes.length > 0) {
  //   finalRoutes = [...routes.filter((d, i) => i > 0), routes[0]];
  // }

  const priceImpact = Number(swapPaths?.priceImpact?.toFixed(7)) * 100;
  const roundedPriceImpact = priceImpact.toFixed(5);

  const displayPriceImpact = roundedPriceImpact.length > 5 ? Math.round(priceImpact*10000) / 10000 : roundedPriceImpact;
  const [showAllRoutes, setShowAllRoutes] = useState(false);
  
  return (
    <HStack w={"full"} h={"full"} flex={1}>
      <Flex
        h={"full"}
        w="full"
        gap={"10px"}
        alignSelf={"flex-start"}
        bg={"black.baseDark"}
        p={2}
        borderRadius={"20px"}
        flex={1} // Add this line
      >
        <Center bg="black.base" boxSize={"40px"} borderRadius="full">
          <CiRoute color={"#22F7DD"} size={"26"}/>
        </Center>
        <Box>
      <Text flex={1} fontSize={{ xs: '16px', md: '18px' }} mb={2} mt={2}>
        Swap routes
      </Text>
      <ul>
        {finalRoutes.map((route, i) => {
          // Only render the "+" button next to the first route
          if (i === 0) {
            return (
              <Flex key={i} align="center">
                <Text fontSize={'lsm'} color="white.500">
                  {route.token1} {'->'} {route.token2}
                </Text>
                {finalRoutes.length > 1 && !showAllRoutes && (
                  <Button size="xs" onClick={() => setShowAllRoutes(true)} ml={2}>
                    +
                  </Button>
                )}
              </Flex>
            );
          }
          // Render the rest of the routes only if showAllRoutes is true
          return showAllRoutes ? (
            <li key={i}>
              <Text fontSize={'lsm'} color="white.500">
                {route.token1} {'->'} {route.token2}
              </Text>
            </li>
          ) : null;
        })}
      </ul>
      {showAllRoutes && finalRoutes.length > 1 && (
        <Button size="xs" onClick={() => setShowAllRoutes(false)} mt={2}>
          -
        </Button>
      )}
    </Box>
      </Flex>
      <Flex
        w="full"
        gap={"15px"}
        alignSelf={"flex-start"}
        bg={"black.baseDark"}
        p={2}
        borderRadius={"20px"}
        flex={1} // Add this line
        h={"full"}
      >
        <Center bg="black.base" boxSize={"40px"} borderRadius="full">
          <MdOutlinePriceChange color={"#22F7DD"} size={"26"}/>
        </Center>
        <Box>
          <Text flex={1} fontSize={{ xs: "16px", md: "18px" }} mb={2} mt={2}>
            Price Impact
          </Text>
          <ul>
            {/* {finalRoutes.map((route, i) => {
              return (
                <li key={i}>
                  <Text fontSize={"lsm"} color="white.500">
                    {route.token1} {"->"} {route.token2}
                  </Text>
                </li>
              );
            })} */}
            
            <Text fontSize={"lsm"} color="white.500">
              {displayPriceImpact} %
            </Text>
          </ul>
        </Box>
      </Flex>
    </HStack>
  );
};

export default SwapRoute;
