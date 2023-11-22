import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  ModalCloseButton, 
  Button, 
  Image, 
  Grid, 
  Box, 
  Text, 
  Spinner
} from '@chakra-ui/react';
import useGetUserNfts from 'utils/hooks/useGetUserNfts';

const NFTModal = ({ isOpen, onClose, onNftSelect }) => {
  const { nfts, isLoading: isNftsLoading, isError } = useGetUserNfts();
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);

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
    return { hasOffers, price };
  };

  useEffect(() => {
    const fetchNftOffers = async () => {
      setIsProcessing(true);
      if (nfts.length > 0) {
        const nftsWithOffers = [];
        for (const nft of nfts) {
          try {
            const { hasOffers, price } = await checkNftOffers(nft);
            if (hasOffers) {
              nftsWithOffers.push({ ...nft, price });
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
    setSelectedNft(nft);
  };

  const handleConfirmClick = () => {
    if (selectedNft) {
      onNftSelect(selectedNft);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="700px" maxH="80vh" overflowY="auto">
        <ModalHeader>Select an NFT</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isNftsLoading && <Text>Loading NFTs...</Text>}
          {isError && <Text>Error fetching NFTs.</Text>}
          {isProcessing ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Spinner size="xl" />
            </Box>
          ) : (
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {filteredNfts.map((nft) => (
                <Box 
                  key={nft.identifier} 
                  onClick={() => handleNftClick(nft)} 
                  cursor="pointer"
                  borderWidth="1px" 
                  borderRadius="lg" 
                  width="200px"
                  overflow="hidden"
                  p="2"
                  textAlign="center"
                >
                  <Image src={nft.url} alt={nft.name} boxSize="90px" objectFit="cover" />
                  <Text mt="2">{nft.name}</Text>
                  {nft.price && <Text mt="2">Price: {nft.price}</Text>}
                </Box>
              ))}
            </Grid>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleConfirmClick} disabled={!selectedNft} colorScheme="blue">
            Confirm Selection
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NFTModal;
