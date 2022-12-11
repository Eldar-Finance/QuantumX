import { Box, Center, Text } from "@chakra-ui/react";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import { useCallback, useEffect } from "react";
import {
  fetchRetrieveNrOfSftsPerStatus,
  fetchSftsRewards,
  fetcRetrieveStakingStats,
} from "redux/slices/eldarSfts/funcs";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import BadgesCard from "./BadgesCard/BadgesCard";

const BadgesView = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.userAccount.connectedAddress);

  const refetchAll = useCallback(() => {
    if (address) {
      dispatch(fetcRetrieveStakingStats(address));
      dispatch(fetchRetrieveNrOfSftsPerStatus(address));
      dispatch(fetchSftsRewards(address));
    }
  }, [address, dispatch]);

  useEffect(() => {
    refetchAll();
  }, [refetchAll]);

  return (
    <Layout>
      <Box p={"4"} minH="95vh">
        <Box width={{ xs: "100%", md: "90%" }} marginX={"auto"} height="100%">
          <Center width={"95%"} margin="auto">
            <Box width={"full"}>
              <Text
                as={"h1"}
                fontSize="4xl"
                fontWeight={"extrabold"}
                textAlign="center"
              >
                Eldar badges SFT&apos;s are live
              </Text>
              <Text
                as={"h3"}
                fontWeight="extrabold"
                fontSize="xl"
                mb={5}
                textAlign="center"
              >
                Support QuantumX and earn rewards just by holding your badges
                forever.
              </Text>
              <BadgesCard />
            </Box>
          </Center>
        </Box>
      </Box>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(BadgesView));
