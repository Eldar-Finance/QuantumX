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

import { createContext, PropsWithChildren } from "react";
import { IScFarmItem, IScUserFarmInfo } from "utils/types/sc.interface";

import {
  formatBalance,
  formatBalanceDolar,
} from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
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
  const { token: rewardsToken } = useGetElrondToken(farm.farm.rewardToken);
  const { token: stakingToken } = useGetElrondToken(farm.farm.stakingToken);

  console.log("stakingToken", stakingToken);

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
                {(stakingToken?.assets?.pngUrl ||
                  stakingToken?.assets?.svgUrl) && (
                  <NextImage
                    alt=""
                    src={
                      stakingToken.assets.pngUrl || stakingToken?.assets?.svgUrl
                    }
                    height={27}
                    width={27}
                  />
                )}

                <Text fontWeight={"600"}>
                  {formatTokenI(farm.farm.stakingToken)}
                </Text>
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
                    stakingToken?.price
                  )}
                  )
                </Text>
              </Flex>
              <Flex flexDir={"column"} textAlign="center">
                <Text color="white.400">Apr</Text>
                <Text>{farm.apr} %</Text>
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
                    stakingToken?.price
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
            <StakeUnstake farm={farm} />
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
