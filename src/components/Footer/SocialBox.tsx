import { Center, Text } from "@chakra-ui/react";
import { BookIcon } from "components/Icons/ui";

const SocialBox = () => {
  return (
    <Center>
      <Center boxSize={"35px"} bg="black.dark" borderRadius={"md"}>
        <BookIcon />
      </Center>
      <Text ml="15px">Twitter</Text>
    </Center>
  );
};

export default SocialBox;
