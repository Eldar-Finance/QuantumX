import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { transactionServices } from "@elrondnetwork/dapp-core";
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
  const transactionStatus = transactionServices.useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: onSuccess,
  });
  return (
    <Card px={5} bg="secondary" w="full">
      <CardHeader flexDir="column">
        <Flex justifyContent="space-between" w={"full"}>
          <Box>
            <Text
              fontSize={"4xl"}
              as="h2"
              fontWeight={"extrabold"}
              display={{ xs: "none", md: "block" }}
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
            <Flex gap={"25px"} alignItems="center">
              <ActionButton onClick={handleClaim} disabled={!userCanClaim}>
                Claim
              </ActionButton>
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
                height: "auto"
              }} />
          )}
        </Center>
      </Box>
    </Center>
  );
};
