import { Center } from "@chakra-ui/react";
import { scCall } from "api/sc/calls";
import { sftsRewardsWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { memo } from "react";
import { useAppSelector } from "utils/hooks/redux";

const UnStakeButton = ({ ...props }) => {

  const { InStakingPeriod } = useAppSelector(
    (state) => state.eldarSfts.eldarSftsWithStatus.data
  );

  const handleSubmit = () => {
    scCall(sftsRewardsWsp, "unstakeAndClaimSfts", [], 150000000);
  };

  return (
    <Center>
      <ActionButton
        onClick={handleSubmit}
        // @ts-ignore
        disabled={InStakingPeriod === 0}
        {...props}
      >
        Unstake all
      </ActionButton>

    </Center>
  );
};

export default memo(UnStakeButton);
