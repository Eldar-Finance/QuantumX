import { Box, Center, Heading, Link, Text } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import { fetchSrbNftsByUser } from "api/rest/others/EldarSolutions";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import useSwr from "swr";
import { formatBalance } from "utils/functions/formatBalance";
import { useAppSelector } from "utils/hooks/redux";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import { routeNames } from "utils/routes";
import { fetchCanUserClaim, fetchFarmunbondingPeriod, fetchUserHarvestableRewards } from "./sc";
import { IScFungibleReward, IScUserFarmRewards } from "utils/types/sc.interface";

export const useSrbStaker = () => {
  const address = useAppSelector(selectUserAddress);

  const { data, isLoading, error } = useSwr(
    "srbnftapi.php",
    fetchSrbNftsByUser
  );

  const userSrbNfts = data?.find((item) => item.address === address);

  return {
    isStaker: Boolean(userSrbNfts),
    userSrbNfts,
    isLoading,
    error,
  };
};

export const useUserCanClaim = () => {
  const address = useAppSelector(selectUserAddress);
  const { data, isLoading, error } = useSwr<boolean>(
    ["hypezoneWsp:canUserClaim", address],
    fetchCanUserClaim
  );

  return {
    canUserClaim: data || false,
    isLoading,
    error,
  };
};

export const useGetFarmUnbondingPeriod = (farmId: number) => {
  const { data, isLoading, error } = useSwr<number>(
    ["farms2:unbondingPeriod", farmId],
    fetchFarmunbondingPeriod
  );

  return {
    unbondingPeriod: data || 0,
    isLoading,
    error,
  };
};

export const useUserHaasFee = () => {
  const { accountToken } = useGetAccountToken(toknesID.rare);
  const rangeToStake = 0.5;
  const hasForFee = formatBalance(accountToken, true) >= rangeToStake;
  const noFeeComponent = (
    <Box w="full" bg="black.100">
      <Center minH={"150px"} flexDir="column">
        <Heading as="h3" textAlign={"center"} mb={2}>
          {" "}
          You need {rangeToStake} RARE to use this Pool
        </Heading>
        <Link href={routeNames.swap}>
          <Text color="main">Swap Here</Text>
        </Link>
      </Center>
    </Box>
  );
  return {
    hasForFee,
    noFeeComponent,
  };
};
// dont worry this is a comment :) main 4

export const useGetUserHarvestableRewards = (farmId: number) => {
  const address = useAppSelector(selectUserAddress);

  const { data: userHarvestableRewards, isLoading: isLoadingUserHarvestableRewards, error: errorUserHarvestableRewards } = useSwr<IScUserFarmRewards[]>(
    address ? `farms2:calcHarvestableRewards:${address}` : null,
    async () => {
      return await fetchUserHarvestableRewards(address, farmId);
    },
    {
      fallbackData: [],
    }
  );

  return {
      userHarvestableRewards,
      isLoadingUserHarvestableRewards,
      errorUserHarvestableRewards
  };
}