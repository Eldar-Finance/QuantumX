import { CheckIcon, CopyIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, Icon, Image, Link, useClipboard } from "@chakra-ui/react";
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
      justifyContent={"space-between"}
      fontSize={"sm"}
      w={"fit-content"}
    >
      <Image
        src={`https://id.maiar.com/users/photos/profile/${address}`}
        alt="Profile"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = 'https://pbs.twimg.com/profile_images/1611302688699858946/Dbs4USUR_400x400.jpg'; // Replace with your default image URL
        }}
        style={{
          width: '30px', // Small size, adjust as needed
          height: '30px', // Maintain aspect ratio
          borderRadius: '30%', // Make the image round
          marginRight: '15px', // Space between image and text
        }}
      />
      {formatAddress(address)}
    </Box>

  );
};

export default AddressSection2;
