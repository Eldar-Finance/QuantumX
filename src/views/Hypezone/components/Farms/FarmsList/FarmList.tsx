import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import hypeImage from "assets/logos/hype.svg";
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
import {
  fetchGeneralInfo,
  fetchIndex,
  fetchPrice,
} from "redux/slices/proteo/funcs";
import {
  selectMexPairs,
  selectUserAddress,
} from "redux/slices/userAcount/account-slice";
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
}
const FarmList = ({
  title,
  subtitle,
  ids,
  isPool,
  disableIds,
  disableComponent,
}: IProps) => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  const farms2 = useAppSelector(selectHype);
  const hypeFarms = farms2.filter((farm) => ids.includes(farm.farm.farmId));
  const userFarm2Info = useAppSelector(selectUserFarms2Info);
  const userFarm2Rewards = useAppSelector(selectUserFarms2Rewards);
  const { data: mexPairs } = useAppSelector(selectMexPairs);
  useEffect(() => {
    if (address) {
      //farms from oteher farms (Quantumn smart constract)
      dispatch(fetchUSerFarmInfo(address));
      dispatch(fetchUSerRewardsInfo(address));
    }
  }, [address, dispatch]);
  useEffect(() => {
    dispatch(fetchMexPairs());
    dispatch(fetchPrice());
    dispatch(fetchIndex());
    dispatch(fetchGeneralInfo());
    dispatch(fetchMultiFarms2RewardsLeft());

    //elrond network
    dispatch(fetchStats());
  }, [dispatch]);
  useEffect(() => {
    if (mexPairs.length > 0) {
      dispatch(fetchAllFarms(mexPairs));
    }
  }, [dispatch, mexPairs]);
  return (
    <Box mt={20}>
      <Flex mb={6} gap={4} transform={{ xs: "none", lg: "translateX(-50px)" }}>
        <Box>
          <NextImage src={hypeImage} alt="Hypezone" width={60} height={60} />
        </Box>
        <Flex gap={2} alignItems="center">
          <Heading fontSize={"3xl"}>{title}</Heading>
          {subtitle && <Text>{subtitle}</Text>}
        </Flex>
      </Flex>
      <FarmAccordion
        othersArr={{
          allFarms: hypeFarms,
          userFarmInfo: userFarm2Info.data,
          userFarm2Rewards: userFarm2Rewards.data,
        }}
        isPool={isPool}
        disableIds={disableIds}
        disableComponent={disableComponent}
      />
    </Box>
  );
};

export default FarmList;
