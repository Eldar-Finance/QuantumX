import { scCall } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";

const PuaseButton = () => {
  const handleClickPause = () => {
    scCall("tagsWsp", "pauseSc");
  };
  return (
    <ActionButton onClick={handleClickPause} px={8} py={5} my={4}>
      Pause SC
    </ActionButton>
  );
};

export default PuaseButton;
