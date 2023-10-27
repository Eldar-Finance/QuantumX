import { scCall } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";

const ResumeButton = () => {
  const handleClickPause = () => {
    scCall("hootWsp", "resumeSc");
  };
  return (
    <ActionButton onClick={handleClickPause} px={8} py={5} my={4}>
      Resume SC
    </ActionButton>
  );
};

export default ResumeButton;
