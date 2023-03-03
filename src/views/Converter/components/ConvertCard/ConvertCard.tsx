import { Flex } from "@chakra-ui/react";
import ConvertButton from "./ConvertButton/ConvertButton";
import SelectTokens from "./SelectTokens/SelectTokens";

const ConvertCard = () => {
  return (
    <Flex
      flexDir={"column"}
      bg="secondary"
      py={10}
      px={7}
      borderRadius={{ xs: "xl", md: "4xl" }}
    >
      <SelectTokens />
      {/* <ConvertInfo /> */}
      <ConvertButton />
    </Flex>
  );
};

export default ConvertCard;
