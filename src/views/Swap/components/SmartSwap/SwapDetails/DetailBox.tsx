import { Center, Flex, Icon, Text } from "@chakra-ui/react";

interface IProps {
  title: string;
  icon: any;
  value: string;
}

const DetailBox = ({ icon, title, value }: IProps) => {
  return (
    <Flex w="full" gap={"15px"} alignItems="center">
      <Center bg="black.base" boxSize={"44px"} borderRadius="full">
        <Icon as={icon} />
      </Center>
      <Text flex={1} fontSize={{ xs: "sm", md: "18px" }}>
        {title}
      </Text>
      <Text fontSize={{ xs: "sm", md: "18px" }}>{value}</Text>
    </Flex>
  );
};

export default DetailBox;
