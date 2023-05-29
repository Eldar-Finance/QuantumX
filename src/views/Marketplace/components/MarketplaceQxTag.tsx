import {
    Box,
    Button,
    Heading,
    Wrap,
    WrapItem,
    Flex,
    Text,
    Spinner,
    Center
} from '@chakra-ui/react';
import { useGetQxTagMarketplace } from '../../Tags/hooks/useGetQTag'
import React, { useState, useEffect } from 'react';
import ModalComponent from './MarketplaceModal';
import useGetQTag from "views/Tags/hooks/useGetQTag";

const letterRanges = [
    { label: '[ A-G ]', range: /^[A-G]/i },
    { label: '[ H-M ]', range: /^[H-M]/i },
    { label: '[ N-S ]', range: /^[N-S]/i },
    { label: '[ T-Y ]', range: /^[T-Y]/i },
    { label: '[ Z ]', range: /^[Z]/i },
];

const MarketplaceQxTag = () => {

    const { dataTagsInfo, error, isLoading } = useGetQxTagMarketplace();
    const { tagInfo } = useGetQTag();

    const defaultRange = letterRanges.find(range => range.label === '[ A-G ]');
    const [selectedRange, setSelectedRange] = useState(defaultRange);
    const [filteredItems, setFilteredItems] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (dataTagsInfo && dataTagsInfo.length > 0) {
            const filtered = dataTagsInfo.filter((item) => {
                return selectedRange.range.test(item.username) && item.amount !== "0";
            });
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

    const isOwned = filteredItems.filter(
        (item) =>
            item.username === tagInfo.username && item.extension === tagInfo.extension
    );

    return (
        <Flex direction="column" justifyContent="center">
            <Heading
                mb={8}
                as="h1"
                fontSize={"3xl"}
                textAlign={"center"}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                QuantumXTags Marketplace
            </Heading>
            {!isLoading && (
                <Wrap
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="20px"
                >
                    {letterRanges.map((range, index) => (
                        <WrapItem key={range.label}>
                            <Button
                                bg="none"
                                color={selectedRange === range ? "#22F7DD" : "white"}
                                width="50px"
                                _hover={{ bg: "none" }}
                                _active={{ bg: "none" }}
                                onClick={() => handleRangeFilter(range)}
                                ml={index === letterRanges.length - 1 ? "" : "10px"}
                            >
                                {range.label}
                            </Button>
                        </WrapItem>
                    ))}

                </Wrap>
            )}
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Spinner size="xl" color="#22F7DD" />
                </Box>
            ) : (
                <Flex gap="10px" justifyContent="center" alignItems="center">
                    <Box p={4} mt="25px">
                        <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
                            {filteredItems.map((item, index) => (
                                <Button
                                    padding="25px"
                                    textAlign="center"
                                    fontSize="md"
                                    m={1}
                                    borderRadius="none"
                                    background="#242526"
                                    color="#22F7DD"
                                    w={{
                                        sm: "100%",
                                        base: "auto",
                                        md: "auto",
                                        lg: "auto",
                                    }}
                                    key={item.username + '.' + item.extension}
                                    onClick={() => handleOpenModal(item)}
                                >
                                    {item.username + "." + item.extension}
                                </Button>
                            ))}

                        </Flex>
                    </Box>
                    <Box>
                        {/* Render the modal component */}
                        {modalOpen && selectedItem && (
                            <ModalComponent
                                username={selectedItem.username}
                                extension={selectedItem.extension}
                                amount={selectedItem.amount}
                                tokenId={selectedItem.token}
                                isOwned={isOwned}
                                onClose={() => setModalOpen(false)}
                            />
                        )}
                    </Box>
                </Flex>
            )}
            <Box display="flex" justifyContent="center" alignItems="center" mt="25px">
                {filteredItems.length === 0 && !isLoading && (
                    <Text>No available QXTags for the selected filter.</Text>
                )}
            </Box>
        </Flex>
    );

};

export default MarketplaceQxTag;