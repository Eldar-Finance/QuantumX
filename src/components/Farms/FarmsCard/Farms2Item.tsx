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
import {
  IScFarm2RewardsLeft,
  IScFarmItem,
  IScUserFarmInfo,
  IScUserFarmRewards,
} from "utils/types/sc.interface";

import LpTokenImage from "components/LpTokenImage/LpTokenImage";
import { addTvlInEldarFarm } from "redux/slices/proteo/proteo";
import {
  formatBalance,
  formatBalanceDolar,
  formatNumber,
} from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppDispatch } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import { farms2Data } from "views/Farms/constants";
import useApr from "views/Pools/hooks/useApr";
import useCanUsePool7 from "views/Pools/hooks/useIsSrbStaker";
import EarnedRewards from "./Farms2/EarnedRewards/EarnedRewards";
import EarnTokens from "./Farms2/EarnTokens/EarnTokens";
import StakeUnstake from "./Farms2/StakeUnstake/StakeUnstake";
import Avilable from "./Farms2/Withdraw/Avilable";

interface IProps {
  farm: IScFarmItem;
  farmUserInfo: IScUserFarmInfo;
  farmUserRewards: IScUserFarmRewards[];
  logoSize?: number;
  stakedTokenPrice: number;
  isPool?: boolean;
  tvl: number;
  multifarmRewardsLeft: IScFarm2RewardsLeft[];
}

export const ProteoItemContenxt = createContext({
  tokenInfo: null,
  tokenInfo2: null,
  decimals: 0,
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
}: IProps) => {
  const { token: stakingToken } = useGetElrondToken(farm.farm.stakingToken);

  const { logo, name } = farms2Data[formatTokenI(farm.farm.stakingToken)]
    ? farms2Data[formatTokenI(farm.farm.stakingToken)]
    : { logo: "", name: "" };

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

  // only for srb farm
  const { isSrbStaker } = useCanUsePool7();

  const { apr, apy } = useApr(farm, multifarmRewardsLeft, stakedTokenPrice);

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
                  Apr / Apy
                </Text>
                <Text>
                  {apr} / {formatNumber(apy)} %
                </Text>
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
      <AccordionPanel pb={4} w="full" bg="black.base">
        <Grid flex="1" templateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap="4">
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
            />
          </PanelBox>
        </Grid>
        {!isSrbStaker && farm.farm.farmId === 7 && (
          <Text textAlign={"center"} mt={4}>
            You must be a staker of SRB-61daf7.
          </Text>
        )}
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
