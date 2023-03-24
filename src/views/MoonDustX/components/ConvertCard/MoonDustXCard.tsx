import { Flex } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import {
  selectAllTokens,
  selectToToken,
  selectToTokenDust,
} from "redux/slices/moondustx/moondustx-slice";
import { formatTokenI } from "utils/functions/tokens";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { toTokensToConvert } from "views/MoonDustX/utils/contants";
import ConvertButton from "./ConvertButton/ConvertButton";
import ConvertInfo from "./ConvertInfo/ConvertInfo";
import SelectTokens from "./SelectTokens/SelectTokens";

const MoonDustXCard = () => {
  const dispatch = useAppDispatch();
  const selectedToToken = useAppSelector(selectToTokenDust);
  return (
    <Flex
      flexDir={"column"}
      bg="secondary"
      py={10}
      px={{ xs: 3, md: 7 }}
      borderRadius={{ xs: "xl", md: "4xl" }}
    >
      <Flex w="full" justifyContent={"flex-end"} mb={4} gap={4}>
        {toTokensToConvert.map((tokenI) => {
          return (
            <ActionButton
              key={tokenI}
              variant={selectedToToken === tokenI ? "solid" : "outline"}
              onClick={() => dispatch(selectToToken(tokenI))}
            >
              {formatTokenI(tokenI)}
            </ActionButton>
          );
        })}
      </Flex>
      <SelectTokens />
      <Flex w="full" mt={4}>
        <ActionButton onClick={() => dispatch(selectAllTokens())}>
          Select All
        </ActionButton>
      </Flex>
      <ConvertInfo />
      <ConvertButton />
    </Flex>
  );
};

export default MoonDustXCard;
