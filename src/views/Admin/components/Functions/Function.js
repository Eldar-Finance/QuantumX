import { Center } from "@chakra-ui/react";
import React from "react";
import SendRewards from "../../Views/SendRewards/SendRewards";
const Function = ({ userAddress }) => {
  return (
    <Center flexDirection={"column"} height={"full"}>
      <Center flexDirection={"column"}>
        <SendRewards userAddress={userAddress} />
      </Center>
    </Center>
  );
};

export default Function;
