import { Box, Center, Heading, Link, Text } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import { useContext } from "react";
import { formatBalance, setElrondBalance } from "utils/functions/formatBalance";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import { routeNames } from "utils/routes";
import { hypePools2Ids } from "views/Hypezone/utils/constants";
import { useSrbStaker, useUserHaasFee } from "views/Hypezone/utils/hooks";
import { FarmItemContext } from "../FarmItem/FarmItem";
import FarmList from "../FarmsList/FarmList";

interface IProps {
  ids: number[];
  isSwitchOn?: boolean;
}

const HypePools2Container = ({ ids, isSwitchOn }: IProps) => {
  const { userSrbNfts } = useSrbStaker();
  const { accountToken } = useGetAccountToken(toknesID.rare);
  const { hasForFee } = useUserHaasFee();

  const idsToDisable = ids.filter((id, i) => {
    if (i === 0) {
      if (!userSrbNfts) return true;
      //in id 16 using this api we must check if connected address has 1-5 in totalnfts from the api
      return !(Number(userSrbNfts.totalnft) >= 1);
    } else if (i === 1) {
      if (!userSrbNfts) return true;
      //in id 17 using this api we must check if connected address has 6-9 in totalnfts from the api
      return !(Number(userSrbNfts.totalnft) >= 6);
    } else if (i === 2) {
      if (!userSrbNfts) return true;
      //in id 18 using this api we must check if connected address has 10+ in totalnfts from the api
      return !(Number(userSrbNfts.totalnft) >= 10);
    } else if (i === 3) {
      return !(formatBalance(accountToken, true) >= 100);
    }

    return true;
  });

  const forceFarmAccess = Boolean(
    process.env.NEXT_PUBLIC_SIMULATE_HYPEZONE_ACCESS
  );

  return (
    <FarmList
      title="Pools"
      subtitle="[Stake $RARE &nbsp;-&nbsp; Earn $HYPE]"
      ids={ids}
      isPool
      disableIds={hasForFee ? (forceFarmAccess ? [] : idsToDisable) : ids}
      disableComponent={<DisableComponent />}
      maxStakingAmount={setElrondBalance(1000000, 18)}
      fixedStakedBalance={setElrondBalance(500000, 18)}
      noRestrictionsIds={[hypePools2Ids[3]]}
      switchOn={isSwitchOn}
    />
  );
};

export default HypePools2Container;

const DisableComponent = () => {
  const farmItemInfo = useContext(FarmItemContext);
  const { hasForFee, noFeeComponent } = useUserHaasFee();
  if (!hasForFee) {
    return noFeeComponent;
  }
  const idToDisable = farmItemInfo.farm.farm.farmId;
  let rangeToStake = "";
  if (hypePools2Ids[0] === idToDisable) {
    rangeToStake = "1-5 🐻";
  }
  if (hypePools2Ids[1] === idToDisable) {
    rangeToStake = "6-9 🐻";
  }
  if (hypePools2Ids[2] === idToDisable) {
    rangeToStake = "10+ 🐻";
  }

  if (hypePools2Ids[3] === idToDisable) {
    rangeToStake = "100+";
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

  return (
    <Box w="full" bg="black.100">
      <Center minH={"150px"} flexDir="column">
        <Heading as="h3" textAlign={"center"} mb={2}>
          {" "}
          You need to Stake {rangeToStake} to use this Pool
        </Heading>
        <Link
          href="https://xoxno.com/collection/SRB-61daf7"
          isExternal
          color="main"
        >
          Buy & Stake Here
        </Link>
      </Center>
    </Box>
  );
};
