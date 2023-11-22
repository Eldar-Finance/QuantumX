import React, { useState } from 'react';
import { Button, Image, Text, Box, Flex, Center, VStack, Divider } from '@chakra-ui/react';
import NFTModal from './NFTModal'; // Adjust the path if necessary
import TextField from '../components/SmartSwap/TextField/TextField';
import { updateURLParams } from 'utils/functions/routes';
import { toknesID } from 'api/net.config';
import { SwapToken } from '../components/SmartSwap/SwapCard/SwapCard';
import ActionButton from 'components/ActionButton/ActionButton';
import { NFTLiquidSell } from 'api/sc/calls';

const NFTLiquidityInterface = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [royalties, setRoyalties] = useState(null); 

  const fetchRoyalties = async (nftIdentifier) => {
    try {
      const response = await fetch(`https://api.multiversx.com/nfts/${nftIdentifier}`);
      if (!response.ok) {
        throw new Error('Failed to fetch NFT royalties');
      }
      const data = await response.json();
      return data.royalties; // Assuming the API returns a 'royalties' field
    } catch (error) {
      console.error('Error fetching NFT royalties:', error);
      return null;
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNftSelect = async (nft) => {
    const fetchedRoyalties = await fetchRoyalties(nft.identifier);
    setRoyalties(fetchedRoyalties);
    setSelectedNFT(nft);
    handleCloseModal();
  };
  const [toToken, setToToken] = useState<SwapToken>({
    identifier: toknesID.wegld,
    decimals: 18,
    value: null,
  });
  
  const handleOnSelectToToken = (token) => {
    const tokenIdentifier = token.identifier;
    updateURLParams({ toToken: tokenIdentifier });
    setToToken({
      identifier: tokenIdentifier,
      decimals: token.decimals,
      value: null,
    });
  };

  const handleSwapNft = async (nft) => {
    console.log("⚠️ ~ file: NFTLiquidityInterface.tsx:60 ~ nft:", nft, nft.collection, nft.nonce, nft.offerId)
    if (!nft.colllection || !nft.nonce || !nft.offerId) {
      NFTLiquidSell(nft.collection, nft.nonce, nft.offerId);
    }
  };    

  return (
    <><Box flex={"row"} width={"450px"} mb={"10px"}
          p={"10px"} pb={"10px"} px={4} borderRadius={"20px"}
          position={"relative"} bg="secondary" fontSize={{ xs: "sm", md: "16px" }}>

          {/* Flex container for selected NFT and button */}
          <Flex justifyContent={selectedNFT ? "space-between" : "center"} alignItems="center" width="full">
              {/* Display the selected NFT details */}
              {selectedNFT && (
                  <Box 
                  display="flex" 
                  flexDirection="column" 
                  alignItems="center" 
                  justifyContent="center" 
                  textAlign="center"
                >
                  <Image borderRadius={"25px"} src={selectedNFT.url} width="120px" alt={selectedNFT.name} />
                  <Text>{selectedNFT.name}</Text>
                  <Text>Rank: {selectedNFT.rank}</Text>
                </Box>

              )}
              <Button onClick={handleOpenModal}>Select NFT</Button>
          </Flex>
          {/* NFT Selection Modal */}
          <NFTModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onNftSelect={handleNftSelect} />
      </Box>
      {selectedNFT && (
          <><Box
          maxWidth={"450px"} mb={"10px"}
          p={"10px"} pb={"10px"} px={4} borderRadius={"20px"}
          position={"relative"} bg="secondary" fontSize={{ xs: "sm", md: "16px" }}
        >
          <VStack spacing={4} align="stretch">
            <Text> Your Sell Now <Text as="span" float="right"> {selectedNFT.price.toFixed(4)} EGLD </Text> </Text>
            <Text> XOXNO fee (1%) <Text as="span" float="right"> {selectedNFT.price.toFixed(4) * 0.01} EGLD </Text> </Text>
            <Text> Creator Royalties ({royalties}%) <Text as="span" float="right"> {selectedNFT.price.toFixed(4) * (royalties / 100)}  EGLD </Text> </Text>
            <Divider borderColor="gray.600" />
            <Text> After sale you will get <Text as="span" float="right"> {selectedNFT.price.toFixed(4) - selectedNFT.price.toFixed(4) * 0.1 - selectedNFT.price.toFixed(4) * 0.01} EGLD </Text> </Text>
          </VStack>
        </Box><Box>
            <Center mt="4">
              <ActionButton
                bg={"linear-gradient(315deg, #FF005C 50%, #22F6DC 50% 100%);"}
                filter={"brightness(90%)"}
                color="black"
                py="17px"
                width="100%"
                alignContent="center"
                fontWeight={"900"}
                fontSize={"1.2em"}
                style={{ margin: 'auto', marginTop: '20px' }}
                height={"auto"}
                variant={"solid"}
                borderRadius={"12px"}
                padding={"20px"}
                onClick={() => handleSwapNft(selectedNFT)}
              >
                Sell Now
              </ActionButton>
            </Center>
          </Box></>
          )}
      
      </>
    
  );
};

export default NFTLiquidityInterface;
