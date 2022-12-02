import { Flex, Text } from "@chakra-ui/react";
import tokenLogo from "assets/logos/sproteo.svg";
import NextImage from "components/NextImage/NextImage";
import { formatTokenI } from "utils/functions/tokens";
import { useAppSelector } from "utils/hooks/redux";
import { IProteoFarm } from "utils/types/proteo.interface";
import { coinInfo } from "views/ProteoFarms/constants";

interface IProps {
  pf: IProteoFarm;
}

const EarnTokens = ({ pf }: IProps) => {
  const dualsEarned = useAppSelector((state) => state.proteo.dualsEarned);

  const dualToken = dualsEarned.find((t) => t.id === pf.tokenIdentifier);
  console.log("dualToken", dualToken);

  return (
    <Flex flexDir={"column"} textAlign="center">
      <Text color="white.400" mb={2}>
        Earn
      </Text>
      <Flex gap={2}>
        <NextImage src={tokenLogo} alt="" width={30} />

        {coinInfo[formatTokenI(dualToken?.rewardsId)]?.logo}
      </Flex>
    </Flex>
  );
};

export default EarnTokens;
