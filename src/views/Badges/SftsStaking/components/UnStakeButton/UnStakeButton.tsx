import { Center, useDisclosure } from "@chakra-ui/react";
import { scCall } from "api/sc/calls";
import { sftsRewardsWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { memo } from "react";
import { useAppSelector } from "utils/hooks/redux";
import UnStakeModal from "./UnStakeModal";
const UnStakeButton = ({ ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { InStakingPeriod } = useAppSelector(
    (state) => state.eldarSfts.eldarSftsWithStatus.data
  );

  const handleSubmit = () => {
    onClose();
    scCall(sftsRewardsWsp, "unstakeSft", [], 40000000);
  };

  return (
    <Center>
      <ActionButton
        onClick={onOpen}
        // @ts-ignore
        disabled={InStakingPeriod === 0}
        {...props}
      >
        Unstake
      </ActionButton>

      <UnStakeModal onClose={onClose} isOpen={isOpen} onClick={handleSubmit} />
    </Center>
  );
};

export default memo(UnStakeButton);
