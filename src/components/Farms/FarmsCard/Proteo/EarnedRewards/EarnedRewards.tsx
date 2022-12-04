import { Center, Flex, Text } from "@chakra-ui/react";
import tokenLogo from "assets/logos/sproteo.svg";
import NextImage from "components/NextImage/NextImage";
import { useEffect, useState } from "react";
import { coinInfo } from "utils/constants/farms";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppSelector } from "utils/hooks/redux";
import { IProteoFarm } from "utils/types/farms.interface";

interface IProps {
  pf: IProteoFarm;
}

const EarnedRewards = ({ pf }: IProps) => {
  const { data } = useAppSelector((state) => state.proteo.userInfoApp);
  const generalInfoAppData = useAppSelector(
    (state) => state.proteo.generalInfoApp.data
  );

  const sProteoEarned = useAppSelector((state) => state.proteo.sProteoEarned);
  const dualsEarned = useAppSelector((state) => state.proteo.dualsEarned);
  const [aproximateRewards, setAproximateRewards] = useState(0);
  const [aproximateDualsReward, setAproximateDualsReward] = useState<any>();

  useEffect(() => {
    if (
      generalInfoAppData &&
      generalInfoAppData.tokensInfo.length > 0 &&
      data.length > 0 &&
      dualsEarned
    ) {
      let aproxDualRewards = null;
      const genralInfo = generalInfoAppData.tokensInfo.find(
        (t) => t.tokenI === pf.tokenIdentifier
      );
      const userTokenInfo = data.find((t) => t.tokenI === pf.tokenIdentifier);
      const earned = dualsEarned.find((t) => t.id === pf.tokenIdentifier);
      if (userTokenInfo && genralInfo && earned) {
        const userStaked = userTokenInfo.staked;
        const eldarStaked = genralInfo.staked;
        const earnedTokens = earned.balance;
        const reward = (userStaked / eldarStaked) * earnedTokens;
        aproxDualRewards = { tokenI: earned.rewardsId, reward };
      }

      setAproximateDualsReward(aproxDualRewards);
    }
  }, [generalInfoAppData, data, dualsEarned, pf.tokenIdentifier]);
  useEffect(() => {
    if (
      generalInfoAppData &&
      generalInfoAppData.tokensInfo.length > 0 &&
      data.length > 0 &&
      sProteoEarned
    ) {
      let reward = 0;

      const genralInfo = generalInfoAppData.tokensInfo.find(
        (t) => t.tokenI === pf.tokenIdentifier
      );
      const userTokenInfo = data.find((t) => t.tokenI === pf.tokenIdentifier);
      const earned = sProteoEarned.find((t) => t.id === pf.tokenIdentifier);

      if (userTokenInfo && genralInfo && earned) {
        const myStakedUsdc = userTokenInfo.staked;
        const staked = genralInfo.staked;
        const spearned = earned.balance;
        reward = (myStakedUsdc / staked) * spearned;
      }
      setAproximateRewards(reward);
    }
  }, [generalInfoAppData, data, sProteoEarned, pf.tokenIdentifier]);
  return (
    <Flex flexDir={"column"}>
      <Text color="white.400" fontSize={"sm"}>
        EARNED REWARDS
      </Text>
      <Center mt="2" gap="3" justifyContent={"space-around"} flexDir="column">
        <Flex gap="2" alignItems={"center"}>
          <Text>{formatBalance({ balance: aproximateRewards })}</Text>{" "}
          <NextImage src={tokenLogo} alt="" width={30} />
        </Flex>
        {aproximateDualsReward &&
          aproximateDualsReward.aproximateDualsReward !== 0 && (
            <Flex gap="2" alignItems={"center"}>
              <Text>
                {formatBalance({ balance: aproximateDualsReward?.reward })}
              </Text>{" "}
              {coinInfo[formatTokenI(aproximateDualsReward?.tokenI)]?.logo}
            </Flex>
          )}
      </Center>
    </Flex>
  );
};

export default EarnedRewards;
