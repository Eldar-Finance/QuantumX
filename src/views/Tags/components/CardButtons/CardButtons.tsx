import { Center } from "@chakra-ui/react";
import ConfirmButton from "components/SecondaryButtons/ConfirmButton";

interface ICardButtonsProps {
  isInvalid?: boolean;
  cost: string;
}

const CardButtons = ({ isInvalid, cost }: ICardButtonsProps) => {
  return (
    <Center w="full" gap={6}>
      <ConfirmButton type="submit" disabled={isInvalid} maxW={"200px"}>
        Confirm {cost}
      </ConfirmButton>
    </Center>
  );
};

export default CardButtons;
