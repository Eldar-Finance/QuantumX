import { Center } from "@chakra-ui/react";
import ConfirmButton from "components/SecondaryButtons/ConfirmButton";

interface ICardButtonsProps {
  isInvalid?: boolean;
}

const CardButtons = ({ isInvalid }: ICardButtonsProps) => {
  return (
    <Center w="full" gap={6}>
      <ConfirmButton type="submit" disabled={isInvalid} />
    </Center>
  );
};

export default CardButtons;
