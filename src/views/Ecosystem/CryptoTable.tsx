import React, { useState, useEffect } from 'react';
import {
  Box,
  Image,
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useMediaQuery,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';

const CryptoTable = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedToken, setSelectedToken] = useState(null);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios('https://api.multiversx.com/tokens?size=500&type=FungibleESDT&sort=marketCap');
        const validTokens = result.data
          .filter(token => token.price != null && token.assets && token.assets.pngUrl)
          .sort((a, b) => b.marketCap - a.marketCap);
        setTokens(validTokens);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTokenClick = (token) => {
    setSelectedToken(token);
    onOpen();
  };

  const handleBuyClick = (token) => {
    const baseUrl = "https://quantumx.network/swap";
    const url = `${baseUrl}?toToken=${token.identifier}&fromToken=EGLD`;
    window.location.href = url; // Opens the link in the same tab
  };
  

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error.message}</Box>;

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLargerThan768) {
    // Desktop layout
    return (
      <Box width="70%" marginTop={"50px"} background={"#242526"} borderRadius={"20px"} overflowX={{ base: "scroll", md: "hidden" }}>
        <Input 
          placeholder="Search token..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          marginBottom="20px"
          width={"30%"}
          float={"left"}
          background={"#151515"}
          border={"3px solid #242526"}
          borderRadius={"20px"}
        />
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Token</Th>
              <Th></Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Market Cap</Th>
              <Th isNumeric>Supply</Th>
              <Th isNumeric>Holders</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTokens.map((token, index) => (
              <Tr key={token.identifier} cursor="pointer">
                <Td>{index + 1}</Td>
                <Td style={{ display: 'flex' }}>
                  <Image marginBottom={"10px"} marginRight={"10px"} src={token.assets.pngUrl} alt={`${token.ticker} logo`} boxSize="30px" />
                  {token.name}
                </Td>
                <Td>
                  <Button colorScheme='teal' variant='outline'onClick={(e) => {
                    e.stopPropagation();
                    handleBuyClick(token);
                  }}>
                    Buy
                  </Button>
                </Td>
                <Td isNumeric>${token.price.toFixed(5)}</Td>
                <Td isNumeric>${token.marketCap.toLocaleString()}</Td>
                <Td isNumeric>{(token.supply / Math.pow(10, token.decimals)).toLocaleString()}</Td>
                <Td isNumeric>{token.accounts}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {selectedToken && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedToken.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p>Ticker: {selectedToken.ticker}</p>
                <p>Price: ${selectedToken.price.toFixed(2)}</p>
                <p>Market Cap: ${selectedToken.marketCap.toLocaleString()}</p>
                <p>Supply: {(selectedToken.supply / Math.pow(10, selectedToken.decimals)).toLocaleString()}</p>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Box>
    );
  } else {
    // Mobile layout
    return (
      <Box width="100%" marginTop={"50px"} background={"#242526"} borderRadius={"20px"}>
        <Input 
          placeholder="Search token..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          marginBottom="20px"
        />
        {filteredTokens.map((token, index) => (
          <Box key={token.identifier} borderBottom="1px solid gray" p={2} >
            <Flex justify="space-between" align="center">
              <Image src={token.assets.pngUrl} alt={`${token.ticker} logo`} boxSize="50px" />
              <Text fontWeight="bold">{index + 1}. {token.name} {token.ticker}</Text>
              <Button size="sm" colorScheme="green" variant={"outline"} onClick={(e) => {
                e.stopPropagation();
                handleBuyClick(token);
              }}>
                Buy
              </Button>
            </Flex>
            <Text>Price: ${token.price.toFixed(5)}</Text>
            <Text>Market Cap: ${token.marketCap.toLocaleString()}</Text>
            <Text>Supply: {(token.supply / Math.pow(10, token.decimals)).toLocaleString()}</Text>
            <Text>Holders: {token.accounts}</Text>
          </Box>
        ))}
        {selectedToken && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedToken.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p>Ticker: {selectedToken.ticker}</p>
                <p>Price: ${selectedToken.price.toFixed(2)}</p>
                <p>Market Cap: ${selectedToken.marketCap.toLocaleString()}</p>
                <p>Supply: {(selectedToken.supply / Math.pow(10, selectedToken.decimals)).toLocaleString()}</p>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Box>
    );
  }
};

export default CryptoTable;
