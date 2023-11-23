import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalCloseButton, 
  Image, 
  Grid, 
  Box, 
  Text, 
  Spinner,
  VStack
} from '@chakra-ui/react';
import useGetUserNfts from 'utils/hooks/useGetUserNfts';

const NFTModal = ({ isOpen, onClose, onNftSelect }) => {
  const { nfts, isLoading: isNftsLoading, isError } = useGetUserNfts();
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const checkNftOffers = async (nft) => {
    const query = {
      filters: { collection: [nft.collection] },
      top: 1,
      skip: 0,
      select: [],
      orderBy: ["priceShort desc"]
    };

    const encodedQuery = btoa(JSON.stringify(query));
    const response = await fetch(`https://proxy-api.xoxno.com/getGlobalOffers/${encodedQuery}`);

    if (!response.ok) {
      throw new Error('Failed to fetch NFT offers');
    }

    const data = await response.json();
    const hasOffers = data.resources && data.resources.length > 0;
    const price = hasOffers ? parseFloat(data.resources[0].price) / Math.pow(10, 18) : null;
    const offerId = hasOffers ? data.resources[0].offerId : null;
    
    return { hasOffers, price, offerId };
  };

  useEffect(() => {
    const fetchNftOffers = async () => {
      setIsProcessing(true);
      if (nfts.length > 0) {
        const nftsWithOffers = [];
        for (const nft of nfts) {
          try {
            const { hasOffers, price, offerId } = await checkNftOffers(nft);
            if (hasOffers) {
              nftsWithOffers.push({ ...nft, price, offerId });
            }
          } catch (error) {
            console.error('Error fetching offers for NFT:', error);
          }
        }
        setFilteredNfts(nftsWithOffers);
      }
      setIsProcessing(false);
    };

    fetchNftOffers();
  }, [nfts]);

  const handleNftClick = (nft) => {
    onNftSelect(nft);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg={"black.baseLight"} mx={5} maxW={{md: "680px"}} maxH="80vh"
        overflowY="auto" borderRadius={"20px"}
      >
        <ModalHeader>Select an NFT</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isNftsLoading && <Text>Loading NFTs...</Text>}
          {isError && <Text>Error fetching NFTs.</Text>}
          {isProcessing ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Spinner size="xl" my={20}/>
            </Box>
          ) : (
            <Grid templateColumns={{sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)"}} gap={4}>
              {filteredNfts.map((nft) => (
                <Box 
                  display="flex" 
                  flexDirection="column" 
                  alignItems="center" 
                  justifyContent="center" 
                  textAlign="center"
                  key={nft.identifier} 
                  onClick={() => handleNftClick(nft)} 
                  cursor="pointer"
                  borderRadius="20px"
                  bg={"black.baseDark"}
                  width={{sm: "160px", md: "180px"}}
                  overflow="hidden"
                  p={2}
                  border="2px solid"
                  borderColor={"transparent"}
                  _hover={{
                    borderColor: "main"
                  }}
                >
                  <Image borderRadius={"20px"} src={nft.url} alt={"No image available"}
                    boxSize="140px" 
                    objectFit="cover"
                    width={"full"}
                  />
                  <VStack fontSize={"14px"} mt={3} gap={2}>
                    <Text color={"whiteAlpha.800"}>{nft.name}</Text>
                    {nft.price && <Text fontWeight={"semibold"}>{nft.price.toFixed(4)} EGLD</Text>}
                  </VStack>
                </Box>
              ))}
            </Grid>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NFTModal;
