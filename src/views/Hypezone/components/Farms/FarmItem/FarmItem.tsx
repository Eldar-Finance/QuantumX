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

import {
  createContext,
  Fragment,
  PropsWithChildren,
  ReactNode,
  useEffect,
} from "react";
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
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import useGetMultiplePrices from "utils/hooks/useGetMultiplePrices";
import { farms2Data } from "views/Farms/constants";
import useApr from "views/Pools/hooks/useApr";
import EarnedRewards from "./components/EarnedRewards/EarnedRewards";
import EarnTokens from "./components/EarnTokens/EarnTokens";
import StakeUnstake from "./components/StakeUnstake/StakeUnstake";
import Avilable from "./components/Withdraw/Avilable";

interface IProps {
  farm: IScFarmItem;
  farmUserInfoArr: IScUserFarmInfo[];
  farmUserRewards: IScUserFarmRewards[];
  logoSize?: number;
  stakedTokenPrice: number;
  isPool?: boolean;
  tvl: number;
  multifarmRewardsLeft: IScFarm2RewardsLeft[];
  disable?: boolean;
  disableComponent: ReactNode;
  maxStakingAmount?: string;
  fixedStakedBalance?: string;
}

export const FarmItemContext = createContext<{ farm: IScFarmItem }>({
  farm: null,
});

const Farms2Item = ({
  farm,
  logoSize,
  isPool,
  farmUserInfoArr,
  farmUserRewards,
  stakedTokenPrice,
  tvl,
  multifarmRewardsLeft,
  disable,
  disableComponent,
  maxStakingAmount,
  fixedStakedBalance,
}: IProps) => {
  const { token: stakingToken } = useGetElrondToken(farm.farm.stakingToken);
  const { tokens: othersStakedTokens } = useGetMultipleElrondTokens(
    farm?.extraPools.map((item) => item.stakedToken)
  );
  const [prices] = useGetMultiplePrices([
    farm.farm.stakingToken,
    ...farm?.extraPools.map((item) => item.stakedToken),
  ]);

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

  const { apr, apy } = useApr(
    farm,
    multifarmRewardsLeft,
    stakedTokenPrice,
    fixedStakedBalance
  );

  // console.log(farm.farm.farmId)

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
                <Flex gap={3} flexDir={"column"} mt={4}>
                  {stakingToken ? (
                    <>
                      {formatTokenI(stakingToken.name).slice(-2) === "LP" ? (
                        <Flex gap="4" alignItems="center">
                          <Box display="flex" alignItems="center" flexWrap="nowrap">
                            <LpTokenImage lpToken={stakingToken} />
                            <Text fontWeight="600" ml="6" overflow="hidden" textOverflow="ellipsis">
                              {name || stakingToken.name}
                            </Text>
                          </Box>
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
                  {othersStakedTokens ? (
                    othersStakedTokens.map((stakingToken) => {
                      return (
                        <Fragment key={stakingToken.identifier}>
                          {/* <Center w="full">
                          <Icon as={PlusSquareIcon} fontSize={"30px"} />
                        </Center> */}
                          {formatTokenI(stakingToken.name).slice(-2) ===
                          "LP" ? (
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
                        </Fragment>
                      );
                    })
                  ) : (
                    <Flex></Flex>
                  )}
                </Flex>
                <Flex flexDir={"column"} textAlign="center" h="full">
                  <Text color="white.400">Staked Balance</Text>

                  <Flex
                    flexDir={"column"}
                    justifyContent={"space-between"}
                    flex={1}
                    py={2}
                  >
                    {farmUserInfoArr.map((farmUserInfo) => {
                      const token =
                        farmUserInfo.stakedToken === stakingToken.identifier
                          ? stakingToken
                          : othersStakedTokens.find(
                              (item) =>
                                item.identifier === farmUserInfo.stakedToken
                            );

                      const price = prices.find(
                        (tp) => tp.tokenI === farmUserInfo.stakedToken
                      )?.price;

                      return (
                        <Text key={farmUserInfo.stakedToken}>
                          {formatBalance({
                            balance: farmUserInfo?.stakedBalance,
                            decimals: token?.decimals,
                          })}{" "}
                          <Box as="span" whiteSpace={"nowrap"}>
                            (${" "}
                            {formatBalanceDolar(
                              {
                                balance: farmUserInfo?.stakedBalance,
                                decimals: token?.decimals,
                              },
                              price,
                              true
                            )}
                            )
                          </Box>
                        </Text>
                      );
                    })}
                  </Flex>
                </Flex>
                <Flex
                  flexDir={"column"}
                  textAlign="center"
                  h="full"
                  justifyContent={"center"}
                >
                <Text textTransform={"uppercase"} color="white.400">
                  Apr / Apy
                </Text>
                {farm.farm.farmId !== 41 ? (
                  <Text>
                    {apr} / {apy}
                  </Text>
                ) : (
                  <Text>Variable</Text>
                )}
                </Flex>
                <Flex
                  flexDir={"column"}
                  textAlign="center"
                  h="full"
                  justifyContent={"center"}
                >
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
                    userFarmItem={farmUserInfoArr[0]}
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
