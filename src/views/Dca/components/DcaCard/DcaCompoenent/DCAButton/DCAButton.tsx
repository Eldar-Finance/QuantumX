import ActionButton from "components/ActionButton/ActionButton";

const DCAButton = ({ ...props }) => {
  return (
    <ActionButton
      height={"auto"}
      borderRadius={"12px"}
      padding={"18px"}
      width={"full"}
      fontWeight="600"
      {...props}
    >
      Swap
    </ActionButton>
  );
};

export default DCAButton;
