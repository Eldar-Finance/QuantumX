import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import { scCall } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";
import Image from "next/image";
import { formatBalance } from "utils/functions/formatBalance";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import useGetEarluSupporterInfo from "../hooks/useGetEarluSupporterInfo";
// import LogoImg from "components/LogoImg/LogoImg";

const InvestorsCard = () => {
  const { rewardsInfo } = useGetEarluSupporterInfo();

  const handleClaim = () => {
    scCall("sftsRewards", "claimInvestorRewards");
  };
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
              <ActionButton onClick={handleClaim}>Claim</ActionButton>
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
                  Avilabel for claim
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
            />
          )}
        </Center>
      </Box>
    </Center>
  );
};
