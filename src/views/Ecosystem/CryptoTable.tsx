import React, { useState, useEffect, useMemo } from 'react';
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
  Grid,
  Heading,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';
import Search from 'components/Farms/Search/Search';
import ActionButton from 'components/ActionButton/ActionButton';
import { set } from 'lodash';

const CryptoTable = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedToken, setSelectedToken] = useState(null);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [sortConfig, setSortConfig] = useState({ key: "marketCap", direction: 'descending' });
  const [arrow, setArrow] = useState("⬇"); //↓

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios('https://next-api.multiversx.com/tokens?size=500&type=FungibleESDT&sort=marketCap');
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

  const totalMarketCap = useMemo(() => {
    return tokens.reduce((acc, token) => acc + token.marketCap, 0);
  }, [tokens]);

  const totalTxs = useMemo(() => {
    return tokens.reduce((acc, token) => acc + token.transactions, 0);
  }, [tokens]);

  const sortedTokens = useMemo(() => {
    let sortableTokens = [...tokens];
    if (sortConfig.key !== null) {
      sortableTokens.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTokens;
  }, [tokens, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    setArrow("⬆"); //↓
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
      setArrow("⬇"); //↑
    }
    setSortConfig({ key, direction });
  };

  const handleTokenClick = (token) => {
    setSelectedToken(token);
    onOpen();
  };

  const handleBuyClick = (token) => {
    const baseUrl = "/swap";
    const url = `${baseUrl}?toToken=${token.identifier}&fromToken=EGLD`;
    window.location.href = url; // Opens the link in the same tab
  };

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error.message}</Box>;

  const filteredTokens = sortedTokens.filter(token => 
    token.name.toLowerCase().includes(search.toLowerCase())
  );

  const marketInfoBoxes = (
    <>
    {/* Stats */}
    <Flex
      justifyContent="space-evenly"
      flexDirection={{sm: "column", md: "row"}}
      gap={{sm: 4, md: 2}}
      my={{sm: 4, md: 6}}
    >
      <Center px={{sm: 5, md: 20}} mx={5} py={3} borderRadius={"2xl"} bg="black.base" width={"fit"} flexDir="column">
        <Heading as="h4" fontSize={"lg"} color="white.400" fontWeight={"500"}>
          Total Market Cap
        </Heading>
        <Text fontSize={"2xl"} fontWeight="600">
          ${totalMarketCap.toLocaleString()}
        </Text>
      </Center>
      <Center px={{sm: 5, md: 20}} py={3} mx={5} borderRadius={"2xl"} bg="black.base" width={"fit"} flexDir="column" textAlign={"center"}>
        <Heading as="h4" fontSize={"lg"} color="white.400" fontWeight={"500"}>
          Total token Transactions
        </Heading>
        <Text fontSize="xl" fontWeight="bold">{totalTxs.toLocaleString()}</Text>
      </Center>
    </Flex>

    {/* Search */}
    <Flex w="full" alignItems="center" my={3} justifyContent={"center"} whiteSpace={"nowrap"}>
      <Search bg="black.base" onChange={(e) => setSearch(e)}/>
    </Flex>
    </>
  );

  if (isLargerThan768) {
    // Desktop layout
    return (
      <Box width="70%" marginTop={"50px"} background={"black.baseDark"} borderRadius={"20px"} overflowX={{ base: "scroll", md: "hidden" }}>
        {marketInfoBoxes}
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th cursor="pointer">#</Th>
              <Th cursor="pointer" onClick={() => requestSort('name')}>
                {sortConfig.key == 'name' ? arrow : ''} Token
              </Th>
              <Th></Th>
              <Th isNumeric cursor="pointer" onClick={() => requestSort('price')}>
                {sortConfig.key == 'price' ? arrow : ''} Price
              </Th>
              <Th isNumeric cursor="pointer" onClick={() => requestSort('marketCap')}>
              {sortConfig.key == 'marketCap' ? arrow : ''} Market Cap
              </Th>
              <Th isNumeric cursor="pointer" onClick={() => requestSort('supply')}>
              {sortConfig.key == 'supply' ? arrow : ''} Supply
              </Th>
              <Th isNumeric cursor="pointer" onClick={() => requestSort('accounts')}>
              {sortConfig.key == 'accounts' ? arrow : ''} Holders
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTokens.map((token, index) => (
              <Tr key={token.identifier} cursor="pointer" borderTop={"2px solid"} borderColor={"black.base"}>
                <Td>{index + 1}</Td>
                <Td
                  style={{ display: 'flex' }}
                  alignContent={'center'}
                  alignItems={'center'}
                  border="none"
                >
                  <Image mb={1} marginRight={"10px"} src={token.assets.pngUrl} alt={`${token.ticker} logo`} boxSize="30px" />
                  {token.name}
                </Td>
                <Td>
                  <ActionButton 
                    width={"60px"}
                    borderRadius={"lg"}
                    variant='outline'
                    size='sm'  
                    borderColor='teal'
                    color='teal'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyClick(token);
                    }}>
                    Buy
                  </ActionButton>
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
      <Box width="100%" marginTop={"50px"} background={"black.baseDark"} borderRadius={"20px"}>
        {marketInfoBoxes}
        {filteredTokens.map((token, index) => (
          <Box key={token.identifier} borderTop="2px solid" borderColor={"black.base"} p={2} >
            <Flex justify="space-between" align="center">
              <Image src={token.assets.pngUrl} alt={`${token.ticker} logo`} boxSize="50px" />
              <Text fontWeight="bold">{index + 1}. {token.name}</Text>
              <ActionButton 
                    width={"60px"}
                    borderRadius={"lg"}
                    variant='outline'
                    size='sm'  
                    borderColor='teal'
                    color='teal'
                    onClick={(e) => {
                e.stopPropagation();
                handleBuyClick(token);
              }}>
                Buy
              </ActionButton>
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
