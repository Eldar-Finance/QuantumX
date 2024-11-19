import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import hypeImage from "assets/logos/hype.svg";
import BlurComponent from "components/BlurComponent/BlurComponent";
import NextImage from "components/NextImage/NextImage";
import { ReactNode, useEffect } from "react";
import { fetchStats } from "redux/slices/elrond/elrond-slice";
import {
  selectHype,
  selectUserFarms2Info,
  selectUserFarms2Rewards,
} from "redux/slices/farms2/farms2-slice";
import {
  fetchAllFarms,
  fetchMultiFarms2RewardsLeft,
  fetchUSerFarmInfo,
  fetchUSerRewardsInfo,
} from "redux/slices/farms2/funcs";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { fetchMexPairs } from "redux/slices/userAcount/funcs";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import FarmAccordion from "./FarmAccordion";

interface IProps {
  title: string;
  subtitle?: string;
  ids: number[];
  isPool?: boolean;
  disableIds?: number[];
  disableComponent: ReactNode;
  maxStakingAmount?: string;
  fixedStakedBalance?: string;
  noRestrictionsIds?: number[];
  switchOn?: boolean;
  showSwitch?: boolean;
}

const blur = false;

const FarmList = ({
  title,
  subtitle,
  ids,
  isPool,
  disableIds,
  disableComponent,
  maxStakingAmount,
  fixedStakedBalance,
  noRestrictionsIds,
  switchOn,
}: IProps) => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  const farms2 = useAppSelector(selectHype);
  const hypeFarms = farms2.filter((farm) => ids.includes(farm.farm.farmId));
  const userFarm2Info = useAppSelector(selectUserFarms2Info);
  const userFarm2Rewards = useAppSelector(selectUserFarms2Rewards);

  useEffect(() => {
    if (address) {
      //farms from oteher farms (Quantumn smart constract)
      dispatch(fetchUSerFarmInfo(address));
      dispatch(fetchUSerRewardsInfo(address));
    }
  }, [address, dispatch]);
  useEffect(() => {
    dispatch(fetchMexPairs());
    dispatch(fetchMultiFarms2RewardsLeft());

    //elrond network
    dispatch(fetchStats());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllFarms());
  }, [dispatch]);

  let displayedFarms = hypeFarms;
  if (switchOn) {
    displayedFarms = hypeFarms.filter((farm) => {
      return userFarm2Info.data.some(
        (userFarm) =>
          userFarm.farmId === farm.farm.farmId &&
          Number(userFarm.stakedBalance) > 0
    );
  })};

  return (
    displayedFarms.length > 0 && <Box mt={20}>
      <Flex mb={6} gap={4} transform={{ xs: "none", lg: "translateX(-50px)" }}>
        <Box>
          <NextImage src={hypeImage} alt="Hypezone" width={60} height={60} />
        </Box>
        <Flex gap={2} alignItems="center" justifyContent={"flex-start"} w={"full"}>
          <Heading fontSize={"3xl"}>{title}</Heading>
          {subtitle && <Text>{subtitle}</Text>}
        </Flex>
      </Flex>
      <BlurComponent blur={blur}>
        <FarmAccordion
          othersArr={{
            allFarms: displayedFarms,
            userFarmInfo: userFarm2Info.data,
            userFarm2Rewards: userFarm2Rewards.data,
          }}
          isPool={isPool}
          disableIds={disableIds}
          disableComponent={disableComponent}
          maxStakingAmount={maxStakingAmount}
          fixedStakedBalance={fixedStakedBalance}
          noRestrictionsIds={noRestrictionsIds}
        />
      </BlurComponent>
    </Box>
  );
};

export default FarmList;
