import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Flex,
  Grid,
  Text,
} from "@chakra-ui/react";
import NextImage from "components/NextImage/NextImage";

import { createContext, PropsWithChildren, ReactNode, useEffect } from "react";
import {
  IScFarm2RewardsLeft,
  IScFarmItem,
  IScUserFarmInfo,
  IScUserFarmRewards,
} from "utils/types/sc.interface";

import { toknesID } from "api/net.config";
import { fetchLastRewardedEpoch } from "api/sc/queries/farms2";
import LpTokenImage from "components/LpTokenImage/LpTokenImage";
import { selectElrondStats } from "redux/slices/elrond/elrond-slice";
import { addTvlInEldarFarm } from "redux/slices/proteo/proteo";
import useSWR from "swr";
import { aprFarms } from "utils/functions/farms";
import {
  formatBalance,
  formatBalanceDolar,
  formatNumber,
} from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import useGetJexPrice from "utils/hooks/useGetJexPrice";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import { farms2Data } from "views/Farms/constants";
import EarnedRewards from "./components/EarnedRewards/EarnedRewards";
import EarnTokens from "./components/EarnTokens/EarnTokens";
import StakeUnstake from "./components/StakeUnstake/StakeUnstake";
import Avilable from "./components/Withdraw/Avilable";

interface IProps {
  farm: IScFarmItem;
  farmUserInfo: IScUserFarmInfo;
  farmUserRewards: IScUserFarmRewards[];
  logoSize?: number;
  stakedTokenPrice: number;
  isPool?: boolean;
  tvl: number;
  multifarmRewardsLeft: IScFarm2RewardsLeft[];
  disable?: boolean;
  disableComponent: ReactNode;
  maxStakingAmount?: number;
}

export const FarmItemContext = createContext<{ farm: IScFarmItem }>({
  farm: null,
});

const Farms2Item = ({
  farm,
  logoSize,
  isPool,
  farmUserInfo,
  farmUserRewards,
  stakedTokenPrice,
  tvl,
  multifarmRewardsLeft,
  disable,
  disableComponent,
  maxStakingAmount,
}: IProps) => {
  const { token: stakingToken } = useGetElrondToken(farm.farm.stakingToken);

  const { token: rewardToken } = useGetElrondToken(farm.farm.rewardToken);
  const { data: lastRewardedEpoch } = useSWR<number>(
    //@ts-ignore
    farm.farm.farmId,
    fetchLastRewardedEpoch
  );
  const { logo, name } = farms2Data[formatTokenI(farm.farm.stakingToken)]
    ? farms2Data[formatTokenI(farm.farm.stakingToken)]
    : { logo: "", name: "" };
  const { data: stats } = useAppSelector(selectElrondStats);
  const { jexPrice } = useGetJexPrice(
    multifarmRewardsLeft.find((r) => r.token === toknesID.jex)?.token
  );
  const { tokens: rewardsTokens } = useGetMultipleElrondTokens(
    multifarmRewardsLeft ? multifarmRewardsLeft.map((f) => f.token) : []
  );

  const price = stakedTokenPrice;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      addTvlInEldarFarm({
        balance: formatBalanceDolar(
          {
            balance: farm.stakedBalance,
            decimals: stakingToken.decimals,
          },
          price
        ),
        id: farm.farm.stakingToken,
        type: isPool ? "pool" : "farm",
      })
    );
  }, [
    dispatch,
    farm.farm.stakingToken,
    farm.stakedBalance,
    isPool,
    price,
    stakingToken.decimals,
  ]);

  let apr: string = "-";
  if (farm.farm.rewardToken === "") {
    apr = aprFarms(
      price,
      stakingToken,
      lastRewardedEpoch,
      rewardsTokens,
      farm,
      stats,
      "multi",
      multifarmRewardsLeft,
      [{ tokenI: toknesID.jex, price: jexPrice }]
    );
  } else {
    apr = aprFarms(
      price,
      stakingToken,
      lastRewardedEpoch,
      rewardToken,
      farm,
      stats
    );
  }

  return (
    <FarmItemContext.Provider value={{ farm }}>
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
                        <Text fontWeight={"600"}>
                          {name || stakingToken.name}
                        </Text>
                      </Flex>
                    ) : (
                      <Flex gap="4" alignItems={"center"}>
                        {stakingToken?.assets?.pngUrl ||
                        stakingToken?.assets?.svgUrl ? (
                          <NextImage
                            alt=""
                            src={
                              stakingToken.assets.pngUrl ||
                              stakingToken?.assets?.svgUrl
                            }
                            height={logoSize || 27}
                            width={logoSize || 27}
                          />
                        ) : (
                          <NextImage
                            src={logo}
                            alt="logo"
                            height={45}
                            width={45}
                          />
                        )}

                        <Text fontWeight={"600"}>
                          {name || stakingToken.name}
                        </Text>
                      </Flex>
                    )}
                  </>
                ) : (
                  <Flex></Flex>
                )}
                <Flex flexDir={"column"} textAlign="center">
                  <Text color="white.400">Staked Balance</Text>
                  <Text>
                    {formatBalance({ balance: farmUserInfo?.stakedBalance })}{" "}
                    <Box as="span" whiteSpace={"nowrap"}>
                      (${" "}
                      {formatBalanceDolar(
                        {
                          balance: farmUserInfo?.stakedBalance,
                          decimals: stakingToken.decimals,
                        },
                        price,
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
                  <Text>$ {formatNumber(tvl)}</Text>
                </Flex>
                <EarnTokens
                  userRewardsTokensIdentifiers={
                    farm.farm.rewardToken === ""
                      ? multifarmRewardsLeft.map((r) => r.token)
                      : [farm.farm.rewardToken]
                  }
                />
              </Grid>
            </Box>
            <AccordionIcon color="main" />
          </AccordionButton>
        </Box>
        <AccordionPanel w="full" bg="black.base" p={0}>
          {disable ? (
            <Box w="full">{disableComponent}</Box>
          ) : (
            <>
              <Grid
                flex="1"
                templateColumns={{ xs: "1fr", md: "1fr 1fr" }}
                gap="4"
                p={4}
              >
                <PanelBox>
                  <Flex justifyContent={"center"} textAlign={"center"} gap={5}>
                    <EarnedRewards
                      userRewards={farmUserRewards}
                      multifarmRewardsLeft={
                        farm.farm.rewardToken === ""
                          ? multifarmRewardsLeft.map((r) => r.token)
                          : [farm.farm.rewardToken]
                      }
                    />
                  </Flex>
                </PanelBox>

                <PanelBox>
                  <Avilable farm={farm} userFarmRewards={farmUserRewards} />
                </PanelBox>
                <PanelBox gridColumn={{ xs: "auto", md: "1/3" }}>
                  <StakeUnstake
                    farm={farm}
                    userFarmItem={farmUserInfo}
                    isPool={isPool}
                    disable={disable}
                    maxStakingAmount={maxStakingAmount}
                  />
                </PanelBox>
              </Grid>
            </>
          )}
        </AccordionPanel>
      </AccordionItem>
    </FarmItemContext.Provider>
  );
};

export default Farms2Item;

const PanelBox = ({ children, ...props }: PropsWithChildren<BoxProps>) => {
  return (
    <Box
      p="4"
      border={"1px solid "}
      borderColor="white.400"
      borderRadius={"lg"}
      {...props}
    >
      {children}
    </Box>
  );
};
