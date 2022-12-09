import { Flex, Text } from "@chakra-ui/react";
import { formatAddress } from "utils/functions/formatAddress";

const AddressContainer = ({ userAddress }) => {
  return (
    <Flex
      justifyContent={"flex-end"}
      px="30px"
      position={"absolute"}
      top={20}
      width={"100%"}
    >
      <Text
        px={{
          sm: "0px",
          md: "46px",
        }}
      >
        Connected: {formatAddress(userAddress)}
      </Text>
    </Flex>
  );
};

export default AddressContainer;
