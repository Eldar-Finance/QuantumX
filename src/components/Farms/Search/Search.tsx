import { Search2Icon } from "@chakra-ui/icons";
import { Flex, Icon, Input } from "@chakra-ui/react";

interface IProps {
  onChange: (q: string) => void;
}

const Search = ({ onChange }: IProps) => {
  return (
    <Flex
      py={2}
      alignItems="center"
      flexDir={"row"}
      px={4}
      bg={"black.baseDark"}
      borderRadius="md"
    >
      <Icon as={Search2Icon} color="#747A84" fontSize={"18px"} />
      <Input
        ml={2}
        placeholder="Name, Token ID..."
        variant={"unstyled"}
        fontSize="sm"
        onChange={(e) => onChange(e.target.value)}
      />
    </Flex>
  );
};

export default Search;
