import { scCall } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";

const ClaimFeeButton = () => {
  const handleClickPause = () => {
    scCall("farms2", "claimFees");
  };
  return (
    <ActionButton onClick={handleClickPause} px={8} py={5} my={4}>
      Claim Fee
    </ActionButton>
  );
};

export default ClaimFeeButton;
