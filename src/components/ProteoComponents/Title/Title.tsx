import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { formatNumber } from "utils/functions/formatBalance";
import { useAppSelector } from "utils/hooks/redux";

interface IProps {
  title: string;
}

const Title = ({ title }: IProps) => {
  const totalTvlInEldarFarms = useAppSelector(
    (state) => state.proteo.totalTvlInEldarFarms
  );
  const [totalVl, setTotalVl] = useState(0);

  useEffect(() => {
    let _totalVl = 0;
    if (totalTvlInEldarFarms.length > 0) {
      totalTvlInEldarFarms.forEach((vl) => {
        _totalVl += vl.balance;
      });
      setTotalVl(_totalVl);
    }
  }, [totalTvlInEldarFarms]);

  return (
    <Box textAlign={"center"}>
      {" "}
      <Heading as="h1" fontSize={"3xl"} mb="1">
        {title}
      </Heading>
      <Text fontSize={"md"} color="white.400" mb="10">
        Stake Liquidity Pool (LP) tokens
      </Text>
      <Center
        px="6"
        py="3"
        textAlign={"center"}
        bg="black.baseDark"
        maxW="600px"
        mx="auto"
        borderRadius={"xl"}
        flexDir="column"
      >
        <Heading as="h4" fontSize={"md"} color="white.400" fontWeight={"400"}>
          Total value Locked on Farms
        </Heading>
        <Text fontSize={"2xl"} fontWeight="600">
          ${formatNumber(totalVl)}
        </Text>
      </Center>
    </Box>
  );
};

export default Title;
