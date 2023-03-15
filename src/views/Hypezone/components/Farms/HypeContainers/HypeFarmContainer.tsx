import { Box, Center, Heading } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import { formatBalance } from "utils/functions/formatBalance";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import { useSrbStaker } from "views/Hypezone/utils/hooks";
import FarmList from "../FarmsList/FarmList";

interface IProps {
  ids: number[];
}

const HypeFarmContainer = ({ ids }: IProps) => {
  const { isStaker: isSrbStaker } = useSrbStaker();
  const { accountToken } = useGetAccountToken(toknesID.rare);

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
  return (
    <FarmList
      title="Farms"
      ids={ids}
      disableIds={idsToDisable}
      disableComponent={<DisableComponent />}
    />
  );
};

export default HypeFarmContainer;

const DisableComponent = () => {
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
};
