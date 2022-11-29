import { Box, Center, Flex, Input, Text } from "@chakra-ui/react";
import { EgldlogoIcon } from "components/Icons/ui";
import { formatBalance } from "utils/functions/formatBalance";
const EGLDField = ({ value, onChange, balance }) => {
  return (
    <Box width={"full"} background={"rbga(0,0,0,0.7)"} mb={8}>
      <Flex justifyContent={"space-between"} mb={"1"}>
        <Text fontWeight={"500"}>Amount</Text>
        <Text fontWeight={"500"}>
          {formatBalance({ balance: balance, decimals: 18 })} EGLD
        </Text>
      </Flex>
      <Flex
        py={"10px"}
        px={"20px"}
        justifyContent={"space-between"}
        background={"black.baseDark"}
        alignItems={"center"}
        borderRadius={"lg"}
      >
        <Center>
          <EgldlogoIcon size={"20px"} />
          <Text fontWeight={"400"} ml={"10px"}>
            EGLD
          </Text>
        </Center>
        <Input
          value={value === 0 ? "" : value}
          onChange={(e) => onChange(Number(e.target.value))}
          outline={"none"}
          border={"none"}
          textAlign={"right"}
          placeholder="0.0"
          background={"transparent"}
          type="number"
          _focus={{
            border: "none",
            outline: "none",
          }}
          _focusVisible={{
            border: "none",
            outline: "none",
          }}
          _active={{
            border: "none",
            outline: "none",
          }}
          _placeholder={{
            color: "white.400",
          }}
        />
      </Flex>
    </Box>
  );
};

export default EGLDField;
