import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import Link from "next/link";
import { useContext } from "react";
import { formatBalance, setElrondBalance } from "utils/functions/formatBalance";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import { routeNames } from "utils/routes";
import { hypePools1Ids } from "views/Hypezone/utils/constants";
import { useUserHaasFee } from "views/Hypezone/utils/hooks";
import { FarmItemContext } from "../FarmItem/FarmItem";
import FarmList from "../FarmsList/FarmList";
interface IProps {
  ids: number[];
}

const HypePools1Container = ({ ids }: IProps) => {
  const { accountToken } = useGetAccountToken(toknesID.rare);
  const { hasForFee } = useUserHaasFee();
  const idsToDisable = ids.filter((id, i) => {
    if (!accountToken) return true;
    if (i === 0) {
      //in id 14 user can stake only if he is holding more than 100+ RARE in his wallet
      return !(formatBalance(accountToken, true) >= 100);
    } else if (i === 1) {
      //in id 15 user can stake only if he is holding more than 1000+ RARE in his wallet
      return !(formatBalance(accountToken, true) >= 1000);
    }
    return true;
  });

  const forceFarmAccess = Boolean(
    process.env.NEXT_PUBLIC_SIMULATE_HYPEZONE_ACCESS
  );

  return (
    <FarmList
      title="Pools"
      subtitle="[Stake $HYPE &nbsp;-&nbsp; Earn $RARE]"
      ids={ids}
      isPool
      disableIds={hasForFee ? (forceFarmAccess ? [] : idsToDisable) : ids}
      disableComponent={<DisableComponent />}
      maxStakingAmount={setElrondBalance(10000000000, 18)}
      fixedStakedBalance={setElrondBalance(2500000000, 18)}
    />
  );
};

export default HypePools1Container;

const DisableComponent = () => {
  const { hasForFee, noFeeComponent } = useUserHaasFee();

  const farmItemInfo = useContext(FarmItemContext);
  const idToDisable = farmItemInfo.farm.farm.farmId;
  let rangeToStake = "";

  if (!hasForFee) {
    return noFeeComponent;
  }

  if (hypePools1Ids[0] === idToDisable) {
    rangeToStake = "100+";
  }
  if (hypePools1Ids[1] === idToDisable) {
    rangeToStake = "1000+";
  }

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
};
