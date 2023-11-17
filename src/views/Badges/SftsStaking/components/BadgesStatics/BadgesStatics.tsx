import { Box, Center, Flex, Grid, HStack, Spinner, Text } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import Image from "next/image";
import { memo, useEffect, useState } from "react";
import { formatBalance, formatBalanceDolar } from "utils/functions/formatBalance";
import { useAppSelector } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import BadgeStaticBox from "../BadgeStaticBox/BadgeStaticBox";
import ClaimRewardsButton from "../ClaimRewardsButton/ClaimRewardsButton";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";

const BadgesStatics = () => {
  const { InStakingPeriod } = useAppSelector(
    (state) => state.eldarSfts.eldarSftsWithStatus.data
  );
  const { totalStaked } = useAppSelector(
    (state) => state.eldarSfts.stakingNumbers.data
  );
  const stfsRewards = useAppSelector(
    (state) => state.eldarSfts.stfsRewards.data
  );

  const [claimableLkmex, setClaimableLkemx] = useState(0);
  const [claimedLkmex, setClaimedLkemx] = useState(0);
  const [totalPaidLkmex, setTotalPaidkemx] = useState(0);

  const [sftsInStaking, setSftsInStaking] = useState(0);

  useEffect(() => {
    const claimableRewards = stfsRewards.claimable;
    const claimedRewards = stfsRewards.claimed;
    const totalRewardsRewards = stfsRewards.totalRewards;

    let lkmexClaimable = 0;

    const _claimableLkmexArr = claimableRewards.filter(
      (token) => token.tokenI === toknesID.mex
    );

    _claimableLkmexArr.forEach((lkmex) => {
      lkmexClaimable += lkmex.value;
    });

    const _claimedLkmex = claimedRewards.find((t) => t.tokenI === toknesID.mex);
    const _totalPaidLkmex = totalRewardsRewards.find(
      (t) => t.tokenI === toknesID.mex
    );

    if (lkmexClaimable) {
      setClaimableLkemx(lkmexClaimable);
    }
    if (_claimedLkmex) {
      setClaimedLkemx(_claimedLkmex.value);
    }
    if (_totalPaidLkmex) {
      setTotalPaidkemx(_totalPaidLkmex.value);
    }
  }, [stfsRewards]);

  useEffect(() => {
    let _sftsInStaking = 0;
    InStakingPeriod.forEach((sft) => {
      _sftsInStaking += sft.amount;
    });
    setSftsInStaking(_sftsInStaking);
  }, [InStakingPeriod]);

  const [totalDollarValue, updateTotalDollarValue] = useState(0);
  // get a list of the tokens
  const tokens = stfsRewards?.totalRewards?.map((r) => r.tokenI);
  // get the price of tokens
  const elrondTokens = useGetMultipleElrondTokens(tokens);
  // update the total dollar value when the price of tokens changes
  useEffect(() => {
    if (stfsRewards?.totalRewards) {
      let _totalDollarValue = 0;
      stfsRewards.totalRewards.forEach((r) => {
        const elrondToken = elrondTokens.tokens.find((t) => t.identifier === r.tokenI);
        if (elrondToken) {
          // r.amount * elrondToken.price
          _totalDollarValue += formatBalanceDolar(
            {
              balance: r.value,
              decimals: elrondToken.decimals,
            },
            elrondToken.price
          );
        }
      });
      updateTotalDollarValue(_totalDollarValue);
    }
  }, [elrondTokens, stfsRewards.totalRewards]);

  return (
    <Flex
      justifyContent={{ xs: "center", lg: "space-between" }}
      alignItems="center"
      w={"full"}
      // mb={6}
      gap={{sm: 10}}
      flexDir={{ xs: "column", lg: "row" }}
    >
      <Flex alignItems={"flex-start"} flexWrap="wrap">
        <Flex flexDir={{ xs: "column", md: "row" }} alignItems={{ xs: "center", md: "flex-start" }}>
          <BadgeStaticBox
            alignItems={"flex-start"}
            justifyContent="flex-start"
            title={" My Staked Badges"}
            content={`${sftsInStaking}  Badges`}
          />
          <Flex flexDir={{sm: "column", md: "row"}} w={"full"}>
            <HStack gap={8}>
              <Center flexDir={"column"} justifyContent="flex-start">
                <Text fontSize={"12px"} color="gray.500" whiteSpace={"nowrap"}>
                  You have earned
                </Text>
                {stfsRewards?.claimed && (
                  <>
                    {stfsRewards.claimed.map((claimedReward) => {
                      return (
                        <StaticInfo
                          amount={claimedReward.value}
                          token={claimedReward.tokenI}
                          key={claimedReward.token}
                        />
                      );
                    })}
                  </>
                )}
              </Center>
              <Center flexDir={"column"} justifyContent="flex-start">
                <Text fontSize={"12px"} color="gray.500" whiteSpace={"nowrap"}>
                  Available to claim
                </Text>
                {stfsRewards?.claimable && (
                  <>
                    {stfsRewards.claimable.map((claimableReward) => {
                      return (
                        <StaticInfo
                          amount={claimableReward.value}
                          token={claimableReward.tokenI}
                          key={claimableReward.token}
                        />
                      );
                    })}
                  </>
                )}
              </Center>
            </HStack>
            <Center m={4}>
              <ClaimRewardsButton w={"120px"}/>
            </Center>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flexDir={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "flex-start" }}
      >
        <BadgeStaticBox
          title={"Total Badges Staked"}
          content={`${totalStaked} Badges`}
        />
        <Center flexDir={"column"}>
          <Text fontSize={"12px"} color="gray.500" whiteSpace={"nowrap"}>
            Paid out
          </Text>
          {stfsRewards?.totalRewards && (
            <>
              {stfsRewards?.totalRewards.map((r) => {
                return (
                  <StaticInfo amount={r.value} token={r.tokenI} key={r.token}
                  />
                );
              })}
            </>
          )}
          <Text fontSize={"14px"} color="gray.500" whiteSpace={"nowrap"}>
            {/* calc the total $ of rewards by adding their $ value */}
            Total: &nbsp; ${totalDollarValue}
          </Text>
        </Center>
      </Flex>
    </Flex>
  );
};

export default memo(BadgesStatics);

const StaticInfo = ({ token, amount }) => {
  const { token: elrondToken, isLoading } = useGetElrondToken(token);

  return (
    <Center
      flexDir={"column"}
      justifyContent="flex-start"
      px={3}
      mb={1}
      alignItems={{ xs: "center", md: "flex-start" }}
    >
      <Box
        as="span"
        fontSize={"xl"}
        fontWeight="bold"
        whiteSpace={"nowrap"}
        color="white"
      >
        <Center textAlign={"center"}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <Text mr={2} w="full" textAlign={"center"}>
                {formatBalance({
                  balance: amount,
                  decimals: elrondToken.decimals,
                })}
              </Text>
              {elrondToken?.assets?.svgUrl && (
                <Image
                  src={elrondToken.assets.svgUrl}
                  alt={elrondToken.ticker}
                  width={24}
                  height={24}
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              )}
            </>
          )}
        </Center>
      </Box>
    </Center>
  );
};
