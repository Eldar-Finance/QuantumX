import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import Image from "next/image";
import { memo, useEffect, useState } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import { useAppSelector } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import BadgeStaticBox from "../BadgeStaticBox/BadgeStaticBox";

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

  return (
    <Flex
      justifyContent={{ xs: "center", lg: "space-between" }}
      alignItems="center"
      w={"full"}
      mb={6}
      flexDir={{ xs: "column", lg: "row" }}
    >
      <Flex alignItems={"flex-start"} flexWrap="wrap">
        <Flex flexDir={{ xs: "column", md: "row" }}>
          <BadgeStaticBox
            alignItems={"flex-start"}
            justifyContent="flex-start"
            title={" My Staked Badges"}
            content={`${sftsInStaking}  Badges`}
          />
          <Center flexDir={"column"}>
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
          <Center flexDir={"column"}>
            <Text fontSize={"12px"} color="gray.500" whiteSpace={"nowrap"}>
              Avilabel for claim
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
                  <StaticInfo amount={r.value} token={r.tokenI} key={r.token} />
                );
              })}
            </>
          )}
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
                />
              )}
            </>
          )}
        </Center>
      </Box>
    </Center>
  );
};
