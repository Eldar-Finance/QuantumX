import { Flex, RadioGroup } from "@chakra-ui/react";
import DcaOption from "./DcaOption";

const DCAOptions = ({ slectedOption, handleChangeOption }) => {
  return (
    <RadioGroup defaultValue={"1"} value={slectedOption} mb={10}>
      <Flex flexWrap={"wrap"} justifyContent="center" w="full" gap="10px">
        <DcaOption
          text="QuantumX Portfolio"
          value={1}
          onChange={handleChangeOption}
        />
        <DcaOption
          text="Custom Portfolio"
          onChange={handleChangeOption}
          value={4}
        />
        <DcaOption
          text="JEX Custom Portfolio"
          value={5}
          onChange={handleChangeOption}
        />
      </Flex>
    </RadioGroup>
  );
};

export default DCAOptions;
