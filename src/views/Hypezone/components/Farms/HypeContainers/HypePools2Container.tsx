import { Box, Center, Heading, Link } from "@chakra-ui/react";
import { useContext } from "react";
import { hypePools2Ids } from "views/Hypezone/utils/constants";
import { useSrbStaker } from "views/Hypezone/utils/hooks";
import { FarmItemContext } from "../FarmItem/FarmItem";
import FarmList from "../FarmsList/FarmList";

interface IProps {
  ids: number[];
}

const HypePools2Container = ({ ids }: IProps) => {
  const { userSrbNfts } = useSrbStaker();
  const idsToDisable = ids.filter((id, i) => {
    if (!userSrbNfts) return true;
    if (i === 0) {
      //in id 16 using this api we must check if connected address has 1-5 in totalnfts from the api
      return !(
        Number(userSrbNfts.totalnft) >= 1 && Number(userSrbNfts.totalnft) <= 5
      );
    } else if (i === 1) {
      //in id 17 using this api we must check if connected address has 6-9 in totalnfts from the api
      return !(
        Number(userSrbNfts.totalnft) >= 6 && Number(userSrbNfts.totalnft) <= 9
      );
    } else if (i === 2) {
      //in id 18 using this api we must check if connected address has 10+ in totalnfts from the api
      return !(Number(userSrbNfts.totalnft) >= 10);
    }

    return true;
  });
  console.log("idsToDisable", idsToDisable);

  return (
    <FarmList
      title="Pools"
      subtitle="[Stake $RARE Earn $HYPE]"
      ids={ids}
      isPool
      disableIds={idsToDisable}
      disableComponent={<DisableComponent />}
    />
  );
};

export default HypePools2Container;

const DisableComponent = () => {
  const farmItemInfo = useContext(FarmItemContext);
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
