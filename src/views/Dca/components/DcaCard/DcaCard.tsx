import { Box, Center, Flex, Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { selectDcaWhiteListedTokens } from "redux/slices/dca/dca-slice";

import {
  fetchHightRiskTokens,
  fetchLkmexAveragingTokens,
  fetchMinimalTokens,
  fetchTotalVolumen,
  fetchwhiteListedTokens,
} from "redux/slices/dca/func";
import { fetchEconomics } from "redux/slices/elrond/elrond-slice";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { fetchEgld, fetchMexPairs } from "redux/slices/userAcount/funcs";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import DcaCompoenent from "./DcaCompoenent/DcaCompoenent";
import TotalLCACard from "./TotalLCACard/TotalLCACard";

const DcaCard = () => {
  const address = useAppSelector(selectUserAddress);
  const dispatch = useAppDispatch();
  const whiteListedTokens: any = useAppSelector(selectDcaWhiteListedTokens);
  useEffect(() => {
    if (address) {
      dispatch(fetchEgld(address));

      dispatch(fetchMexPairs());
      dispatch(fetchEconomics());
      dispatch(fetchTotalVolumen());
      dispatch(fetchwhiteListedTokens());
    }
  }, [address, dispatch]);

  useEffect(() => {
    if (whiteListedTokens.data.length > 0) {
      dispatch(fetchLkmexAveragingTokens(whiteListedTokens.data));
      dispatch(fetchMinimalTokens(whiteListedTokens.data));
      dispatch(fetchHightRiskTokens(whiteListedTokens.data));
    }
  }, [dispatch, whiteListedTokens.data]);

  return (
    <Box mb={10} minW={'90%'}>
      <Grid
        gridTemplateColumns={{ xs: "1fr" }}
        position={"relative"}
        gap={7}
        mb={10}
      >
        <Center w="full" flexDir="column">
          <Flex flexDir="column" gap={8} w="full" maxW={"728px"}>
            <DcaCompoenent />
            <TotalLCACard />
          </Flex>
        </Center>
      </Grid>
    </Box>
  );
};

export default DcaCard;
