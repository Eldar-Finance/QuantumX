import { Box } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import NextImage from "components/NextImage/NextImage";
import { ReactNode } from "react";

interface IProps {
  iamge: any;
  text: ReactNode;
  onSubmit: () => void;
}

const NftCard = ({ iamge, onSubmit, text }: IProps) => {
  return (
    <Box bg="secondary" borderRadius={"md"} minH="400px" w="300px" p={4}>
      <NextImage
        alt="nft"
        src={iamge}
        style={{
          borderRadius: "10px",
        }}
      />
      <Box textAlign={"center"} mt={3} fontWeight="bold" fontSize={"lg"}>
        {text}
      </Box>
      <ActionButton w="full" mt={8} fontWeight="900" onClick={onSubmit}>
        Buy Now
      </ActionButton>
    </Box>
  );
};

export default NftCard;
