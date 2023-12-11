import { CheckIcon, CopyIcon, Search2Icon, ArrowUpIcon } from "@chakra-ui/icons";
import { Box, HStack, Icon, Link, Text, useClipboard, useDisclosure } from "@chakra-ui/react";
import { network } from "api/net.config";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { formatAddress } from "utils/functions/formatAddress";
import { useAppSelector } from "utils/hooks/redux";
import SendTokens from "../SendTokens/SendTokens";
import { useState } from "react";
import TransactionModal from "../SendTokens/TransactionModal/TransactionModal";

const AddressSection3 = () => {
  const address = useAppSelector(selectUserAddress);
  const { hasCopied, onCopy } = useClipboard(address);

  // const [showSendModal, setShowSendModal] = useState(false);
  // const onSendClick = () => {
  //   setShowSendModal(true);
  // };

  const { onClose, onOpen, isOpen } = useDisclosure();

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
    >

      <HStack onClick={onOpen} cursor={"pointer"} gap={1}>
        <Text>
          Send
        </Text>
        <Icon as={ArrowUpIcon} fontSize={"18px"} mb={0.5}/>
      </HStack>

      {isOpen && <TransactionModal isOpen={true} onClose={onClose} />}
    
      <HStack  onClick={onCopy} cursor={"pointer"} gap={1}>
        <Text>
          Copy
        </Text>
        {hasCopied ? (
          <Icon as={CheckIcon} fontSize={"18px"} mb={0.5}/>
        ) : (
          <Icon as={CopyIcon} fontSize={"16px"} mb={0.5}/>
        )}
      </HStack>

      <Link
        isExternal
        href={`${network.explorerAddress}/accounts/${address}`}
        aria-label="find in explorer"
        gap={1}
        whiteSpace={"nowrap"}
      >
        <HStack>
        <Text>
          Explorer
        </Text>
        <Search2Icon fontSize={"15px"} mb={0.5}/>
        </HStack>
      </Link>

    </Box>
  );
};

export default AddressSection3;
