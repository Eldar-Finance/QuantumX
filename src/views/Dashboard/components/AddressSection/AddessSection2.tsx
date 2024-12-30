import { CheckIcon, CopyIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, Icon, Image, Link, useClipboard } from "@chakra-ui/react";
import { network } from "api/net.config";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { formatAddress } from "utils/functions/formatAddress";
import { useAppSelector } from "utils/hooks/redux";

const AddressSection2 = () => {
  const address = useAppSelector(selectUserAddress);
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
          target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
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
