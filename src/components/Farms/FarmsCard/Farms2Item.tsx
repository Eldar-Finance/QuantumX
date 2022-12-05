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

import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { IScFarmItem, IScUserFarmInfo } from "utils/types/sc.interface";

import { getLpTokenPrice } from "api/rest/elrondApi/tokens";
import { addTvlInEldarFarm } from "redux/slices/proteo/proteo";
import {
  formatBalance,
  formatBalanceDolar,
  formatNumber,
} from "utils/functions/formatBalance";
import { preventExponetialNotation } from "utils/functions/numbers";
import { formatTokenI } from "utils/functions/tokens";
import { useAppDispatch } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import { farms2Data } from "views/Farms/constants";
import EarnedRewards from "./Farms2/EarnedRewards/EarnedRewards";
import EarnTokens from "./Farms2/EarnTokens/EarnTokens";
import StakeUnstake from "./Farms2/StakeUnstake/StakeUnstake";
import Avilable from "./Farms2/Withdraw/Avilable";

interface IProps {
  farm: IScFarmItem;
  farmUserInfo: IScUserFarmInfo;
}

export const ProteoItemContenxt = createContext({
  tokenInfo: null,
  tokenInfo2: null,
  decimals: 0,
});

const Farms2Item = ({ farm, farmUserInfo }: IProps) => {
  const { token: stakingToken } = useGetElrondToken(farm.farm.stakingToken);
  const { token: rewardToken } = useGetElrondToken(farm.farm.rewardToken);
  const [lpPrice, setLpPrice] = useState(0);
  const dispatch = useAppDispatch();
  const { logo, name, lpToken2, scFarmAddress } = farms2Data[
    formatTokenI(farm.farm.stakingToken)
  ];

  useEffect(() => {
    dispatch(
      addTvlInEldarFarm({
        balance: formatBalanceDolar(
          {
            balance: farm.stakedBalance,
            decimals: stakingToken.decimals,
          },
          stakingToken?.price
        ),
        id: farm.farm.stakingToken,
        type: "farm",
      })
    );
  }, [
    dispatch,
    farm.farm.stakingToken,
    farm.stakedBalance,
    stakingToken.decimals,
    stakingToken?.price,
  ]);

  useEffect(() => {
    getLpTokenPrice(scFarmAddress, lpToken2, farm.farm.stakingToken).then(
      (res) => {
        setLpPrice(res);
      }
    );
  }, [farm.farm.rewardToken, farm.farm.stakingToken, lpToken2, scFarmAddress]);

  const price = stakingToken?.price || lpPrice;
  let apr: string = "-";

  if (
    stakingToken &&
    rewardToken &&
    farm.totalRewardsLeft > 0 &&
    farm.stakedBalance > 0
  ) {
    apr =
      formatNumber(
        preventExponetialNotation(
          (formatBalanceDolar(
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
            100
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
                    height={27}
                    width={27}
                  />
                ) : (
                  <NextImage src={logo} alt="rareusdc" height={45} width={45} />
                )}

                <Text fontWeight={"600"}>{name}</Text>
              </Flex>
              <Flex flexDir={"column"} textAlign="center">
                <Text color="white.400">Staked Balance</Text>
                <Text>
                  {formatBalance({ balance: farmUserInfo?.stakedBalance })} (${" "}
                  {formatBalanceDolar(
                    {
                      balance: farmUserInfo?.stakedBalance,
                      decimals: stakingToken.decimals,
                    },
                    price,
                    true
                  )}
                  )
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
          <PanelBox gridColumn={"1/3"}>
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
