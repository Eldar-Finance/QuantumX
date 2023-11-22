import React, { useState } from 'react';
import { Button, Image, Text, Box, Flex, Center } from '@chakra-ui/react';
import NFTModal from './NFTModal'; // Adjust the path if necessary
import TextField from '../components/SmartSwap/TextField/TextField';
import { updateURLParams } from 'utils/functions/routes';
import { toknesID } from 'api/net.config';
import { SwapToken } from '../components/SmartSwap/SwapCard/SwapCard';

const NFTLiquidityInterface = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNftSelect = (nft) => {
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


  return (
    <><Box flex={"row"} width={"450px"} mb={"10px"}
          p={"10px"} pb={"10px"} px={4} borderRadius={"20px"}
          position={"relative"} bg="secondary" fontSize={{ xs: "sm", md: "16px" }}>

          {/* Flex container for selected NFT and button */}
          <Flex justifyContent="space-between" alignItems="center">
              {/* Display the selected NFT details */}
              {selectedNFT && (
                  <Box>
                      <Image src={selectedNFT.url} width="120px" alt={selectedNFT.name} />
                      <Text>{selectedNFT.name}</Text>
                      <Text>{selectedNFT.description}</Text>
                      {selectedNFT.price && <Text>Price: {selectedNFT.price.toFixed(4)} EGLD</Text>}
                      
                  </Box>

              )}
              <Button onClick={handleOpenModal}>Select NFT</Button>
          </Flex>
          {/* NFT Selection Modal */}
          <NFTModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onNftSelect={handleNftSelect} />
      </Box><Box>
              <Center mt="4">
                  <Button
                      bg={"linear-gradient(315deg, #FF005C 50%, #22F6DC 50% 100%);"}
                      filter={"brightness(90%)"}
                      color="black"
                      py="20px"
                      width="100%"
                      alignContent="center"
                      fontWeight={"900"}
                      fontSize={"1.2em"}
                      style={{ margin: 'auto', marginTop: '20px' }}
                  >
                      Swap
                  </Button>
              </Center>
          </Box></>
    
  );
};

export default NFTLiquidityInterface;
