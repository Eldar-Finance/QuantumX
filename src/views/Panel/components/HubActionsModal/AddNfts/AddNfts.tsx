import { CloseIcon } from "@chakra-ui/icons";
import {
  Center,
  Divider,
  Flex,
  Heading,
  ModalBody,
  ModalHeader,
} from "@chakra-ui/react";
import { BigIntValue } from "@elrondnetwork/erdjs/out";
import { MultiESDTNFTTransfer } from "api/sc/calls";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import NextImage from "components/NextImage/NextImage";
import { useState } from "react";
import useGetUserNfts from "utils/hooks/useGetUserNfts";
import { IElrondNFT } from "utils/types/elrond.interface";

interface IProps {
  onClose: () => void;
  collection: string;
  id: number;
}

const AddNfts = ({ collection, id, onClose }: IProps) => {
  console.log("collection", collection);
  const [selectedNFTs, setSelectedNFTs] = useState<IElrondNFT[]>([]);
  const { nfts } = useGetUserNfts(collection);
  if (!nfts) {
    return null;
  }

  const handleSelectNft = (nft: IElrondNFT) => {
    if (
      selectedNFTs.find(
        (selectedNFT) => selectedNFT.identifier === nft.identifier
      )
    ) {
      setSelectedNFTs([
        ...selectedNFTs.filter((n) => n.identifier !== nft.identifier),
      ]);
    } else {
      setSelectedNFTs([...selectedNFTs, nft]);
    }
  };

  const onAddNfts = () => {
    MultiESDTNFTTransfer(
      "hubWsp",
      "depositNfts",
      selectedNFTs.map((nft) => {
        return {
          ...nft,
          value: 1,
        };
      }),
      [new BigIntValue(new BigNumber(id))]
    );
  };
  return (
    <>
      <ModalHeader>
        <Flex justifyContent={"space-between"} alignItems="center">
          <Heading fontSize={"md"} textTransform="uppercase">
            Add NFTs
          </Heading>{" "}
          <ActionButton aria-label="close" bg="transparent" onClick={onClose}>
            <CloseIcon color="main" fontSize={"12px"} cursor="pointer" />
          </ActionButton>
        </Flex>
      </ModalHeader>
      <Divider />
      <ModalBody mt="3">
        <Center w="full" mb={8} gap={4}>
          {nfts.map((nft) => {
            return (
              <Flex
                key={nft.identifier}
                borderRadius={"md"}
                overflow="hidden"
                cursor={"pointer"}
                onClick={() => handleSelectNft(nft)}
                border="1px"
                borderColor={
                  selectedNFTs.find(
                    (selectedNFT) => selectedNFT.identifier === nft.identifier
                  )
                    ? "main"
                    : "transparent"
                }
              >
                <NextImage
                  src={nft.media[0].thumbnailUrl}
                  alt={nft.name}
                  width={150}
                  height={150}
                />
              </Flex>
            );
          })}
        </Center>
        <Divider mb={5} />
        <Center w="full" flexDir={"column"} mb={5} gap={4} as="form">
          <ActionButton
            bg="white.100"
            variant={"outline"}
            color="gray.400"
            w="full"
            maxW={"180px"}
            onClick={onAddNfts}
          >
            Confirm
          </ActionButton>
        </Center>
      </ModalBody>
    </>
  );
};

export default AddNfts;
