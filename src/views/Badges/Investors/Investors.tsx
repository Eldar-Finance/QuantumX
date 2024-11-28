import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks/transactions/useTrackTransactionStatus";
import { scCall } from "api/sc/calls";
import { sftsRewardsWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { isArray } from "lodash";
import Image from "next/image";
import { useState } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import { getReturnedDataOfscCall } from "utils/functions/helpers";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import useGetEarluSupporterInfo from "../hooks/useGetEarluSupporterInfo";
import RewardsModal from "../SftsStaking/components/RewardsModal/RewardsModal";
// import LogoImg from "components/LogoImg/LogoImg";

const InvestorsCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rewards, setRewards] = useState([]);
  const [sessionId, setSessionId] = useState<string>();

  const { rewardsInfo } = useGetEarluSupporterInfo();

  const handleClaim = async () => {
    const res = await scCall("sftsRewards", "claimInvestorRewards");
    setSessionId(res.sessionId);
  };

  const userCanClaim = rewardsInfo?.claimable.reduce(
    (acc, current) => acc || current.amount > 0,
    false
  );

  const onSuccess = async () => {
    if (
      transactionStatus.transactions &&
      isArray(transactionStatus.transactions) &&
      transactionStatus.transactions[0].hash
    ) {
      const txHash = transactionStatus.transactions[0].hash;
      const res: any = await getReturnedDataOfscCall(
        sftsRewardsWsp,
        txHash,
        "claimInvestorRewards"
      );
      if (res.returnCode.text === "ok") {
        const data = res.firstValue.backingCollection.items.map((struct) => {
          return {
            tokenI: struct.getFieldValue("field0"),
            value: struct.getFieldValue("field1").toNumber(),
          };
        });
        onOpen();
        setRewards(data);
      }
    }
  };
  
  const transactionStatus = useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: onSuccess,
  });

  return (
    <Card px={5} bg="secondary" w="full">
      <CardHeader flexDir="column">
        <Flex justifyContent="space-between" w={"full"}>
          <Box>
            <Text
              fontSize={"3xl"}
              as="h2"
              fontWeight={"extrabold"}
              // display={{ xs: "none", md: "block" }}
              color="white"
            >
              Early Supporter
            </Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody px={{ xs: "0px", md: "15px" }}>
        <Card bg="black.baseDark">
          <CardBody>
            <Flex gap={"25px"} alignItems="center" flexDir={{sm: "column", md: "row"}}>
              <HStack gap={8}>
                <Center flexDir={"column"}>
                  <Text fontSize={"12px"} color="gray.500" whiteSpace={"nowrap"}>
                    You have earned
                  </Text>
                  {rewardsInfo?.claimed && (
                    <>
                      {rewardsInfo.claimed.map((claimedReward) => {
                        return (
                          <EarlyInvestorRewards
                            amount={claimedReward.amount}
                            token={claimedReward.token}
                            key={claimedReward.token}
                          />
                        );
                      })}
                    </>
                  )}
                </Center>
                <Center flexDir={"column"}>
                  <Text fontSize={"12px"} color="gray.500" whiteSpace={"nowrap"}>
                    Available to claim
                  </Text>
                  {rewardsInfo?.claimable && (
                    <>
                      {rewardsInfo.claimable.map((claimableReward) => {
                        return (
                          <EarlyInvestorRewards
                            amount={claimableReward.amount}
                            token={claimableReward.token}
                            key={claimableReward.token}
                          />
                        );
                      })}
                    </>
                  )}
                </Center>
              </HStack>
              <Center flexDir={"column"}>
                {/* Add any additional content you want here */}
              </Center>
              <ActionButton w={"120px"} onClick={handleClaim} disabled={!userCanClaim}>
                Claim
              </ActionButton>
              <Card bg="gray.700" p={4} borderRadius="md">
                <Text fontSize={"lg"} fontWeight="bold" color="white" mb={2}>
                  Are you sure you want to proceed with burning your Early Investor status?
                </Text>
                <Text fontSize={"md"} fontWeight="bold" color="gray.300" mb={4}>
                  By clicking the &quot;Burn&quot; button, you will gain exclusive access to the Burnium Membership Page of QuantumX. This membership includes tools designed to enhance your cryptocurrency and investment journey, such as:
                </Text>
                <Text fontSize={"md"} fontWeight="bold" color="gray.300" mb={2}>
                  - Early access to a trading bot
                </Text>
                <Text fontSize={"md"} fontWeight="bold" color="gray.300" mb={2}>
                  - Trade signals
                </Text>
                <Text fontSize={"md"} fontWeight="bold" color="gray.300" mb={2}>
                  - Calculators
                </Text>
                <Text fontSize={"md"} fontWeight="bold" color="gray.300" mb={4}>
                  - And more features planned for the near future
                </Text>
                <Text fontSize={"md"} fontWeight="bold" color="gray.300" mb={4}>
                  Due to minimal or no revenue in recent months, QuantumX is striving to provide value through these tools, even as we cannot currently distribute additional rewards.
                </Text>
                <Text fontSize={"md"} fontWeight="bold" color="gray.300" mb={4}>
                  However, you also have the choice to retain your Early Investor status, keeping the benefits and rewards tied to it when our revenue improves.
                </Text>
                <Text fontSize={"md"} fontWeight="bold" color="red.400" mb={4}>
                  Important: By choosing to burn your Early Investor status, you will lose access to all associated benefits permanently.
                </Text>
                <ActionButton w={"full"} colorScheme="red" disabled>
                  {/* TODO: run the giveUpForBurnium with no input */}
                  I want Burnium Access
                </ActionButton>
              </Card>
            </Flex>
          </CardBody>
        </Card>
      </CardBody>
      <RewardsModal rewards={rewards} onClose={onClose} isOpen={isOpen} />
    </Card>
  );
};

export default InvestorsCard;

const EarlyInvestorRewards = ({ token, amount }) => {
  const { token: elrondToken } = useGetElrondToken(token);
  return (
    <Center
      flexDir={"column"}
      px={3}
      mb={1}
      alignItems={{ xs: "center", md: "flex-start" }}
    >
      <Box
        as="span"
        fontSize={"xl"}
        fontWeight="bold"
        whiteSpace={"nowrap"}
        color="white"
      >
        <Center textAlign={"center"}>
          <Text mr={2} w="full" textAlign={"center"}>
            {formatBalance({ balance: amount, decimals: elrondToken.decimals })}
          </Text>
          {elrondToken?.assets?.svgUrl && (
            <Image
              src={elrondToken.assets.svgUrl}
              alt={elrondToken.ticker}
              width={24}
              height={24}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          )}
        </Center>
      </Box>
    </Center>
  );
};
