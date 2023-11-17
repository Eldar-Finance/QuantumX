import { InfoIcon } from "@chakra-ui/icons";
import { Box, Button, Center, HStack, Heading, Text } from "@chakra-ui/react";
import { BigUIntValue } from "@multiversx/sdk-core/out";
import { toknesID } from "api/net.config";
import { MultipleHarvestCalls, scCall } from "api/sc/calls";
import { sendMultipleTransactions } from "api/sc/sc";
import BigNumber from "bignumber.js";
import { min } from "lodash";
import { useState } from "react";
import { unparseMultipleFarms } from "utils/functions/farms";
import { formatBalance, formatBalanceDolar, formatNumber, formatPrecision } from "utils/functions/formatBalance";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import HarvestAllInfoModal from "views/Admin/Views/Farms/HarvestAllInfoModal";

interface IProps {
  title?: string;
  harvestableFarms?: any;
  type?: string;
  // subtitle: string;
  // amount: number;
}

const HarvestAll = ({
  title = "Est. Harvestable Rewards",
  harvestableFarms,
  type = "farms",
}: IProps) => {

  harvestableFarms = harvestableFarms.filter((farm) => farm.farmId !== 8);

  const minDollarvalue = 1;
  const feeToken = toknesID.rare || "";
  const feeTokenName = feeToken.split('-')[0];
  const feeAmount = 4.2069; 
  const { accountToken } = useGetAccountToken(feeToken);
  console.log("⚠️ ~ file: HarvestAll.tsx:37 ~ accountToken::::", accountToken)
  const userHasFee = formatBalance(
    {balance: accountToken?.balance, decimals: accountToken?.decimals},
    true,
  ) >= feeAmount;

  const { tokens } = useGetMultipleElrondTokens(
    harvestableFarms.map((f) => f.rewardToken)
  );

  const estRewardsValue = harvestableFarms.reduce((acc, farm) => {
    const tokenPrice = tokens.find(
      (p) => p.identifier === farm.rewardToken
    ) || { price: 0, decimals: 18 };
    const estRewardValue = farm.harvestableAmount * tokenPrice.price / 10 ** tokenPrice.decimals;
    return acc + estRewardValue;
  }
  , 0);
  const estRewardsValueRounded = formatPrecision(estRewardsValue, 3);

  const isHarvestClickable = harvestableFarms.length > 1 && estRewardsValue > minDollarvalue && userHasFee;

  const handleClickedHarvestAll = async (harvestableFarms) => {
    const farmIds = harvestableFarms.map((farm: { farmId: any; }) => farm.farmId);

    const res = await MultipleHarvestCalls(
      "farms2",
      "harvest",
      farmIds,
      accountToken,
      feeAmount
    );
  }

  const [modalOpen, setModalOpen] = useState(false);
  const handleClickedInfoIcon = async () => {
      setModalOpen(!modalOpen);
  };

  return (
    <HStack
      textAlign={"center"} my={"10px"}
      px="5"
      py="1"
      bg="black.baseDark"
      maxW="600px"
      mx="auto"
      borderRadius={"2xl"}
      flexDir="row"
      gap={1}
      w={"full"}
    >
      {modalOpen && 
            <HarvestAllInfoModal
              onClose={() => setModalOpen(false)}
              minDollarvalue={minDollarvalue}
              feeTokenName={feeTokenName}
              feeAmount={feeAmount}
              showBBnotice={type === "pools" ? false : true}
            />
          }
      <Center
        px="5"
        py="2"
        textAlign={"center"}
        bg="black.baseDark"
        borderRadius={"xl"}
        flexDir="column"
        gap={1}
        w={"70%"}
      >
        <Heading as="h4" fontSize={"md"} color="white.400" fontWeight={"400"}>
          {title}
        </Heading>
        <HStack>
          <Text fontSize={"lg"} fontWeight="500">
            ${estRewardsValueRounded}
          </Text>
          {harvestableFarms.length > 0 && estRewardsValue > 0 && <Text fontSize={"md"} fontWeight={"300"} ml={1} mt={0.5}>
            from {harvestableFarms.length} {harvestableFarms.length > 1 ? type : type.slice(0, -1)}
          </Text>}
        </HStack>
      </Center>
      <Center
        px="2"
        py="2"
        textAlign={"center"}
        bg="black.baseDark"
        borderRadius={"xl"}
        flexDir={{sm: "column", md: "row"}}
        gap={3}
        w={"30%"}
      >
        <InfoIcon color="white" boxSize={4} onClick={handleClickedInfoIcon} />
        <Button
          isDisabled={!isHarvestClickable}
          onClick={() => handleClickedHarvestAll(harvestableFarms)}
        >
          Harvest All
        </Button>
      </Center>
    </HStack>
  );
};

export default HarvestAll;
