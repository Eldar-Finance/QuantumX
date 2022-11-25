import { Center, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import Card from "components/Card/Card";
import { ReactNode } from "react";

interface IProps {
  icon: ReactNode;
  title: string;
  desc: string;
  onClick?: () => void;
}

const IconAndButtonBox = ({ desc, title, icon, onClick }: IProps) => {
  return (
    <Card as={Center} flexDir="column">
      <Center bg="black.dark" borderRadius="md" boxSize={"50px"} mb={"10px"}>
        {icon}
      </Center>
      <Text fontWeight={"500"} fontSize="20px" as="h3" mb="11px">
        {title}
      </Text>
      <Text textAlign={"center"} fontWeight="400" mb="20px" color="white.400">
        {desc}
      </Text>
      <ActionButton
        w="150px"
        py="12px"
        h="auto"
        onClick={onClick}
        fontWeight="600"
      >
        Create
      </ActionButton>
    </Card>
  );
};

export default IconAndButtonBox;
