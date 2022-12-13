import { Box, Center, Input, Text } from "@chakra-ui/react";
import { contractAddr, toknesID } from "api/net.config";
import { ESDTTransfer } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";
import { useState } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import useGetUserTokens from "utils/hooks/useGetUserTokens";

const ElBadges = () => {
  const [val, setVal] = useState();
  const [alltokens, userToken] = useGetUserTokens(toknesID.mex);

  const handleSend = async () => {
    if (userToken) {
      const res = await ESDTTransfer({
        funcName: "insertRewards",

        token: userToken,
        contractAddr: contractAddr.sftsRewards,
        val: val,
      });
    }
  };
  const handleChange = (e) => {
    const val = e.target.value;
    setVal(val);
  };

  return (
    <Center flexDirection={"column"} width="fit-content">
      <Text as="h2" fontSize={"1.8rem"} mb={5}>
        Badges Rewards
      </Text>
      <Input
        mb={4}
        width={{ xs: "300px", tablet: "450px" }}
        onChange={handleChange}
        placeholder="Amount"
      />
      <Center
        background={"main"}
        padding={4}
        borderRadius={"12px"}
        mb={4}
        width={"full"}
        color="black"
      >
        <Box>
          {userToken
            ? `${formatBalance(userToken)} MEX in this account`
            : "No mex in this account"}
        </Box>
      </Center>
      <ActionButton onClick={handleSend} px={8} py={5}>
        Send{" "}
      </ActionButton>
    </Center>
  );
};

export default ElBadges;
