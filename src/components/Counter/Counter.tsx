import { Box, Flex } from "@chakra-ui/react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Counter = ({ stock, initial, count, setCountAction }) => {
  const handleAdd = () => {
    const limitCount = stock ?? 6;
    if (count < limitCount) {
      setCountAction(count + 1);
    }
  };
  const handleSub = () => {
    if (count > 0) {
      setCountAction(count - 1);
    }
  };

  return (
    <Flex
      border=" 1px solid"
      borderColor={"main"}
      borderRadius=" 30px;"
      width=" full;"
      height=" 37px;"
      alignItems="center;"
      padding=" 0 20px;"
      fontSize={"14px"}
      maxW="180px"
      mx="auto"
    >
      <Box as="span" color="white" mr={2.5}>
        Count :
      </Box>
      {count >= 2 && (
        <Box as="span" onClick={handleSub} cursor="pointer" p={1}>
          <FontAwesomeIcon icon={faMinus} />
        </Box>
      )}
      <Box as="span" flex="1" textAlign="center">
        {count}
      </Box>
      {stock > 1 ? (
        <Box as="span" onClick={handleAdd} cursor="pointer" p={1}>
          <FontAwesomeIcon icon={faPlus} />
        </Box>
      ) : null}
    </Flex>
  );
};

export default Counter;
