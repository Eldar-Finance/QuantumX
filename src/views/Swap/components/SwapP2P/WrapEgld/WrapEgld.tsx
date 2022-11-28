import { Box, Center, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core";
import { toknesID } from "api/net.config";
import ActionButton from "components/ActionButton/ActionButton";
import { EgldlogoIcon, WegldLogoIcon } from "components/Icons/ui";

import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { selectMexPairs } from "redux/slices/userAcount/account-slice";
import {
  formatBalance,
  formatBalanceDolar,
} from "utils/functions/formatBalance";
import useGetUserTokens from "utils/hooks/useGetUserTokens";
import UnWrapModal from "./UnWrapModal/UnWrapModal";
const WrapModal: any = dynamic(() => import("./WrapModal/WrapModal"));

const WrapEgld = () => {
  const acc = useGetAccountInfo();
  const [tokens, wegldToken] = useGetUserTokens(toknesID.wegld);
  const mexpairsState = useSelector(selectMexPairs);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const price = mexpairsState.data.find((e) => e.baseName === "WrappedEGLD");
  if (!acc?.account?.balance) {
    return null;
  }

  return (
    <Center w="full">
      <Flex flexDir={{ xs: "column", tablet: "row" }}>
        <Box px={6} py={3}>
          <Flex gap={2} alignItems="center" mb={2}>
            <EgldlogoIcon fontSize={"25px"} wp="7.5px" />
            <Text fontSize={"large"}>EGLD</Text>
            <ActionButton
              variant={"outline"}
              fontSize="sm"
              fontWeight={"400"}
              mr={1}
              onClick={onOpen}
            >
              Wrap
            </ActionButton>
          </Flex>
          <Flex w="full" justifyContent={"center"} gap={1} fontSize="smaller">
            <Text> {formatBalance({ balance: acc.account.balance })}</Text>
            <Text>
              = ${" "}
              {formatBalanceDolar(
                { balance: acc.account.balance },
                price?.basePrice
              )}
            </Text>
          </Flex>
        </Box>
        <Box px={6} py={3}>
          <Flex gap={2} alignItems="center" mb={2}>
            <WegldLogoIcon fontSize={"40px"} />
            <Text fontSize={"large"}>wEGLD</Text>
            <ActionButton
              variant={"outline"}
              fontSize="sm"
              fontWeight={"400"}
              mr={1}
              onClick={onOpen2}
            >
              Unwrap
            </ActionButton>
          </Flex>
          <Flex w="full" justifyContent={"center"} gap={1} fontSize="smaller">
            <Text> {formatBalance({ balance: wegldToken?.balance })}</Text>
            <Text>
              = ${" "}
              {formatBalanceDolar(
                { balance: wegldToken?.balance },
                wegldToken?.price
              )}
            </Text>
          </Flex>
        </Box>
      </Flex>
      {isOpen && <WrapModal isOpenModal={isOpen} onCloseModal={onClose} />}
      {isOpen2 && <UnWrapModal isOpenModal={isOpen2} onCloseModal={onClose2} />}
    </Center>
  );
};

export default WrapEgld;
