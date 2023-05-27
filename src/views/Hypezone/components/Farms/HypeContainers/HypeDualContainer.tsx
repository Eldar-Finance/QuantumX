import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import Link from "next/link";
import { useContext } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import { routeNames } from "utils/routes";
import { hypeFarmIds } from "views/Hypezone/utils/constants";
import { useSrbStaker, useUserHaasFee } from "views/Hypezone/utils/hooks";
import { FarmItemContext } from "../FarmItem/FarmItem";
import FarmList from "../FarmsList/FarmList";

interface IProps {
  ids: number[];
}

const HypeDualContainer = ({ ids }: IProps) => {
  const { isStaker: isSrbStaker } = useSrbStaker();
  const { accountToken } = useGetAccountToken(toknesID.rare);
  const { hasForFee } = useUserHaasFee();
  const idsToDisable = ids.filter((id, i) => {
    if (i === 2) {
      //in id 14 user can stake only if he is holding more than 100+ RARE in his wallet
      if (isSrbStaker) {
        return false;
      } else {
        return true;
      }
    } else if (i === 3) {
      //in id 28 user can stake only if he is holding more than 500+ RARE in his wallet
      return !(formatBalance(accountToken, true) >= 500);
    }
    return false;
  });

  const forceFarmAccess = Boolean(
    process.env.NEXT_PUBLIC_SIMULATE_HYPEZONE_ACCESS
  );

  return (
    <FarmList
      title="Pools"
      ids={ids}
      isPool
      disableIds={hasForFee ? [] : ids}
      disableComponent={<DisableComponent />}
    />
  );
};

export default HypeDualContainer;

const DisableComponent = () => {
  const farmItemInfo = useContext(FarmItemContext);
  const { hasForFee, noFeeComponent } = useUserHaasFee();
  const idToDisable = farmItemInfo.farm.farm.farmId;

  if (!hasForFee) {
    return noFeeComponent;
  }
  let rangeToStake = "";

  if (hypeFarmIds[3] === idToDisable) {
    rangeToStake = "500+";
    return (
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
  }
  if (hypeFarmIds[2] === idToDisable) {
    return (
      <Box w="full" bg="black.100">
        <Center minH={"150px"} flexDir="column">
          <Heading as="h3" textAlign={"center"} mb={2}>
            {" "}
            You must be a 🐻 Staker.
          </Heading>
        </Center>
      </Box>
    );
  }

  return null;
};
