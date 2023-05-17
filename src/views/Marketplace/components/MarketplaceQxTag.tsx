import {
    Box,
    Stack,
    Input,
    Button,
    List,
    ListItem,
    Text,
    Heading,
    Wrap,
    WrapItem,
    Flex,
    Center,
} from '@chakra-ui/react';
import { useGetQxTagMarketplace } from '../../Tags/hooks/useGetQTag'
import React, { useState, useEffect } from 'react';

const data = [
    'Apple',
    'Ant',
    'Airplane',
    'Anchor',
    'Alphabet',
    'Astronaut',
    'Banana',
    'Bird',
    'Butterfly',
    'Basket',
    'Cat',
    'Car',
    'Candle',
    'Dog',
    'Dolphin',
    'Dinosaur',
    'Elephant',
    'Eagle',
    'Fish',
    'Fox',
    'Giraffe',
    'Guitar',
    'Horse',
    'Helicopter',
    'Ice Cream',
    'Island',
    'Jungle',
    'Jump',
    'Kangaroo',
    'King',
    'Lion',
    'Lemon',
    'Moon',
    'Mountain',
    'Monkey',
    'Nest',
    'Ninja',
    'Orange',
    'Octopus',
    'Penguin',
    'Piano',
    'Queen',
    'Rainbow',
    'Rocket',
    'Sun',
    'Star',
    'Tiger',
    'Tree',
    'Umbrella',
    'Unicorn',
    'Violin',
    'Watermelon',
    'Whale',
    'Xylophone',
    'X-ray',
    'Yacht',
    'Yoga',
    'Zebra',
    'Zero'
];

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

    useEffect(() => {
        const filtered = data.filter((item) => selectedRange.range.test(item));
        setFilteredItems(filtered);
    }, [selectedRange]);

    const handleRangeFilter = (range) => {
        setSelectedRange(range);
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
            <Wrap mb={4} justifyContent="flex-start" width="80%">
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
            <Flex gap="10px" flexWrap="wrap" width="80%">
                {filteredItems.map((item, index) => (
                    <Box
                        key={index}
                        style={{ minWidth: "15%", maxWidth: "150px", flex: "1 0 auto" }}
                    >
                        <Button
                            padding="30px"
                            width="100%"
                            textAlign="center"
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            borderRadius="none"
                            background="#242526"
                            color="#22F7DD"
                            onClick={() => alert('re malaka de to exw teleiwsei akoma')}
                        >
                            {item}
                        </Button>
                    </Box>
                ))}
            </Flex>
        </>
    );

};

export default MarketplaceQxTag;