import { Box, Center, Heading } from "@chakra-ui/react";
import { hypeFarmIds } from "views/Hypezone/utils/constants";
import { useSrbStaker } from "views/Hypezone/utils/hooks";
import FarmList from "../FarmsList/FarmList";

interface IProps {
  ids: number[];
}

const HypeFarmContainer = ({ ids }: IProps) => {
  const { isStaker: isSrbStaker } = useSrbStaker();
  const disabledIds = isSrbStaker ? [] : [hypeFarmIds[2]];

  return (
    <FarmList
      title="Farms"
      ids={ids}
      disableIds={disabledIds}
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
