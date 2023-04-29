import { Center } from "@chakra-ui/react";
import CancelButton from "components/SecondaryButtons/CancelButton";
import ConfirmButton from "components/SecondaryButtons/ConfirmButton";

interface ICardButtonsProps {
  isInvalid?: boolean;
}

const CardButtons = ({ isInvalid }: ICardButtonsProps) => {
  return (
    <Center w="full" gap={6}>
      <CancelButton />
      <ConfirmButton type="submit" disabled={isInvalid} />
    </Center>
  );
};

export default CardButtons;
