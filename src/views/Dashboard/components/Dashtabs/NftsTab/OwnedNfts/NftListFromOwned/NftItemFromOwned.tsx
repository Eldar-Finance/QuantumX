import { Box, Card, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { getCollectionsCount } from "api/rest/elrondApi/collections";
import { getNftData } from "api/rest/others/Swap";

import dynamic from "next/dynamic";
import Image from "next/image";
import useSWR from "swr";
import { IElrondNFT } from "utils/types/elrond.interface";

const SellModal: any = dynamic(() => import("../SellModal/SellModal"));

interface IProps {
  nft: IElrondNFT;
}
const NftItemFromOwned = ({ nft }: IProps) => {
  const priceColor = useColorModeValue("black.600", "white.400");
  const bg = useColorModeValue("lightGray.base", "#202020");
  const { data: nftElrondSwap } = useSWR(nft && nft.identifier, getNftData);
  const { data: count } = useSWR(nft && nft.collection, getCollectionsCount);

  return (
    <Card pb={4} p={"10px"} bg={bg}>
      <Box position="relative" borderRadius={"lg"} overflow="hidden">
        {nft.media && (
          <Image
            src={nft.media[0].thumbnailUrl}
            alt={nft.identifier}
            width={600}
            height={600}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        )}
      </Box>
      <Box px={3} mt={4}>
        <Text fontSize={"smaller"} mb={1}>
          {nft.identifier}
        </Text>
        <Flex justifyContent={"space-between"} alignItems="center" mb={1}>
          {" "}
          <Text fontSize={"xl"} mr={2}>
            {" "}
            {nft.name}
          </Text>
        </Flex>
        <Flex justifyContent={"space-between"} mb={3}>
          {nftElrondSwap && (
            <Text fontSize={"smaller"} textDecoration="underline">
              Rank {nftElrondSwap?.rank}
            </Text>
          )}
          {nftElrondSwap && count && (
            <Text fontSize={"smaller"} color={priceColor}>
              {nftElrondSwap?.rank} of {count}
            </Text>
          )}
        </Flex>
      </Box>
    </Card>
  );
};

export default NftItemFromOwned;
