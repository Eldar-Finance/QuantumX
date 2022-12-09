import { scCall } from "api/sc/calls";
import { fastp2pSwapWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";

const PuaseButton = () => {
  const handleClickPause = () => {
    scCall(fastp2pSwapWsp, "pause", [], 60000000);
  };
  return (
    <ActionButton onClick={handleClickPause} px={8} py={5} my={4}>
      Pause
    </ActionButton>
  );
};

export default PuaseButton;
