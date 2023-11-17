import { Box, Center, Flex, Icon, Text } from "@chakra-ui/react";
import { SwapIcon } from "components/Icons/ui";
import { formatTokenI } from "utils/functions/tokens";
import { ILpSmartSwap, INomalSmartSwap } from "utils/types/others.interface";
import useGetSwapInfo from "views/Swap/hooks/useGetSwapInfo";

const SwapRoute = () => {
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

  let finalRoutes = routes;
  if (finalRoutes.length > 0 && isSapwToLp) {
    finalRoutes = [...routes.filter((d, i) => i > 0), routes[0]];
  }

  return (
    <Flex w="full" gap={"15px"} alignItems="flex-start">
      <Center bg="black.base" boxSize={"44px"} borderRadius="full">
        <Icon as={SwapIcon} />
      </Center>
      <Box>
        <Text flex={1} fontSize={{ xs: "sm", md: "18px" }} mb={2} mt={2}>
          Swap route
        </Text>
        <ul>
          {finalRoutes.map((route, i) => {
            return (
              <li key={i}>
                <Text fontSize={"lsm"} color="white.500">
                  {route.token1} {"->"} {route.token2}
                </Text>
              </li>
            );
          })}
        </ul>
      </Box>
    </Flex>
  );
};

export default SwapRoute;
