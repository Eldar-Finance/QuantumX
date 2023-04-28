import { Center } from "@chakra-ui/react";
import CancelButton from "components/SecondaryButtons/CancelButton";
import ConfirmButton from "components/SecondaryButtons/ConfirmButton";

const CardButtons = () => {
  return (
    <Center w="full" gap={6}>
      <CancelButton />
      <ConfirmButton type="submit" />
    </Center>
  );
};

export default CardButtons;
