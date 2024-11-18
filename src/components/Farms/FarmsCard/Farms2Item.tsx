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
  Tooltip,
} from "@chakra-ui/react";
import NextImage from "components/NextImage/NextImage";

import { createContext, Fragment, PropsWithChildren, useEffect } from "react";
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
import { farms2Data, farmsTobeShutDown } from "views/Farms/constants";
import useApr from "views/Pools/hooks/useApr";
import useCanUsePool7 from "views/Pools/hooks/useIsSrbStaker";
import EarnedRewards from "./Farms2/EarnedRewards/EarnedRewards";
import EarnTokens from "./Farms2/EarnTokens/EarnTokens";
import StakeUnstake from "./Farms2/StakeUnstake/StakeUnstake";
import Avilable from "./Farms2/Withdraw/Avilable";
// import { AiOutlinePlus } from 'react-icons/ai';

interface IProps {
  farm: IScFarmItem;
  farmUserInfoArr: IScUserFarmInfo[];
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
  farmUserInfoArr,
  farmUserRewards,
  stakedTokenPrice,
  tvl,
  multifarmRewardsLeft,
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
    : { logo: "/images/defaultTokenLogo.png", name: "" };

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

  const vertGap = 2;

  const showWarning = !farm.totalRewardsLeft && multifarmRewardsLeft.length == 0; 
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
          <Box flex="1" textAlign="left" w="full" py={1}>
            <Grid
              w="full"
              flexDir={{ xs: "column", md: "row" }}
              templateColumns={{ xs: "1fr", md: "0.25fr 0.01fr 1fr"}}
              gap={{ xs: "4", md: "1" }}
            >
              {/* TOKENS */}
              <Flex gap={3} flexDir={"row"} justifyContent={{sm: "center", md: "flex-start"}}>
                {stakingToken && stakingToken.name && stakingToken.identifier ? (
                  <>
                    {formatTokenI(stakingToken.name).slice(-2) === "LP" || stakingToken.identifier.slice(0,2) === "LP" ? (
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
                            alt=""
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
                      </Fragment>
                    );
                  })
                ) : (
                  <Flex></Flex>
                )}
              </Flex>

              {/* NOTICE */}
              <Flex
                ml={2}
                flexDir={"column"}
                justifyContent="center"
                alignItems={{xs: "center", md: "center"}}
                height="100%"
                // mt={{ xs: othersStakedTokens.length > 0 ? "-40px" : "-20px", md: "0" }} // added mt prop to move the component up if screen is xs
              >
                {showWarning && (
                  <Box fontSize={"lg"} textAlign={"center"}>
                    <Tooltip
                      p={4}
                      label={
                        <div style={{ textAlign: 'center'}}>
                          ⚠️ Caution ⚠️<br />
                          Currently, there are no deposited rewards by the creator of this Pool/Farm.<br />
                          DYOR before making any actions.
                        </div>
                      }
                      aria-label="A tooltip"
                      bgColor={"black.base"}
                      textColor={"white"}
                      fontSize={"16px"}
                      border={"1px solid yellow"}
                      borderRadius={"md"}
                    >
                      ⚠️
                    </Tooltip>
                  </Box>
                )}
              </Flex>

              {/* INFO GRID */}
              <Grid
                w="full"
                templateColumns={{ xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
                gap={{ xs: "4", md: "1" }}
              >
                {/* STAKED */}
                <Flex
                  flexDir={"column"}
                  textAlign="center"
                  h="full"
                  justifyContent={"center"}
                  gap={vertGap}
                >
                  <Text color="white.400">Staked Balance</Text>
                  {farmUserInfoArr.length > 0 ? <>
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
                  </> : <Text>0 ($ 0)</Text>}
                </Flex>
                {/* APR */}
                <Flex
                  flexDir={"column"}
                  textAlign="center"
                  h="full"
                  justifyContent={"center"}
                  gap={vertGap}
                >
                  <Text textTransform={"uppercase"} color="white.400">
                    Apr / Apy
                  </Text>
                  {apr != '0 %' && apr != 'NaN %' ? 
                  <Text>
                      {apr}&nbsp; / &nbsp;{apy}
                  </Text> :
                  <Text>Huge</Text>}
                </Flex>
                {/* TVL */}
                <Flex
                  flexDir={"column"}
                  textAlign="center"
                  h="full"
                  justifyContent={"center"}
                  gap={vertGap}
                >
                  {price > 0 ?
                  <>
                    <Text color="white.400">Total Value Locked</Text>
                    <Text>$ {formatNumber(tvl)}</Text>
                  </> :
                  <>
                    <Text color="white.400">Total Tokens Locked</Text>
                    <Text>{formatBalance({
                        balance: farm?.stakedBalance,
                        decimals: stakingToken?.decimals,
                      })}
                    </Text>
                  </>}
                </Flex>
                {/* EARNED */}
                <EarnTokens
                  vertGap={vertGap}
                  userRewardsTokensIdentifiers={
                    farm.farm.rewardToken === ""
                      ? multifarmRewardsLeft.map((r) => r.token)
                      : [farm.farm.rewardToken]
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <AccordionIcon
            color="main"
            py={{xs: "3", md: "0"}}
            alignSelf={{sm: "flex-start", md: "center"}}
            h="full"
          />
        </AccordionButton>
      </Box>
      <AccordionPanel pb={4} w="full" bg="black.baseDark">
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
              userFarmItem={farmUserInfoArr[0]}
              isPool={isPool}
              farmUserRewards={farmUserRewards}
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
      bg="black.base"
      p="4"
      // border={"1px solid "}
      // borderColor="white.400"
      borderRadius={"xl"}
      {...props}
    >
      {children}
    </Box>
  );
};
