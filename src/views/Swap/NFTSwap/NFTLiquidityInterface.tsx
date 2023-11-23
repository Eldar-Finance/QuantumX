import React, { useState } from 'react';
import { Button, Image, Text, Box, Flex, Center, VStack, Divider, HStack } from '@chakra-ui/react';
import NFTModal from './NFTModal'; // Adjust the path if necessary
import TextField from '../components/SmartSwap/TextField/TextField';
import { updateURLParams } from 'utils/functions/routes';
import { toknesID } from 'api/net.config';
import { SwapToken } from '../components/SmartSwap/SwapCard/SwapCard';
import ActionButton from 'components/ActionButton/ActionButton';
import { NFTLiquidSell } from 'api/sc/calls';
import BigNumber from 'bignumber.js';
import { formatPrecision } from 'utils/functions/formatBalance';

const NFTLiquidityInterface = ({...props}) => {
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
    if (!nft.colllection || !nft.nonce || !nft.offerId) {
      NFTLiquidSell(nft.collection, nft.nonce, nft.offerId);
    }
  };    
  console.log("⚠️ ~ file: NFTLiquidityInterface.tsx:65 ~ nft:", selectedNFT)

  return (
    <VStack gap={10}>
      <HStack 
        width={"full"}  // Set width to 100%
        py={5}
        px={45} 
        borderRadius={"20px"}
        position={"relative"} 
        bg="black.base" 
        justifyContent={selectedNFT ? "space-between" : "center"}
        alignItems="center"
        {...props}
      >
        {selectedNFT && (
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            textAlign="center"
            fontSize={"md"}
            bg={"black.base"}
            border={"1px solid"}
            borderColor={"main"}
            borderRadius={"20px"}
          >
            <Image borderRadius={"20px"} src={selectedNFT.url} width="120px" alt={selectedNFT.name} />
            {/* <Text>{selectedNFT.name}</Text>
            <Text>Rank: {selectedNFT.rank}</Text> */}
          </Box>
        )}
        <ActionButton onClick={handleOpenModal} w={"130px"}>
          {selectedNFT ? "Change NFT" : "Select NFT"}
        </ActionButton>
        <NFTModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onNftSelect={handleNftSelect}
        />
      </HStack>
      {selectedNFT && (
        <VStack
          width={"full"}  // Set width to 100%
          py={5}
          borderRadius={"20px"}
          position={"relative"} 
          bg="black.base" 
          justifyContent={selectedNFT ? "space-between" : "center"}
          alignItems="center"
          {...props}
        >
          <VStack 
            spacing={4}
            align="stretch"
            justifyContent={"space-between"}
            width={"full"}
            py={5}
            px={10}
            borderRadius={"20px"}
            position={"relative"}
            w={"full"}
          >
            <HStack justifyContent={"space-between"}>
              <Text color="white.600"> Sell for </Text> <Text as="span" float="right"> {selectedNFT.price.toFixed(4)} EGLD </Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text color="white.600"> XOXNO fee (1%) </Text> <Text as="span" float="right"> {selectedNFT.price.toFixed(4) * 0.01} EGLD </Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text color="white.600"> Royalties ({royalties}%) </Text>
              <Text as="span" float="right"> {formatPrecision(selectedNFT.price * royalties / 100)}  EGLD </Text>
            </HStack>

            <Divider borderColor="white.500" />
            
            <HStack justifyContent={"space-between"} fontWeight={"semibold"}>
              <Text> You receive </Text>
              <Text as="span" float="right">
                {selectedNFT.price.toFixed(4) - selectedNFT.price.toFixed(4) * 0.1 - selectedNFT.price.toFixed(4) * 0.01} EGLD
              </Text>
            </HStack>
          </VStack>
          
          <ActionButton
            filter={"brightness(90%)"}
            color="black"
            width="180px"
            height="50px"
            alignContent="center"
            fontWeight={"900"}
            fontSize={"1.2em"}
            style={{ margin: 'auto', marginTop: '20px' }}
            variant={"solid"}
            borderRadius={"12px"}
            padding={"20px"}
            onClick={() => handleSwapNft(selectedNFT)}
          >
            Sell Now
          </ActionButton>
        </VStack>
      )}
    </VStack>
  );
};

export default NFTLiquidityInterface;