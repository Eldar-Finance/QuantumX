import { scCall } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";

const WithdrawSproteo = () => {
  const handleClick = () => {
    scCall(proteoEliteWsp, "withdrawSproteoFromElite", [], 50000000);
  };
  return (
    <ActionButton onClick={handleClick} px={8} py={5} my={4}>
      Withdraw Sproteo From Elite
    </ActionButton>
  );
};

export default WithdrawSproteo;
