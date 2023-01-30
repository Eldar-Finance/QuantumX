import {
  Box,
  Heading,
  ModalBody,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import MyModal from "components/Modal/Modal";

import Image from "next/legacy/image";
import { IElrondNFT } from "utils/types/elrond.interface";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  nft: IElrondNFT;
}

const SellModal = ({ isOpen, onClose, nft }: IProps) => {
  const secondary = useColorModeValue("black.400", "white.400");
  const bg2 = useColorModeValue("black.50", "white.50");
  const bg = useColorModeValue("light.lighter", " dark.darker");

  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      size="xs"
      background={bg}
      width="full"
    >
      <ModalBody py={6}>
        <Box
          w="full"
          position={"relative"}
          borderRadius="lg"
          overflow={"hidden"}
          height="250px"
          mb={2}
        >
          {nft.media && (
            <Image
              src={nft.media[0].thumbnailUrl}
              alt={nft.identifier}
              width={600}
              height={600}
              layout="responsive"
            />
          )}
        </Box>
        <Text textAlign={"center"} color={secondary} fontSize="sm" mb={3}>
          View original
        </Text>

        <Heading mb={2} fontSize="xl">
          {nft.name}
        </Heading>
        <Text textDecor={"underline"} mb={3}>
          Rank 66
        </Text>

        {/* <SellForm nft={nft} close={onClose} /> */}
      </ModalBody>
    </MyModal>
  );
};

export default SellModal;
