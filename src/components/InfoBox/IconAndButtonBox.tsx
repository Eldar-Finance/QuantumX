import { Box, Center, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import Card from "components/Card/Card";
import { ToolIcon } from "components/Icons/ui";

const IconAndButtonBox = () => {
  return (
    <Card as={Center} flexDir="column">
      <Box bg="black.dark" borderRadius="md" p="13px" mb={"10px"}>
        <ToolIcon fontSize={"24px"} />
      </Box>
      <Text textAlign={"center"} fontWeight="400" mb="20px" color="white.400">
        Lorem ipsum dolor sit amet consectetur. At in
      </Text>
      <ActionButton w="150px" py="12px" h="auto">
        Create
      </ActionButton>
    </Card>
  );
};

export default IconAndButtonBox;
