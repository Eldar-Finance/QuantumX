import { Box, Center, Flex, Input, Text } from "@chakra-ui/react";
import { contractAddr } from "api/net.config";
import { ESDTTransfer } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";
import TokenList from "components/TokenList/TokenList";
import Image from "next/image";
import { useState } from "react";
import { exportToExcel } from "utils/functions/array";
import useGetUserTokens from "utils/hooks/useGetUserTokens";
import { IElrondToken } from "utils/types/elrond.interface";
import useGetInvestors from "../hooks/useGetInvestors";
import useGetStakers from "../hooks/useGetStakers";

const ElBadges = () => {
  const [val, setVal] = useState();
  const [alltokens] = useGetUserTokens();
  const [userToken, setUserToken] = useState<IElrondToken>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { stakers } = useGetStakers();
  const { investors } = useGetInvestors();
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

  const handleSelectToken = (t: IElrondToken) => {
    setUserToken(t);
    setIsOpen(false);
  };
  const openListOfTokens = () => {
    setIsOpen((s) => !s);
  };

  //export actions
  const exportStakers = () => {
    exportToExcel(stakers, "stakers.xlsx");
  };
  const exportInvestors = () => {
    exportToExcel(investors, "investors.xlsx");
  };

  return (
    <Center flexDirection={"column"} width="fit-content">
      <Text as="h2" fontSize={"1.8rem"} mb={5}>
        Rewards
      </Text>
      <Flex mb={10} gap={5}>
        <ActionButton onClick={exportStakers}>Get Stakers</ActionButton>
        <ActionButton onClick={exportInvestors}>Investors</ActionButton>
      </Flex>
      <Input
        mb={4}
        width={{ xs: "300px", tablet: "450px" }}
        onChange={handleChange}
        placeholder="Amount"
      />

      <Flex
        background={"main"}
        padding={4}
        borderRadius={"12px"}
        mb={4}
        width={"full"}
        color="black"
        onClick={openListOfTokens}
        cursor="pointer"
        fontWeight={"bold"}
      >
        {userToken ? (
          <Flex alignItems={"center"} gap={2}>
            <Box
              boxSize={"24px"}
              borderRadius={"full"}
              boxShadow={"rgb(255 255 255 / 8%) 0px 6px 10px"}
              position="relative"
              overflow={"hidden"}
            ></Box>
            <Image
              width={24}
              height={24}
              src={userToken.assets?.svgUrl}
              alt={userToken.assets?.description || ""}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <Box>{userToken.ticker}</Box>
          </Flex>
        ) : (
          <Box>
            <Box>Select a token</Box>
          </Box>
        )}
      </Flex>
      {isOpen && (
        <TokenList tokens={alltokens} handleClickToken={handleSelectToken} />
      )}
      <ActionButton onClick={handleSend} px={8} py={5}>
        Send{" "}
      </ActionButton>
    </Center>
  );
};

export default ElBadges;
