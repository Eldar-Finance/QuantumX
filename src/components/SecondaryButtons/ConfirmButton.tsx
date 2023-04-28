import { ButtonProps } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
interface IProps extends ButtonProps {}
const ConfirmButton = ({ children, ...props }: IProps) => {
  return (
    <ActionButton
      bg="white.100"
      variant={"outline"}
      color="gray.400"
      w="full"
      maxW={"180px"}
      _hover={{
        bg: "green.800",
      }}
      {...props}
    >
      {children || "Confirm"}
    </ActionButton>
  );
};

export default ConfirmButton;
