import { scCall } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";

const ForceWithdraw = () => {
  const handleClick = () => {
    scCall(proteoEliteWsp, "forceWithdrawAllStaked", [], 50000000);
  };
  return (
    <ActionButton onClick={handleClick} px={8} py={5} my={4}>
      Force Withdraw
    </ActionButton>
  );
};

export default ForceWithdraw;
