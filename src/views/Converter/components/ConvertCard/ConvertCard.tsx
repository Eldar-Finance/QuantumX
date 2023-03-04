import { Flex } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { selectAllTokens } from "redux/slices/converter/converter-slice";
import { useAppDispatch } from "utils/hooks/redux";
import ConvertButton from "./ConvertButton/ConvertButton";
import ConvertInfo from "./ConvertInfo/ConvertInfo";
import SelectTokens from "./SelectTokens/SelectTokens";

const ConvertCard = () => {
  const dispatch = useAppDispatch();
  return (
    <Flex
      flexDir={"column"}
      bg="secondary"
      py={10}
      px={{ xs: 3, md: 7 }}
      borderRadius={{ xs: "xl", md: "4xl" }}
    >
      <Flex w="full" justifyContent={"flex-end"} mb={4}>
        <ActionButton onClick={() => dispatch(selectAllTokens())}>
          Select All
        </ActionButton>
      </Flex>
      <SelectTokens />
      <ConvertInfo />
      <ConvertButton />
    </Flex>
  );
};

export default ConvertCard;
