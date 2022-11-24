import { Box, Flex } from "@chakra-ui/react";
import { DotsIcon } from "components/Icons/ui";

const Menu = () => {
  return (
    <Flex
      px="40px"
      py="15px"
      bg="black.baseDark"
      gap="50px"
      alignItems={"center"}
      borderRadius={"full"}
    >
      <Box>Dashboard</Box>
      <Box>Swap</Box>
      <Box>Proteo Farms</Box>
      <Box>Dollar Cost-Averaging</Box>
      <DotsIcon fontSize={"16px"} />
    </Flex>
  );
};

export default Menu;
