import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { formatNumber } from "utils/functions/formatBalance";

interface IProps {
  title: string;
  subtitle: string;
  amount: number;
  tvlText?: String;
}

const Title = ({
  title,
  subtitle,
  amount,
  tvlText = "Total value Locked in Farms",
}: IProps) => {
  return (
    <Box textAlign={"center"}>
      {" "}
      <Heading as="h1" fontSize={"3xl"} mb="1">
        {title}
      </Heading>
      <Text fontSize={"md"} color="white.400" mb="10">
        {subtitle}
      </Text>
      <Center
        px="6"
        py="3"
        textAlign={"center"}
        bg="black.baseDark"
        maxW="600px"
        mx="auto"
        borderRadius={"2xl"}
        flexDir="column"
      >
        <Heading as="h4" fontSize={"md"} color="white.400" fontWeight={"500"}>
          {tvlText}
        </Heading>
        <Text fontSize={"2xl"} fontWeight="600">
          ${formatNumber(amount)}
        </Text>
      </Center>
    </Box>
  );
};

export default Title;
