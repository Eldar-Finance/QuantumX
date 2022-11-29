import { Button, Center, Spinner, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import {
  selectDcaWhiteListedJexTokens,
  selectJexPairs,
  updateJexPair,
} from "redux/slices/dca/dca-slice";
import { fetchwhiteListedJexTokens, setJexPairs } from "redux/slices/dca/func";
import { useAppDispatch } from "utils/hooks/redux";
import ClaimSection from "views/Swap/components/SwapP2P/ClaimSection/ClaimSection";
import DCAModal from "../DCAModal/DCAModal";

import TokenReturnRow from "./TokenReturnRow";

const JexReturns = ({ egldAmount }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data: jexTokens } = useSelector(selectDcaWhiteListedJexTokens);
  const dataJex = useSelector(selectJexPairs);

  const jexPairs = dataJex.data;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchwhiteListedJexTokens());
  }, [dispatch]);

  const handleSubmit = (tokens) => {
    onClose();
    dispatch(setJexPairs(tokens));
  };

  useEffect(() => {
    dispatch(updateJexPair({ egldAmount }));
  }, [dispatch, egldAmount]);
  return (
    <Center width={"full"} flexDirection="column" mb={8}>
      <Button onClick={onOpen} borderRadius="full" colorScheme="brand" mb={4}>
        Select your tokens
      </Button>

      <DCAModal
        onClose={onClose}
        isOpen={isOpen}
        tokens={jexTokens}
        handleSubmit={handleSubmit}
      />
      {dataJex.status === "loading" && (
        <Center minH={"150px"}>
          <Spinner size={"xl"} />
        </Center>
      )}
      {jexPairs.map((jp, i) => {
        return (
          <TokenReturnRow
            key={jp.toToken.token.identifier}
            token={jp.toToken.token}
            jp={jp}
          />
        );
      })}
      <ClaimSection tokenWithDeatils={jexTokens} position="static" />
    </Center>
  );
};

export default JexReturns;
