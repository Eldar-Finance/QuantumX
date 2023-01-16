/* eslint-disable react/no-unescaped-entities */
import { Center, HStack, Link, Text } from "@chakra-ui/react";
import img3 from "assets/eldar-badges/frameit_logo.svg";
import img2 from "assets/eldar-badges/logo2.png";
import NextImage from "components/NextImage/NextImage";
import useGetUserNfts from "utils/hooks/useGetUserNfts";
import NftCard from "../NftCard/NftCard";
const QuantumxHeroCollection = "QXHR-9b0bc6";
const NftList = () => {
  const handleUpgrade = () => {};
  const { nfts, isLoading } = useGetUserNfts(QuantumxHeroCollection);
  return (
    <Center w="full">
      <Center flexWrap={"wrap"} gap={12} mt={8} maxW={"1100px"}>
        {nfts.map((nft) => {
          return (
            <NftCard key={nft.identifier} onSubmit={handleUpgrade} nft={nft} />
          );
        })}

        {!isLoading && nfts.length === 0 && (
          <Center flexDir={"column"}>
            <Text fontSize={"xl"} mt={10} mb={6}>
              You don't have a QuantumXHeroes NFT yet...
            </Text>

            <HStack spacing={{ xs: "10px", movil: "20px", md: "40px" }}>
              <Link
                isExternal
                href={`https://xoxno.com/collection/${QuantumxHeroCollection}`}
              >
                <NextImage src={img2} alt="xoxno" width={100} />
              </Link>
              <Link
                isExternal
                href={`https://www.frameit.gg/marketplace/${QuantumxHeroCollection}/items`}
              >
                <NextImage src={img3} alt="frameit" width={20} />
              </Link>
            </HStack>
          </Center>
        )}
      </Center>
    </Center>
  );
};

export default NftList;
