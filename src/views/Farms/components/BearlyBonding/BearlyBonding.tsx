import { Center, Flex, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import rareUsdcImage from "assets/logos/rare-usdc.png";
import ActionButton from "components/ActionButton/ActionButton";
import Card from "components/Card/Card";
import NextImage from "components/NextImage/NextImage";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";

const BearlyBonding = () => {
  const { tokens } = useGetMultipleElrondTokens([
    toknesID.wegld,
    toknesID.mex,
    toknesID.zpay,
    toknesID.usdc,
    toknesID.crt,
  ]);
  if (!tokens) return null;
  return (
    <Card>
      <Grid templateColumns={{ xs: "1fr", tablet: "2fr 1fr" }} gap={20}>
        <Flex flexDir={"column"} w="full">
          <Flex w="full" justify={"space-between"} mb={10}>
            <Flex alignItems={"center"} gap={3}>
              <NextImage alt="" src={rareUsdcImage} height={55} width={55} />
              <Text fontWeight={"600"}> RAREUSDCLP</Text>
            </Flex>
            <Flex flexDir={"column"} align="center">
              <Text color="white.400">APR</Text>
              <Text>0%</Text>
            </Flex>
          </Flex>
          <Center flexDir={"column"} gap={6} mb={10} fontSize={"lg"} flex={1}>
            <VStack>
              <Text color="white.400">Total ValueLocked</Text>
              <Text>$10.383.02</Text>
            </VStack>
            <VStack>
              <Text color="white.400">Staked Balance</Text>
              <Text>0 ($0)</Text>
            </VStack>
          </Center>
          <Flex w="full" justify={"space-between"} alignItems="center">
            <Flex flexDir={"column"} w="full">
              <Text mb={2} color="white.400" fontSize={"14px"}>
                Stake RAREUSDCLP
              </Text>
              <Flex w="full" justify={"space-between"} gap={4}>
                <ActionButton w="full" maxW={"50%"}>
                  Stake LP
                </ActionButton>
                <ActionButton w="full" maxW={"50%"}>
                  Unstake
                </ActionButton>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <VStack>
          <Heading mb={3}>EARN</Heading>
          <Flex flexDir={"column"} flex={1} w="full" gap={5} pb={6}>
            {tokens.map((token) => {
              return (
                <Flex key={token.identifier} w="full" justify={"space-around"}>
                  <NextImage
                    alt=""
                    src={token.assets.svgUrl}
                    height={35}
                    width={35}
                  />

                  <Text fontSize={"2xl"} fontWeight="bold">
                    13
                  </Text>
                </Flex>
              );
            })}
          </Flex>
          <ActionButton w="full" maxW={"110px"}>
            Harvest
          </ActionButton>
        </VStack>
      </Grid>
    </Card>
  );
};

export default BearlyBonding;
