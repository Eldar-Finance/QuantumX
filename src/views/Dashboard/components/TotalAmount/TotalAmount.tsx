import { Center, Text } from "@chakra-ui/react";
import { EyeIcon } from "components/Icons/ui";

const TotalAmount = () => {
  return (
    <Center
      position={"relative"}
      p="20px 50px 20px 30px"
      bg="black.dark"
      borderRadius="xl"
    >
      <Text fontSize={"4xl"} fontWeight="500">
        $32,532.59
      </Text>
      <Center
        position={"absolute"}
        boxSize="70px"
        bg="black.baseDark"
        borderRadius={"15px"}
        right={"-35px"}
      >
        <EyeIcon fontSize={"18px"} />
      </Center>
    </Center>
  );
};

export default TotalAmount;
