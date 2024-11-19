import { CheckIcon, CopyIcon, Search2Icon, ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Center, Grid, GridItem, HStack, Icon, Link, Text, useClipboard, useDisclosure } from "@chakra-ui/react";
import { network } from "api/net.config";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { formatAddress } from "utils/functions/formatAddress";
import { useAppSelector } from "utils/hooks/redux";
import SendTokens from "../SendTokens/SendTokens";
import { useState } from "react";
import TransactionModal from "../SendTokens/TransactionModal/TransactionModal";
import OwnedNftsModal from "../Dashtabs/NftsTab/OwnedNfts/OwnedNftsModal/OwnedNfts";
import { RiNftFill } from "react-icons/ri";

const AddressSection3 = () => {
  const address = useAppSelector(selectUserAddress);
  const { hasCopied, onCopy } = useClipboard(address);

  // const [showSendModal, setShowSendModal] = useState(false);
  // const onSendClick = () => {
  //   setShowSendModal(true);
  // };

  const { onClose, onOpen, isOpen } = useDisclosure();
  const { onClose: onCloseNfts, onOpen: onOpenNfts, isOpen: isOpenNfts } = useDisclosure();

  return (
    <Grid
      gridTemplateColumns={"repeat(2, 1fr)"}
      bg={"black.base"}
      gap={2}
      justifyItems={"space-between"}
    >
      <HStack onClick={onOpen} cursor={"pointer"} gap={1} justifySelf={"flex-start"} _hover={{bg: "black.baseDark"}} py={2} px={3} borderRadius={"md"} width={"fit-content"} whiteSpace={"nowrap"}>
        <Text>
          Send funds
        </Text>
        <Icon as={ArrowUpIcon} fontSize={"18px"} mb={0}/>
      </HStack>
      {isOpen && <TransactionModal isOpen={true} onClose={onClose} />}
    
      <HStack  onClick={onCopy} cursor={"pointer"} gap={1} justifySelf={"flex-end"} _hover={{bg: "black.baseDark"}} py={2} px={3} borderRadius={"md"} width={"fit-content"} whiteSpace={"nowrap"}>
        <Text>
          Copy address
        </Text>
        {hasCopied ? (
          <Icon as={CheckIcon} fontSize={"18px"} mb={0}/>
        ) : (
          <Icon as={CopyIcon} fontSize={"16px"} mb={0}/>
        )}
      </HStack>

      <HStack onClick={onOpenNfts} cursor={"pointer"} gap={1} justifySelf={"flex-start"} bg={"ghost"} _hover={{bg: "black.baseDark"}} py={2} px={3} borderRadius={"md"} width={"fit-content"} whiteSpace={"nowrap"}>
        <Text>
          My NFTs
        </Text>
        <Icon as={RiNftFill} fontSize={"18px"} mb={0}/>
      </HStack>
      {isOpenNfts && <OwnedNftsModal isOpen={true} onClose={onCloseNfts}/>}

      <Link
        isExternal
        href={`${network.explorerAddress}/accounts/${address}`}
        aria-label="find in explorer"
        gap={1}
        justifySelf={"flex-end"}
        _hover={{bg: "black.baseDark"}}
        py={2} px={3} borderRadius={"md"} width={"fit-content"} whiteSpace={"nowrap"}
      >
        <HStack>
        <Text>
          Explorer view
        </Text>
        <Search2Icon fontSize={"15px"} mb={0}/>
        </HStack>
      </Link>

    </Grid>
  );
};

export default AddressSection3;
