import { CheckIcon, CopyIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, Icon, Link, useClipboard } from "@chakra-ui/react";
import { network } from "api/net.config";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { formatAddress } from "utils/functions/formatAddress";
import { useAppSelector } from "utils/hooks/redux";

const AddressSection2 = () => {
  const address = useAppSelector(selectUserAddress);
  const { hasCopied, onCopy } = useClipboard(address);
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      fontSize={"0.5em"}
    >
      {formatAddress(address)}

    </Box>
  );
};

export default AddressSection2;
