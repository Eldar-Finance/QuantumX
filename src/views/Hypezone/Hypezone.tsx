import { Box, Flex } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import MyContainer from "components/Container/Container";
import Title from "components/Farms/Title/Title";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import { useEffect, useState } from "react";
import { fetchAllFarms } from "redux/slices/farms2/funcs";
import { formatBalance } from "utils/functions/formatBalance";
import { useAppDispatch } from "utils/hooks/redux";
import useAuthentication from "utils/hooks/useAuthentication";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import useGetTotalValueInHype from "utils/hooks/useGetTotalValueInHype";
import HypeFarmContainer from "./components/Farms/HypeContainers/HypeFarmContainer";
import HypePools1Container from "./components/Farms/HypeContainers/HypePools1Container";
import HypePools2Container from "./components/Farms/HypeContainers/HypePools2Container";
import Faucet from "./components/Faucet/Faucet";
import UserNeedRareModal from "./components/UserNeedRareModal/UserNeedRareModal";
import { hypeFarmIds, hypePools1Ids, hypePools2Ids } from "./utils/constants";

const Hypezone = () => {
  const dispatch = useAppDispatch();
  const { accountToken, isLoading, error } = useGetAccountToken(toknesID.rare);
  const [isOpenRareModal, setIsOpenRareModal] = useState(false);
  const hypeTvl = useGetTotalValueInHype();
  const { isLoggedIn } = useAuthentication();

  useEffect(() => {
    dispatch(fetchAllFarms());
  }, [dispatch]);
  useEffect(() => {
    if (accountToken?.name || error) {
      const userRareAmount = formatBalance(accountToken, true);
      if (userRareAmount <= 0.5) {
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

  const onClose = () => {};
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
              <Title
                title="Hypezone"
                subtitle="High Yield farming & pools for SRB $HYPE token"
                amount={hypeTvl}
                tvlText="Total value Locked on Hypezone"
              />
            </Box>
            <Flex
              w="full"
              maxW={{ xs: "full", md: "350px" }}
              justifyContent={"flex-end"}
            >
              <Faucet />
            </Flex>
          </Flex>
          <HypeFarmContainer ids={hypeFarmIds} />
          <HypePools1Container ids={hypePools1Ids} />
          <HypePools2Container ids={hypePools2Ids} />
        </Flex>
        <UserNeedRareModal isOpen={isOpenRareModal} onClose={onClose} />
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Hypezone));
