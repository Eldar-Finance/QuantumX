import { Button, Center, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCustomTokens } from "redux/slices/dca/dca-slice";
import { getPercentArray } from "redux/slices/dca/func";
import { useAppSelector } from "utils/hooks/redux";
import DCAModal from "../DCAModal/DCAModal";

import RowItem from "./RowItem/RowItem";

const UserReturn = ({ egldAmount, slectedOption, dataModal, setDataModal }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();

  const whiteListedTokensData = useAppSelector(
    (state) => state.lkmexAveraging.whiteListedTokens.data
  );
  const tokensData = useAppSelector(
    (state) => state.lkmexAveraging.tokens.data
  );
  const minimalTokensData = useAppSelector(
    (state) => state.lkmexAveraging.minimalTokens.data
  );
  const hightRiskTokensData = useAppSelector(
    (state) => state.lkmexAveraging.hightRiskTokens.data
  );
  const customTokens = useAppSelector(
    (state) => state.lkmexAveraging.cutomTokens
  );

  useEffect(() => {
    let _dataModal = [];

    switch (slectedOption) {
      case 1:
        _dataModal = tokensData;
        break;
      case 2:
        _dataModal = minimalTokensData;

        break;
      case 3:
        _dataModal = hightRiskTokensData;

        break;
      case 4:
        _dataModal = customTokens;

        break;

      default:
        break;
    }

    setDataModal(_dataModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    slectedOption,
    tokensData,
    minimalTokensData,
    hightRiskTokensData,
    customTokens,
  ]);

  const handleSubmit = (tokens) => {
    onClose();
    const percetnArray = getPercentArray(tokens.length);
    const dataTokens = tokens.map((token, i) => {
      return {
        ...token,
        percent: percetnArray[i],
      };
    });
    dispatch(setCustomTokens(dataTokens));
  };
  return (
    <Center width={"full"} flexDirection="column" mb={8}>
      {slectedOption === 4 && (
        <Button onClick={onOpen} borderRadius="full" colorScheme="brand" mb={4}>
          Select your tokens
        </Button>
      )}
      <DCAModal
        onClose={onClose}
        isOpen={isOpen}
        tokens={whiteListedTokensData}
        handleSubmit={handleSubmit}
      />
      {dataModal.map((el, i) => {
        return (
          <RowItem key={el.identifier} token={el} egldAmount={egldAmount} />
        );
      })}
    </Center>
  );
};

export default UserReturn;
