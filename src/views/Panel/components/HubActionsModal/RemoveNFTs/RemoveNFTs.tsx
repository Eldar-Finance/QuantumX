import { CloseIcon } from "@chakra-ui/icons";
import {
  Center,
  Divider,
  Flex,
  Heading,
  ModalBody,
  ModalHeader,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { BigUIntValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import NextImage from "components/NextImage/NextImage";
import { useState } from "react";
import { createIndentifierByCollectionAndNonce } from "utils/functions/tokens";
import useGetNfts from "utils/hooks/useGetNfts";
import { IElrondNFT } from "utils/types/elrond.interface";

interface IProps {
  onClose: () => void;
  collection: string;
  id: number;
  nonces: number[];
}

const RemoveNFTs = ({ collection, nonces, id, onClose }: IProps) => {
  const [selectedNFTs, setSelectedNFTs] = useState<IElrondNFT[]>([]);
  const nftsInScArr: string[] = nonces.map((nonce) =>
    createIndentifierByCollectionAndNonce(collection, nonce)
  );
  const { nfts, isLoading } = useGetNfts(nftsInScArr.join(","));

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

  const onRemoveNFTs = () => {
    scCall("hubWsp", "removeNfts", [
      new BigUIntValue(new BigNumber(id)),
      ...selectedNFTs.map((nft) => new BigUIntValue(new BigNumber(nft.nonce))),
    ]);
  };
  return (
    <>
      <ModalHeader>
        <Flex justifyContent={"space-between"} alignItems="center">
          <Heading fontSize={"md"} textTransform="uppercase">
            Remove NFTs
          </Heading>{" "}
          <ActionButton aria-label="close" bg="transparent" onClick={onClose}>
            <CloseIcon color="main" fontSize={"12px"} cursor="pointer" />
          </ActionButton>
        </Flex>
      </ModalHeader>
      <Divider />
      <ModalBody mt="3">
        <Center w="full" mb={8} gap={4} minH="200px" flexWrap={"wrap"}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {!nfts ? (
                <Text>There was an error</Text>
              ) : (
                <>
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
                            (selectedNFT) =>
                              selectedNFT.identifier === nft.identifier
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
                </>
              )}
            </>
          )}
        </Center>
        <Divider mb={5} />
        <Center w="full" flexDir={"column"} mb={5} gap={4} as="form">
          <ActionButton
            bg="white.100"
            variant={"outline"}
            color="gray.400"
            w="full"
            maxW={"180px"}
            onClick={onRemoveNFTs}
          >
            Confirm
          </ActionButton>
        </Center>
      </ModalBody>
    </>
  );
};

export default RemoveNFTs;
