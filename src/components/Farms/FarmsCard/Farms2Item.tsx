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

import { createContext, PropsWithChildren, useEffect } from "react";
import { IScFarmItem, IScUserFarmInfo } from "utils/types/sc.interface";

import { fetchLastRewardedEpoch } from "api/sc/queries/farms2";
import { selectElrondStats } from "redux/slices/elrond/elrond-slice";
import { addTvlInEldarFarm } from "redux/slices/proteo/proteo";
import useSWR from "swr";
import {
  formatBalance,
  formatBalanceDolar,
  formatNumber,
} from "utils/functions/formatBalance";
import { preventExponetialNotation } from "utils/functions/numbers";
import { formatTokenI } from "utils/functions/tokens";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import useGetLpTokenPrice from "utils/hooks/useGetLpTokenPrice";
import { farms2Data } from "views/Farms/constants";
import EarnedRewards from "./Farms2/EarnedRewards/EarnedRewards";
import EarnTokens from "./Farms2/EarnTokens/EarnTokens";
import StakeUnstake from "./Farms2/StakeUnstake/StakeUnstake";
import Avilable from "./Farms2/Withdraw/Avilable";

interface IProps {
  farm: IScFarmItem;
  farmUserInfo: IScUserFarmInfo;
  logoSize?: number;
}

export const ProteoItemContenxt = createContext({
  tokenInfo: null,
  tokenInfo2: null,
  decimals: 0,
});

const Farms2Item = ({ farm, logoSize, farmUserInfo }: IProps) => {
  const { token: stakingToken } = useGetElrondToken(farm.farm.stakingToken);
  const { token: rewardToken } = useGetElrondToken(farm.farm.rewardToken);
  const { data: lastRewardedEpoch } = useSWR<number>(
    //@ts-ignore
    farm.farm.farmId,
    fetchLastRewardedEpoch
  );
  const { logo, name, lpToken2, scFarmAddress } = farms2Data[
    formatTokenI(farm.farm.stakingToken)
  ]
    ? farms2Data[formatTokenI(farm.farm.stakingToken)]
    : { logo: "", name: "", lpToken2: "", scFarmAddress: "" };
  const { data: stats } = useAppSelector(selectElrondStats);
  const lpPrice = useGetLpTokenPrice(
    scFarmAddress,
    lpToken2,
    farm.farm.stakingToken
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      addTvlInEldarFarm({
        balance: formatBalanceDolar(
          {
            balance: farm.stakedBalance,
            decimals: stakingToken.decimals,
          },
          lpPrice
        ),
        id: farm.farm.stakingToken,
        type: "farm",
      })
    );
  }, [
    dispatch,
    farm.farm.stakingToken,
    farm.stakedBalance,
    lpPrice,
    stakingToken.decimals,
  ]);

  const price = stakingToken?.price || lpPrice;

  let apr: string = "-";
  if (
    stakingToken &&
    rewardToken &&
    lastRewardedEpoch &&
    farm.totalRewardsLeft > 0 &&
    farm.stakedBalance > 0
  ) {
    const epochDifference = lastRewardedEpoch - stats.epoch;
    apr =
      formatNumber(
        preventExponetialNotation(
          ((formatBalanceDolar(
            {
              balance: farm.totalRewardsLeft,
              decimals: rewardToken.decimals,
            },
            rewardToken.price
          ) /
            formatBalanceDolar(
              {
                balance: farm.stakedBalance,
                decimals: stakingToken.decimals,
              },
              price
            )) *
            100 *
            365) /
            epochDifference
        ).toString()
      ) + "%";
  }

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
              <Flex gap="4" alignItems={"center"}>
                {stakingToken?.assets?.pngUrl ||
                stakingToken?.assets?.svgUrl ? (
                  <NextImage
                    alt=""
                    src={
                      stakingToken.assets.pngUrl || stakingToken?.assets?.svgUrl
                    }
                    height={logoSize || 27}
                    width={logoSize || 27}
                  />
                ) : (
                  <NextImage src={logo} alt="rareusdc" height={45} width={45} />
                )}

                <Text fontWeight={"600"}>{name || stakingToken.name}</Text>
              </Flex>
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
                <Text>
                  ${" "}
                  {formatBalanceDolar(
                    {
                      balance: farm.stakedBalance,
                      decimals: stakingToken.decimals,
                    },
                    price,
                    true
                  )}
                </Text>
              </Flex>
              <EarnTokens farm={farm} />
            </Grid>
          </Box>
          <AccordionIcon color="main" />
        </AccordionButton>
      </Box>
      <AccordionPanel pb={4} w="full" bg="black.base">
        <Grid flex="1" templateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap="4">
          <PanelBox>
            <Flex justifyContent={"center"} textAlign={"center"} gap={5}>
              <EarnedRewards farm={farm} userFarmInfo={farmUserInfo} />
            </Flex>
          </PanelBox>

          <PanelBox>
            <Avilable farm={farm} userFarmInfo={farmUserInfo} />
          </PanelBox>
          <PanelBox gridColumn={{ xs: "auto", md: "1/3" }}>
            <StakeUnstake farm={farm} userFarmItem={farmUserInfo} />
          </PanelBox>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
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
