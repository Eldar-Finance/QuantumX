import { Box, Center } from "@chakra-ui/react";
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
import InvestorsCard from "./Investors/Investors";
import SftsStaking from "./SftsStaking/SftsStaking";

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
      <Box px={"4"} minH="95vh">
        <Box width={{ xs: "100%", md: "90%" }} marginX={"auto"} height="100%">
          <Center width={"95%"} margin="auto" flexDir={"column"} gap={"50px"}>
            <SftsStaking />
            {/* <InvestorsCard /> */}
          </Center>
        </Box>
      </Box>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(BadgesView));
