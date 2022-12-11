import { scCall } from "api/sc/calls";
import { fastp2pSwapWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";

const ResumeButton = () => {
  const handleClickResume = () => {
    scCall(fastp2pSwapWsp, "resume", [], 60000000);
  };
  return (
    <ActionButton onClick={handleClickResume} px={8} py={5} my={4}>
      Resume
    </ActionButton>
  );
};

export default ResumeButton;
