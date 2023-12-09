import { CheckIcon, CopyIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, HStack, Icon, Link, Text, useClipboard } from "@chakra-ui/react";
import { network } from "api/net.config";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { formatAddress } from "utils/functions/formatAddress";
import { useAppSelector } from "utils/hooks/redux";

const AddressSection3 = () => {
  const address = useAppSelector(selectUserAddress);
  const { hasCopied, onCopy } = useClipboard(address);
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      // marginBottom={"5px"}
      // marginLeft={"10px"}
      // m={2}
      // gap={3}
    >
      {/* {formatAddress(address)} */}

      <HStack  onClick={onCopy} cursor={"pointer"} gap={2} w={"full"}>
        <Text>
          Copy
        </Text>
        {hasCopied ? (
          <Icon as={CheckIcon} fontSize={"18px"} mb={0.5}/>
        ) : (
          <Icon as={CopyIcon} fontSize={"16px"} mb={0.5}/>
        )}
      </HStack>
      {/* <HStack > */}

        <Link
          isExternal
          href={`${network.explorerAddress}/accounts/${address}`}
          aria-label="find in explorer"
          gap={1}
          whiteSpace={"nowrap"}
        >
          <HStack>
          <Text>
            Explorer view
          </Text>
          <Search2Icon fontSize={"15px"} mb={0.5}/>
          </HStack>
        </Link>
      {/* </HStack> */}
    </Box>
  );
};

export default AddressSection3;
