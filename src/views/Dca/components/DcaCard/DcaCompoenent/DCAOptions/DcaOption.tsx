import { Box, Flex, Radio } from "@chakra-ui/react";

const DcaOption = ({ text, ...props }) => {
  return (
    <Flex borderRadius={"lg"} bg="black.baseDark" p="17px 20px">
      <Radio size="sm" mb={1} mr={3} {...props}>
        <Box as="span" whiteSpace={"nowrap"}>
          {text}
        </Box>
      </Radio>
    </Flex>
  );
};

export default DcaOption;
