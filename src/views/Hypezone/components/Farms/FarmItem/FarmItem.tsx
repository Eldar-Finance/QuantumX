import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Grid,
  Text,
} from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import LpTokenImage from "components/LpTokenImage/LpTokenImage";
import NextImage from "components/NextImage/NextImage";
import {
  formatBalance,
  formatBalanceDolar,
  formatNumber,
} from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
const FarmItem = () => {
  const { token: stakingToken } = useGetElrondToken(toknesID.wegld);
  const { token: rewardToken } = useGetElrondToken(toknesID.rare);
  const apr = 35;
  return (
    <AccordionItem w="full">
      <Box w="full">
        <AccordionButton
          py="4"
          bg="black.baseDark"
          _hover={{
            bg: "black.light",
          }}
          px="5"
          w="full"
          fontSize={{ xs: "14px", lg: "md" }}
        >
          <Box flex="1" textAlign="left" w="full">
            <Grid
              w="full"
              flexDir={{ xs: "column", md: "row" }}
              templateColumns={{ xs: "1fr", md: "1fr 1fr 1fr 1fr 1fr" }}
            >
              {stakingToken ? (
                <>
                  {formatTokenI(stakingToken.name).slice(-2) === "LP" ? (
                    <Flex gap="4" alignItems={"center"}>
                      <LpTokenImage lpToken={stakingToken} />
                      <Text fontWeight={"600"}>{stakingToken.name}</Text>
                    </Flex>
                  ) : (
                    <Flex gap="4" alignItems={"center"}>
                      {(stakingToken?.assets?.pngUrl ||
                        stakingToken?.assets?.svgUrl) && (
                        <NextImage
                          alt=""
                          src={
                            stakingToken.assets.pngUrl ||
                            stakingToken?.assets?.svgUrl
                          }
                          height={27}
                          width={27}
                        />
                      )}

                      <Text fontWeight={"600"}>{stakingToken.name}</Text>
                    </Flex>
                  )}
                </>
              ) : (
                <Flex></Flex>
              )}
              <Flex flexDir={"column"} textAlign="center">
                <Text color="white.400">Staked Balance</Text>
                <Text>
                  {formatBalance({ balance: 45401200000000000 })}{" "}
                  <Box as="span" whiteSpace={"nowrap"}>
                    (${" "}
                    {formatBalanceDolar(
                      {
                        balance: 45401200000000000,
                        decimals: stakingToken.decimals,
                      },
                      43,
                      true
                    )}
                    )
                  </Box>
                </Text>
              </Flex>
              <Flex flexDir={"column"} textAlign="center">
                <Text textTransform={"uppercase"} color="white.400">
                  Apr
                </Text>
                <Text>{apr}</Text>
              </Flex>
              <Flex flexDir={"column"} textAlign="center">
                <Text color="white.400">Total Value Locked</Text>
                <Text>$ {formatNumber(21000)}</Text>
              </Flex>
              <Flex flexDir={"column"} textAlign="center" alignItems={"center"}>
                <Text color="white.400" mb={1}>
                  Earn
                </Text>
                <Flex gap="4" alignItems={"center"}>
                  {(rewardToken?.assets?.pngUrl ||
                    rewardToken?.assets?.svgUrl) && (
                    <NextImage
                      alt=""
                      src={
                        rewardToken.assets.pngUrl || rewardToken?.assets?.svgUrl
                      }
                      height={27}
                      width={27}
                    />
                  )}
                </Flex>
              </Flex>
            </Grid>
          </Box>
          <AccordionIcon color="main" />
        </AccordionButton>
      </Box>
      <AccordionPanel pb={4} w="full" bg="black.base">
        <Grid
          flex="1"
          templateColumns={{ xs: "1fr", md: "1fr 1fr" }}
          gap="4"
        ></Grid>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default FarmItem;
