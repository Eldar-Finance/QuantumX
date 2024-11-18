import { Box, Flex, Switch } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import MyContainer from "components/Container/Container";
// import Title from "components/Farms/Title/Title";
import HypezoneTitle from "components/Farms/Title/HypezoneTitle";
import Layout from "components/Layout/Layout";
import WrapperPages from "hoc/WrapperPages";
import withElronDapp from "hoc/withElronDapp";
import { useEffect, useState } from "react";
import { fetchAllFarms } from "redux/slices/farms2/funcs";
import { formatBalance } from "utils/functions/formatBalance";
import { useAppDispatch } from "utils/hooks/redux";
import useAuthentication from "utils/hooks/useAuthentication";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import useGetTotalValueInHype from "utils/hooks/useGetTotalValueInHype";
import HypeDualContainer from "./components/Farms/HypeContainers/HypeDualContainer";
import HypeFarmContainer from "./components/Farms/HypeContainers/HypeFarmContainer";
import HypePools1Container from "./components/Farms/HypeContainers/HypePools1Container";
import HypePools2Container from "./components/Farms/HypeContainers/HypePools2Container";
import Faucet from "./components/Faucet/Faucet";
import {
  dualPoolIds,
  hypeFarmIds,
  hypePools1Ids,
  hypePools2Ids,
  rareFee,
} from "./utils/constants";

const Hypezone = () => {
  const dispatch = useAppDispatch();
  const { accountToken, isLoading, error } = useGetAccountToken(toknesID.rare);
  const [isOpenRareModal, setIsOpenRareModal] = useState(false);
  const hypeTvl = useGetTotalValueInHype();
  const { isLoggedIn } = useAuthentication();
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  useEffect(() => {
    dispatch(fetchAllFarms());
  }, [dispatch]);
  useEffect(() => {
    if (accountToken?.name || error) {
      const userRareAmount = formatBalance(accountToken, true);
      if (userRareAmount <= rareFee) {
        if (process.env.NEXT_PUBLIC_SIMULATE_HYPEZONE_ACCESS) {
          setIsOpenRareModal(false);
        } else { 
          setIsOpenRareModal(true);
        }
      } else {
        setIsOpenRareModal(false);
      }
    }
    if (!isLoggedIn) {
      setIsOpenRareModal(true);
    }
  }, [accountToken, error, isLoading, isLoggedIn]);

  const handleToggle = () => {
    if (!isLoading) { // Only run the logic if the data fetching is completed
      setIsSwitchOn(!isSwitchOn);
    }
  };

  return (
    <Layout>
      <MyContainer pb="70px">
        <Flex
          w="full"
          justifyContent={"center"}
          flexDir="column"
          alignContent={"center"}
          maxW="1000px"
          mx="auto"
        >
          {" "}
          <Flex gap={4} flexDir={{ xs: "column", md: "row" }}>
            <Box flex={1}>
              <HypezoneTitle
                title="Hypezone"
                subtitle="High Yield farming & pools for SRB $HYPE token"
                amount={hypeTvl}
                tvlText="Total value Locked in Hypezone"
              />
            </Box>
            <Flex
              w="full"
              maxW={{ xs: "full", md: "350px" }}
              justifyContent={"center"}
            >
              <Faucet />
            </Flex>
          </Flex>
          <Flex
            transform={{ xs: "translateY(+80px)", lg: "translateY(+50px)" }}
            py={{ xs: "20px", lg: "0px" }}
          >
            { isLoggedIn && (
              <Flex alignItems="center" gap="10px">
                <Switch size="md" isChecked={isSwitchOn} colorScheme="teal" onChange={handleToggle} />
                <Box>My Pools / Farms</Box>
              </Flex>
            )}
          </Flex>
          <HypeDualContainer ids={dualPoolIds} isSwitchOn={isSwitchOn}/>
          <HypeFarmContainer ids={hypeFarmIds} isSwitchOn={isSwitchOn}/>
          <HypePools1Container ids={hypePools1Ids} isSwitchOn={isSwitchOn}/>
          <HypePools2Container ids={hypePools2Ids} isSwitchOn={isSwitchOn}/>
        </Flex>
        {/* <UserNeedRareModal isOpen={isOpenRareModal} onClose={onClose} /> */}
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Hypezone));
