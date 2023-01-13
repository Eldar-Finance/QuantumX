import { Center, Flex, Text } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import { MexlockIcon } from "components/Icons/ui";
import { memo, useEffect, useState } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import { useAppSelector } from "utils/hooks/redux";
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
      <Flex alignItems={"center"} flexWrap="wrap">
        <Flex flexDir={{ xs: "column", md: "row" }}>
          <BadgeStaticBox
            title={" My Staked Badges"}
            content={`${sftsInStaking}  Badges`}
          />
          <BadgeStaticBox
            title={"You have earned"}
            content={
              <Center>
                <Text mr={2}>
                  {formatBalance({ balance: claimedLkmex, decimals: 0 })}
                </Text>
                <MexlockIcon size={"24px"} />
              </Center>
            }
          />
          <BadgeStaticBox
            title={"Available for claim"}
            content={
              <Center>
                <Text mr={2}>
                  {formatBalance({ balance: claimableLkmex, decimals: 0 })}
                </Text>
                <MexlockIcon size={"24px"} />
              </Center>
            }
          />
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
        <BadgeStaticBox
          title={"Paid out"}
          content={
            <Center>
              <Text mr={2}>
                {formatBalance({ balance: totalPaidLkmex, decimals: 0 })}
              </Text>
              <MexlockIcon size={"24px"} />
            </Center>
          }
        />
      </Flex>
    </Flex>
  );
};

export default memo(BadgesStatics);
