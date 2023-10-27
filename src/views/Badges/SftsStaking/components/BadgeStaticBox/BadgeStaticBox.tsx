import { Box, Center, CenterProps, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
// interface IProps extends CenterProps {
//   title: string;
//   content: ReactNode;
// }

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
      <Box
        as="span"
        fontSize={"xl"}
        fontWeight="bold"
        whiteSpace={"nowrap"}
        color="white"
      >
        {content}
      </Box>
    </Center>
  );
};

export default BadgeStaticBox;
