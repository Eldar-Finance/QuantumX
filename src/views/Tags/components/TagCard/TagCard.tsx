import { Flex, FlexProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface IProps extends FlexProps {}

const TagCard = ({ children, ...props }: PropsWithChildren<IProps>) => {
  return (
    <Flex
      flexDir={"column"}
      bg="black.light"
      rounded={"md"}
      py={8}
      px={6}
      w="full"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default TagCard;
