import { Box, Center, Flex, Grid, HStack, VStack, Spinner, Text, Button, useDisclosure } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import Image from "next/image";
import { memo, useEffect, useState } from "react";
import { formatBalance, formatBalanceDolar } from "utils/functions/formatBalance";
import { useAppSelector } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import BadgeStaticBox from "../BadgeStaticBox/BadgeStaticBox";
import ClaimRewardsButton from "../ClaimRewardsButton/ClaimRewardsButton";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const RewardsTable = ({ rewards, title, showTotal = false, totalValue = 0 }) => {
  if (!rewards?.length) return null;
  
  return (
    <Box>
      <Text fontSize="md" color="gray.500" mb={4}>{title}</Text>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th color="gray.400">Token</Th>
            <Th color="gray.400">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rewards.map((reward) => (
            <TokenRow 
              key={reward.token}
              amount={reward.value}
              token={reward.tokenI}
            />
          ))}
        </Tbody>
      </Table>
      {showTotal && (
        <Text fontSize="sm" color="gray.500" mt={4}>
          Total Value: ${totalValue.toFixed(2)}
        </Text>
      )}
    </Box>
  );
};

const TokenRow = ({ token, amount }) => {
  const { token: elrondToken, isLoading } = useGetElrondToken(token);

  if (isLoading) return <Tr><Td colSpan={2}><Spinner size="sm" /></Td></Tr>;

  return (
    <Tr>
      <Td>
        <HStack>
          {elrondToken?.assets?.svgUrl && (
            <Image
              src={elrondToken.assets.svgUrl}
              alt={elrondToken.ticker}
              width={20}
              height={20}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
          <Text color="white">{elrondToken.ticker}</Text>
        </HStack>
      </Td>
      <Td color="white">
        {formatBalance({
          balance: amount,
          decimals: elrondToken.decimals,
        })}
      </Td>
    </Tr>
  );
};

const BadgesStatics = () => {
  const { InStakingPeriod } = useAppSelector(
    (state) => state.eldarSfts.eldarSftsWithStatus.data
  );
  const { totalStaked } = useAppSelector(
    (state) => state.eldarSfts.stakingNumbers.data
  );
  const stfsRewards = useAppSelector(
    (state) => state.eldarSfts.stfsRewards.data
  );

  const [claimableLkmex, setClaimableLkemx] = useState(0);
  const [claimedLkmex, setClaimedLkemx] = useState(0);
  const [totalPaidLkmex, setTotalPaidkemx] = useState(0);

  const [sftsInStaking, setSftsInStaking] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const claimableRewards = stfsRewards.claimable;
    const claimedRewards = stfsRewards.claimed;
    const totalRewardsRewards = stfsRewards.totalRewards;

    let lkmexClaimable = 0;

    const _claimableLkmexArr = claimableRewards.filter(
      (token) => token.tokenI === toknesID.mex
    );

    _claimableLkmexArr.forEach((lkmex) => {
      lkmexClaimable += lkmex.value;
    });

    const _claimedLkmex = claimedRewards.find((t) => t.tokenI === toknesID.mex);
    const _totalPaidLkmex = totalRewardsRewards.find(
      (t) => t.tokenI === toknesID.mex
    );

    if (lkmexClaimable) {
      setClaimableLkemx(lkmexClaimable);
    }
    if (_claimedLkmex) {
      setClaimedLkemx(_claimedLkmex.value);
    }
    if (_totalPaidLkmex) {
      setTotalPaidkemx(_totalPaidLkmex.value);
    }
  }, [stfsRewards]);

  useEffect(() => {
    let _sftsInStaking = 0;
    InStakingPeriod.forEach((sft) => {
      _sftsInStaking += sft.amount;
    });
    setSftsInStaking(_sftsInStaking);
  }, [InStakingPeriod]);

  const [totalDollarValue, updateTotalDollarValue] = useState(0);
  // get a list of the tokens
  const tokens = stfsRewards?.totalRewards?.map((r) => r.tokenI);
  // get the price of tokens
  const elrondTokens = useGetMultipleElrondTokens(tokens);
  // update the total dollar value when the price of tokens changes
  useEffect(() => {
    if (stfsRewards?.totalRewards) {
      let _totalDollarValue = 0;
      stfsRewards.totalRewards.forEach((r) => {
        const elrondToken = elrondTokens.tokens.find((t) => t.identifier === r.tokenI);
        if (elrondToken) {
          // r.amount * elrondToken.price
          _totalDollarValue += formatBalanceDolar(
            {
              balance: r.value,
              decimals: elrondToken.decimals,
            },
            elrondToken.price
          );
        }
      });
      updateTotalDollarValue(_totalDollarValue);
    }
  }, [elrondTokens, stfsRewards.totalRewards]);

  // Calculate claimable amount display
  const claimableDisplay = stfsRewards?.claimable?.length 
    ? `${stfsRewards.claimable.length} token${stfsRewards.claimable.length > 1 ? 's' : ''} to claim`
    : 'Nothing to claim';

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      w={"full"}
      gap={{sm: 10}}
      flexDir={{ xs: "column", lg: "row" }}
    >
      {/* Left side */}
      <Flex alignItems={"flex-start"}>
        <Flex flexDir={{ xs: "column", md: "row" }} alignItems={{ xs: "center", md: "flex-start" }}>
          <BadgeStaticBox
            alignItems={"flex-start"}
            justifyContent="flex-start"
            title={" My Staked Badges"}
            content={`${sftsInStaking}  Badges`}
          />
          
          <HStack gap={8}>
            <VStack spacing={2}>
              <ClaimRewardsButton w={"120px"}/>
              <Text fontSize="xs" color="gray.400">
                {claimableDisplay}
              </Text>
            </VStack>
            
            <Button 
              onClick={onOpen}
              colorScheme="blue"
              size="sm"
              variant="outline"
              mt="-20px"
            >
              View Details
            </Button>
          </HStack>
        </Flex>
      </Flex>

      {/* Right side */}
      <Center flexDir={"column"} justifyContent="flex-start">
        <Text fontSize={"12px"} color="gray.500" whiteSpace={"nowrap"}>
          Total Paid Out
        </Text>
        <Text color="white" fontSize="xl" fontWeight="bold">
          ${totalDollarValue.toFixed(2)}
        </Text>
      </Center>

      {/* Updated Modal with Tables */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent bg="secondary">
          <ModalHeader color="white">Rewards Details</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            <Flex 
              direction={{ base: "column", md: "row" }} 
              gap={8} 
              justify="space-between"
            >
              <RewardsTable 
                rewards={stfsRewards?.claimable} 
                title="Available to Claim"
              />
              <RewardsTable 
                rewards={stfsRewards?.claimed} 
                title="Already Claimed"
              />
              <RewardsTable 
                rewards={stfsRewards?.totalRewards} 
                title="Total Paid Out"
                showTotal={true}
                totalValue={totalDollarValue}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default memo(BadgesStatics);
