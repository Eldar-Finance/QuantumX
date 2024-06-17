import { Center, Divider, Flex, Grid, Text, VStack } from "@chakra-ui/react";
import { BigUIntValue } from "@multiversx/sdk-core/out";
import { toknesID } from "api/net.config";
import { scCall } from "api/sc/calls";
import { fetchLastRewardedEpoch } from "api/sc/queries/farms2";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import Card from "components/Card/Card";
import StakeUnstake from "components/Farms/FarmsCard/Farms2/StakeUnstake/StakeUnstake";
import NextImage from "components/NextImage/NextImage";
import Link from "next/link";
import { selectElrondStats } from "redux/slices/elrond/elrond-slice";
import {
  selectUserFarms2Info,
  selectUserFarms2Rewards,
} from "redux/slices/farms2/farms2-slice";
import useSWR from "swr";
import { aprFarms } from "utils/functions/farms";
import {
  formatBalance,
  formatBalanceDolar,
} from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppSelector } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import useGetJexPrice from "utils/hooks/useGetJexPrice";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import useGetTokenPrice from "utils/hooks/useGetTokenPrice";
import { routeNames } from "utils/routes";
import {
  IScFarmItem,
  IScMultiFarmsRewardsLeft,
} from "utils/types/sc.interface";
import { farms2Data } from "views/Farms/constants";
import useCanUsePool7 from "views/Pools/hooks/useIsSrbStaker";
interface IProps {
  farm: IScFarmItem;
  multifarmRewardsLeft?: IScMultiFarmsRewardsLeft;
}

const BearlyCard = ({ farm, multifarmRewardsLeft }: IProps) => {
  const userFarm2Info = useAppSelector(selectUserFarms2Info);
  const userFarm2Rewards = useAppSelector(selectUserFarms2Rewards);
  const { token: stakingToken } = useGetElrondToken(farm.farm.stakingToken);
  const { tokens: stakingTokens } = useGetMultipleElrondTokens([
    farm.farm.stakingToken,
  ]);
  const userRewardsForThisFarm = userFarm2Rewards.data.filter(
    (f) => f.farmId === farm.farm.farmId
  );

  const { logo, name } = farms2Data[formatTokenI(farm.farm.stakingToken)] || {
    logo: "",
    name: "",
  };
  const { jexPrice } = useGetJexPrice(
    multifarmRewardsLeft.rewardsLeft.find((r) => r.token === toknesID.jex)
      ?.token
  );
  const { jexPrice: bonezPrice } = useGetJexPrice(
    multifarmRewardsLeft.rewardsLeft.find((r) => r.token === toknesID.bonez)
      ?.token
  );
  const userFarmInfoForThisFarm = userFarm2Info.data.find(
    (fi) => fi.farmId === farm.farm.farmId
  );
  const { tokens: rewardsTokens } = useGetMultipleElrondTokens(
    multifarmRewardsLeft
      ? multifarmRewardsLeft.rewardsLeft.map((f) => f.token)
      : []
  );

  const [staingTokenPrice] = useGetTokenPrice(farm.farm.stakingToken);
  const { data: lastRewardedEpoch } = useSWR<number>(
    //@ts-ignore
    farm.farm.farmId,
    fetchLastRewardedEpoch
  );
  const { data: stats } = useAppSelector(selectElrondStats);

  const apr = aprFarms(
    staingTokenPrice,
    stakingTokens,
    lastRewardedEpoch,
    rewardsTokens,
    farm,
    stats,
    "multi",
    multifarmRewardsLeft?.rewardsLeft,
    [
      { tokenI: toknesID.jex, price: jexPrice },
      { tokenI: toknesID.bonez, price: bonezPrice },
    ]
  );

  const handleHarvest = () => {
    scCall(
      "farms2",
      "harvest",
      [new BigUIntValue(new BigNumber(farm.farm.farmId))],
      450000000
    );
  };
  const { isSrbStaker } = useCanUsePool7();

  return (
    <Card>
      <Grid templateColumns={{ xs: "1fr", tablet: "2fr 1fr" }} gap={20}>
        <Flex flexDir={"column"} w="full">
          <Flex w="full" justify={"space-between"} mb={10}>
            {stakingToken && (
              <Flex gap={5}>
                {stakingToken?.assets?.svgUrl ? (
                  <NextImage
                    alt=""
                    src={stakingToken.assets?.svgUrl}
                    height={55}
                    width={55}
                  />
                ) : (
                  <NextImage src={logo} alt="logo" height={60} width={60} />
                )}

                <Text fontWeight={"600"}> {stakingToken.name}</Text>
              </Flex>
            )}
            <Flex flexDir={"column"} align="center"></Flex>
          </Flex>
          <Center flexDir={"column"} gap={6} mb={10} fontSize={"lg"} flex={1}>
            <VStack>
              <Text color="white.400">APR</Text>
              <Text>{apr}</Text>
            </VStack>
            <VStack>
              <Text color="white.400">Total Value Locked</Text>
              <Text>
                ${" "}
                {formatBalanceDolar(
                  {
                    balance: farm.stakedBalance,
                    decimals: stakingToken.decimals,
                  },
                  staingTokenPrice,
                  true
                )}
              </Text>
            </VStack>
            <VStack>
              <Text color="white.400">Staked Balance</Text>
              <Text>
                {formatBalance({
                  balance: userFarmInfoForThisFarm?.stakedBalance,
                  decimals: stakingToken.decimals,
                })}{" "}
                ($
                {formatBalanceDolar(
                  {
                    balance: userFarmInfoForThisFarm?.stakedBalance,
                    decimals: stakingToken.decimals,
                  },
                  staingTokenPrice,
                  true
                )}
                )
              </Text>
            </VStack>
          </Center>
          <Flex w="full" justify={"space-between"} alignItems="center">
            <Flex flexDir={"column"} w="full">
              <Flex w="full" justify={"space-between"} gap={4}>
                <StakeUnstake
                  farm={farm}
                  userFarmItem={userFarmInfoForThisFarm}
                  isPool
                  isBearly
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <VStack>
          <Text fontWeight={600} mt={5}>
            EARN
          </Text>
          <Divider maxW="70%" />
          <Flex
            flexDir={"column"}
            flex={1}
            w="full"
            marginTop={"15px !important"}
            gap={3}
            pb={6}
          >
            {rewardsTokens.map((token) => {
              const rewardInfo = userRewardsForThisFarm.find(
                (r) => r.rewardToken === token.identifier
              );

              return (
                <Flex key={token.identifier} w="full" justify={"space-around"}>
                  <Text fontSize={"2xl"} fontWeight="bold">
                    {formatBalance({
                      balance: rewardInfo?.harvestableAmount || 0,
                      decimals: token.decimals,
                    })}
                  </Text>
                  <NextImage
                    alt=""
                    src={token.assets?.svgUrl}
                    height={35}
                    width={35}
                  />
                </Flex>
              );
            })}
          </Flex>
          <Flex gap={4} w="full" justifyContent={"space-around"}>
            <Link href={routeNames.converter}>
              <ActionButton>SWAP TO RARE</ActionButton>
            </Link>
            <ActionButton
              onClick={handleHarvest}
              disabled={
                userRewardsForThisFarm.reduce(
                  (acc, current) => (acc += current.harvestableAmount),
                  0
                ) === 0 ||
                (!isSrbStaker && farm.farm.farmId === 7)
              }
            >
              Harvest
            </ActionButton>
          </Flex>
        </VStack>
      </Grid>
    </Card>
  );
};

export default BearlyCard;
