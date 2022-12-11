import { Box, Center, Text } from "@chakra-ui/react";
const BadgeStaticBox = ({ title, content, ...props }) => {
  return (
    <Center
      flexDir={"column"}
      px={3}
      mb={4}
      alignItems={{ xs: "center", md: "flex-start" }}
      {...props}
    >
      <Text fontSize={"12px"} color="gray.500" whiteSpace={"nowrap"}>
        {title}
      </Text>
      <Box as="span" fontSize={"xl"} fontWeight="bold" whiteSpace={"nowrap"}>
        {content}
      </Box>
    </Center>
  );
};

export default BadgeStaticBox;
