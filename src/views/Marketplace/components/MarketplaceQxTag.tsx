import {
    Box,
    Button,
    Heading,
    Wrap,
    WrapItem,
    Flex,
} from '@chakra-ui/react';
import { useGetQxTagMarketplace } from '../../Tags/hooks/useGetQTag'
import React, { useState, useEffect } from 'react';
import ModalComponent from './MarketplaceModal';

const letterRanges = [
    { label: '[ A-G ]', range: /^[A-G]/i },
    { label: '[ H-M ]', range: /^[H-M]/i },
    { label: '[ N-S ]', range: /^[N-S]/i },
    { label: '[ T-Y ]', range: /^[T-Y]/i },
    { label: '[ Z ]', range: /^[Z]/i },
];

const MarketplaceQxTag = () => {

    const { dataTagsInfo, error } = useGetQxTagMarketplace();

    const defaultRange = letterRanges.find(range => range.label === '[ A-G ]');
    const [selectedRange, setSelectedRange] = useState(defaultRange);
    const [filteredItems, setFilteredItems] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (dataTagsInfo && dataTagsInfo.length > 0) {
            const filtered = dataTagsInfo.filter((item) => selectedRange.range.test(item.username));
            setFilteredItems(filtered);
        }
    }, [selectedRange, dataTagsInfo]);

    const handleRangeFilter = (range) => {
        setSelectedRange(range);
    };
    
    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };
    return (
        <>
            <Heading
                mb={8}
                as="h1"
                fontSize={"3xl"}
                textAlign={"center"}
                display="flex"
                justifyContent="center"
            >
                QuantumXTags Marketplace
            </Heading>
            <Wrap mb={4} justifyContent="flex-start" width="70%">
                {letterRanges.map((range) => (
                    <WrapItem key={range.label}>
                        <Button
                            bg="none"
                            color={selectedRange === range ? "#22F7DD" : "white"}
                            width="50px"
                            _hover={{ bg: "none" }}
                            _active={{ bg: "none" }}
                            onClick={() => handleRangeFilter(range)}
                        >
                            {range.label}
                        </Button>
                    </WrapItem>
                ))}
            </Wrap>
            <Flex gap="10px" flexWrap="wrap" width="70%">
                {filteredItems.map((item, index) => (
                    <Box
                        key={index}
                        minWidth={{ base: "15%", md: "100%", sm: "100%", lg: "15%" }}
                        maxWidth={{ base: "150px", md: "100%", sm: "100%", lg: "150px" }}
                        flex="1 0 auto"
                    >
                        <Button
                            padding="25px"
                            width="100%"
                            textAlign="center"
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            borderRadius="none"
                            background="#242526"
                            color="#22F7DD"
                            onClick={() => handleOpenModal(item)}
                        >
                            {item.username + '.' + item.extension}
                        </Button>
                    </Box>
                ))}
                <Box>
                    {/* Render the modal component */}
                    {modalOpen && selectedItem && (
                        <ModalComponent
                            username={selectedItem.username}
                            extension={selectedItem.extension}
                            amount={selectedItem.amount}
                            onClose={() => setModalOpen(false)}
                        />
                    )}
                </Box>
            </Flex>
        </>
    );

};

export default MarketplaceQxTag;