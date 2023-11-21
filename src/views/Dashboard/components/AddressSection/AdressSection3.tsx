import { CheckIcon, CopyIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, Icon, Link, useClipboard } from "@chakra-ui/react";
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
      justifyContent={"center"}
      alignItems={"flex-end"}
      marginBottom={"5px"}
      marginLeft={"10px"}
    >
      {formatAddress(address)}

      <Box marginLeft={"5px"} onClick={onCopy} cursor={"pointer"}>
        {hasCopied ? (
          <Icon as={CheckIcon} fontSize={"14px"} />
        ) : (
          <Icon as={CopyIcon} fontSize={"14px"} />
        )}
      </Box>
      <Box marginLeft={"5px"}>
        <Link
          isExternal
          href={`${network.explorerAddress}/accounts/${address}`}
          aria-label="find in explorer"
        >
          <Search2Icon fontSize={"14px"} />
        </Link>
      </Box>
    </Box>
  );
};

export default AddressSection3;
