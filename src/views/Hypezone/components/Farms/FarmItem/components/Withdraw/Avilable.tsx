import { Box, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { BigUIntValue } from "@elrondnetwork/erdjs/out";
import { toknesID } from "api/net.config";
import { scCallOnlyTx } from "api/sc/calls";
import { sendMultipleTransactions } from "api/sc/sc";
import bearImage from "assets/logos/bear.png";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import NextImage from "components/NextImage/NextImage";
import { formatBalance } from "utils/functions/formatBalance";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import { IScFarmItem, IScUserFarmRewards } from "utils/types/sc.interface";
import { getTxForRareFee } from "views/Hypezone/utils/functions";
import useIsBearFarm from "views/Pools/hooks/useIsBearFarm";
import useCanUsePool7 from "views/Pools/hooks/useIsSrbStaker";

interface IProps {
  farm: IScFarmItem;
  userFarmRewards: IScUserFarmRewards[];
  disable?: boolean;
}

const Avilable = ({ farm, userFarmRewards, disable }: IProps) => {
  const { tokens: rewardsTokens } = useGetMultipleElrondTokens(
    userFarmRewards.map((r) => r.rewardToken)
  );
  const { token: feeElrondToken } = useGetElrondToken(toknesID.rare);
  const { isSrbStaker } = useCanUsePool7();
  const handleHarvest = async () => {
    if (feeElrondToken) {
      const t1 = await getTxForRareFee();
      const t2 = await scCallOnlyTx(
        "farms2",
        "harvest",
        [new BigUIntValue(new BigNumber(farm.farm.farmId))],
        110000000
      );

      sendMultipleTransactions({ txs: [t1, t2] });
    }
  };
  const isAFarmBoost = useIsBearFarm(farm);

  let manualImage = null;

  if (farm.farm.rewardToken === toknesID.bear) {
    manualImage = bearImage;
  }

  return (
    <Box>
      <Flex w="full" justifyContent={"space-between"}>
        <Text color="white.400">Available to withdraw</Text>
        <VStack>
          {rewardsTokens.map((rewardsToken) => {
            const rewardInfo = userFarmRewards.find(
              (r) => r.rewardToken === rewardsToken.identifier
            );

            return (
              <Flex key={rewardsToken.identifier} alignItems={"center"} gap={2}>
                <Text>
                  {formatBalance({
                    balance: rewardInfo?.harvestableAmount || 0,
                    decimals: rewardsToken?.decimals,
                  })}
                </Text>
                {manualImage ? (
                  <NextImage alt="" src={manualImage} height={30} width={30} />
                ) : (
                  <>
                    {rewardsToken?.assets?.pngUrl && (
                      <NextImage
                        alt=""
                        src={rewardsToken.assets.pngUrl}
                        width={27}
                        height={27}
                      />
                    )}
                  </>
                )}
              </Flex>
            );
          })}
        </VStack>
      </Flex>
      <Flex flexDir={"column"}>
        <Center mt="2" flexDir={"column"}>
          <ActionButton
            onClick={handleHarvest}
            disabled={
              disable ||
              userFarmRewards.reduce(
                (acc, current) => (acc += current.harvestableAmount),
                0
              ) === 0 ||
                (!isSrbStaker && farm.farm.farmId === 7)
            }
          >
            HARVEST
          </ActionButton>
          {isAFarmBoost && isSrbStaker && (
            <Text align={"center"} fontSize="14px" mt={2}>
              🐻 You are eligible for 10% Rewards Boost
            </Text>
          )}
        </Center>
        <Flex justify={"flex-end"}></Flex>
      </Flex>
    </Box>
  );
};

export default Avilable;
