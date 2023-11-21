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
  alignItems={"center"} // Align items vertically center
  justifyContent={"center"}
  fontSize={"0.7em"}
>
  <img
    src={`https://id.maiar.com/users/photos/profile/${address}`}
    alt="Profile"
    style={{
      width: '40px', // Small size, adjust as needed
      height: '40px', // Maintain aspect ratio
      borderRadius: '30%', // Make the image round
      marginRight: '5px', // Space between image and text
    }}
  />
  {formatAddress(address)}
</Box>

  );
};

export default AddressSection2;
