import { ButtonProps } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
interface IProps extends ButtonProps {}
const CancelButton = ({ children, ...props }: IProps) => {
  return (
    <ActionButton
      variant={"outline"}
      w="full"
      maxW={"180px"}
      _hover={{
        bg: "red.700",
      }}
      {...props}
    >
      {children || "Cancel"}
    </ActionButton>
  );
};

export default CancelButton;
