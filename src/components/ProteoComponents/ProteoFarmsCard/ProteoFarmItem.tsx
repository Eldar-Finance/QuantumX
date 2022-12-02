import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Center,
  Flex,
  Grid,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { contractAddr } from "api/net.config";
import axiosEldar2 from "api/rest/axiosEldar2";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  addDualEarned,
  addsProteoEarned,
  addTvlInEldarFarm,
} from "redux/slices/proteo/proteo";
import { fetchProteoFarms } from "redux/slices/userAcount/funcs";
import {
  formatBalance,
  formatBalanceDolar,
} from "utils/functions/formatBalance";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import useGetTokenPrice from "utils/hooks/useGetTokenPrice";
import { IProteoFarm } from "utils/types/proteo.interface";
import EarnedRewards from "./EarnedRewards/EarnedRewards";
import EarnTokens from "./EarnTokens/EarnTokens";
import Avilable from "./Withdraw/Avilable";

interface IProps {
  pf: IProteoFarm;
}

const ProteoFarmItem = ({ pf }: IProps) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.proteo.generalInfoApp);
  const generalInfoAppData = data;
  const userInfoAppData = useAppSelector(
    (state) => state.proteo.userInfoApp.data
  );
  const [tokenInfo, setTokenInfo] = useState<any>();
  const [tokenInfo2, setTokenInfo2] = useState<any>();

  const render = useRef(0);

  const {
    Icon,
    stakedCoin,
    decimals,
    wsp,
    hc,
    token,
    customPrice,
    aprEndpoint,
    noRewards,
    tokenRewards,
    fixedRewards,
    endpointDefinition,
  } = pf;

  const openStake = useDisclosure();
  const openWithdraw = useDisclosure();

  const [Staked, setStaked] = useState(0);
  const [sProteoEarned, setSProteoEarned] = useState(0);
  const [lastHarvestEpoch, setLastHarvestEpoch] = useState(0);
  const [dualEraned, setDualEraned] = useState(0);

  const [selectedTokenPrice] = useGetTokenPrice(token);
  const [rewardsTokenPrice] = useGetTokenPrice(tokenRewards?.name);
  const tokenPrice = customPrice || selectedTokenPrice;

  const [apr, setApr] = useState({ apr: 0, epoch: 0 });

  const handleOpenStake = () => {
    openWithdraw.onClose();
    openStake.onOpen();
  };
  const handleOpenWithdraw = () => {
    openStake.onClose();
    openWithdraw.onOpen();
  };

  useEffect(() => {
    if (generalInfoAppData && userInfoAppData.length > 0) {
      const info = generalInfoAppData.tokensInfo.find(
        (ti) => ti.tokenI.split("-")[0] === stakedCoin
      );
      const info2 = userInfoAppData.find(
        (ti) => ti.tokenI.split("-")[0] === stakedCoin
      );

      setTokenInfo(info);
      setTokenInfo2(info2);
    }
  }, [stakedCoin, generalInfoAppData, userInfoAppData]);

  useEffect(() => {
    if (wsp && tokenInfo) {
      fetchProteoFarms(
        { wsp, endpointDefinition },
        contractAddr.proteoElite,
        Boolean(tokenRewards)
      ).then((res: any) => {
        setStaked(res.depositedTokens);
        setSProteoEarned(res.pendingRewards);

        if (tokenRewards) {
          setLastHarvestEpoch(res.lastHarvestEpoch);
          setDualEraned(res.pendingRewardsDual);

          dispatch(
            addDualEarned({
              balance: res.pendingRewardsDual,
              id: tokenInfo.tokenI,
              rewardsId: tokenRewards.tokenI,
            })
          );
        } else {
          setLastHarvestEpoch(res.pendingRewardsDual);
        }
        dispatch(
          addsProteoEarned({
            balance: res.pendingRewards,
            id: tokenInfo.tokenI,
          })
        );
      });
    }
  }, [dispatch, tokenInfo, wsp, endpointDefinition, tokenRewards]);

  useEffect(() => {
    if (tokenInfo && tokenInfo.staked !== 0) {
      render.current++;
      if (render.current !== 0) {
        dispatch(
          addTvlInEldarFarm({
            balance: formatBalanceDolar(
              { balance: tokenInfo?.staked, decimals: decimals },
              tokenPrice
            ),
            id: stakedCoin,
          })
        );
      }
    }
  }, [decimals, dispatch, stakedCoin, tokenInfo, tokenPrice]);

  useEffect(() => {
    axiosEldar2
      .get(aprEndpoint)
      .then((res) => {
        if (res.data) {
          setApr(res.data[res.data.length - 1]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [aprEndpoint]);

  const stats = useAppSelector((state) => state.elrond.stats);
  const currentEpoch = stats.data.epoch;

  const autoHarversIn =
    Number(lastHarvestEpoch) + Number(hc) - Number(currentEpoch);
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
        >
          <Box flex="1" textAlign="left" w="full">
            <Flex
              w="full"
              alignItems={"center"}
              justifyContent="space-between"
              pr="8"
            >
              <Flex gap="4" alignItems={"center"}>
                {Icon}
                <Text fontWeight={"600"}>{pf.stakedCoin}</Text>
              </Flex>
              <Flex flexDir={"column"} textAlign="center">
                <Text color="white.400">Staked Balance</Text>
                <Text>
                  {formatBalance({
                    balance: tokenInfo2?.staked,
                    decimals: decimals,
                  })}{" "}
                  LP ($
                  {formatBalanceDolar(
                    { balance: tokenInfo2?.staked, decimals: decimals },
                    tokenPrice,
                    true
                  )}
                  )
                </Text>
              </Flex>
              <Flex flexDir={"column"} textAlign="center">
                <Text color="white.400">Apr</Text>
                <Text>{new BigNumber(apr.apr).toFixed(2, 2)}%</Text>
              </Flex>
              <Flex flexDir={"column"} textAlign="center">
                <Text color="white.400">Total Value Locked</Text>
                <Text>
                  $
                  {formatBalanceDolar(
                    { balance: tokenInfo?.staked, decimals: decimals },
                    tokenPrice,
                    true
                  )}
                </Text>
              </Flex>
              <EarnTokens pf={pf} />
            </Flex>
          </Box>
          <AccordionIcon color="main" />
        </AccordionButton>
      </Box>
      <AccordionPanel pb={4} w="full" bg="black.base">
        <Flex w="full" gap={"4"}>
          <Center flexDir={"column"} fontSize="14px" color="main">
            <Flex flexDir={"column"} h="fit-content">
              <Link>
                Get Proteo-EGLD LP <ExternalLinkIcon />
              </Link>
              <Link>
                View Contract <ExternalLinkIcon />
              </Link>
              <Link>
                See Pair Info <ExternalLinkIcon />
              </Link>
            </Flex>
          </Center>
          <Grid flex="1" templateColumns={"1fr 1fr"} gap="4">
            <PanelBox>
              <Flex justifyContent={"center"} textAlign={"center"} gap={5}>
                <EarnedRewards pf={pf} />
                <Flex flexDir={"column"}>
                  <Text color="white.400" fontSize={"sm"}>
                    AUTO HARVEST IN
                  </Text>
                  <Center mt="2" gap="3" justifyContent={"space-around"}>
                    <Flex gap="2" alignItems={"center"}>
                      <Text>
                        {typeof autoHarversIn === "number" ? autoHarversIn : 0}{" "}
                        Days
                      </Text>{" "}
                    </Flex>
                  </Center>
                </Flex>
              </Flex>
              <Center>
                {pf.withHarvest && <ActionButton mt={5}>HARVEST</ActionButton>}
              </Center>
            </PanelBox>
            <PanelBox>
              <Avilable pf={pf} />
            </PanelBox>
            <PanelBox gridColumn={"1 / 3"}>
              <Text color="white.400">STAKE PROTEO-EGLD LP</Text>

              <Flex mt="2" gap="3">
                <ActionButton variant={"outline"} w="full" maxW={"500px"}>
                  STAKE LP
                </ActionButton>
                <Center flex="1">
                  <ActionButton>UNSTAKE</ActionButton>
                </Center>
              </Flex>
            </PanelBox>
          </Grid>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default ProteoFarmItem;

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
