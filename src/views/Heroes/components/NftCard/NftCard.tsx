import { Box } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import NextImage from "components/NextImage/NextImage";
import { IElrondNFT } from "utils/types/elrond.interface";

interface IProps {
  onSubmit: () => void;
  nft: IElrondNFT;
}

const NftCard = ({ onSubmit, nft }: IProps) => {
  return (
    <Box bg="secondary" borderRadius={"md"} minH="400px" w="300px" p={4}>
      <NextImage
        alt="nft"
        src={nft.media[0].thumbnailUrl}
        width={300}
        height={300}
        style={{
          borderRadius: "10px",
        }}
      />
      <Box textAlign={"center"} mt={5} fontWeight="bold" fontSize={"lg"}>
        {nft.name}
      </Box>
      <ActionButton
        w="full"
        mt={5}
        fontWeight="900"
        onClick={onSubmit}
        // disabled={nft.nonce >= 303}
        disabled={true}
      >
        Upgrade
      </ActionButton>
    </Box>
  );
};

export default NftCard;
