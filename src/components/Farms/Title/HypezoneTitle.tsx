import React, { useState } from 'react';
import { Box, Center, Heading, Text, Flex } from "@chakra-ui/react";
import { formatNumber } from "utils/functions/formatBalance";
import hypey from "assets/logos/hypey.png";
import NextImage from "components/NextImage/NextImage";
import ActionButton from "components/ActionButton/ActionButton";
import HypezoneInfoModal from "components/Farms/HypezoneInfo/HypezoneInfoModal";
import { InfoIcon } from '@chakra-ui/icons';
import AutoHarvestInfoModal from 'views/Admin/Views/Farms/AutoHarvestInfoModal';
interface IProps {
    title: string;
    subtitle: string;
    amount: number;
    tvlText?: String;
}

const HypezoneTitle = ({
    title,
    subtitle,
    amount,
    tvlText = "Total value Locked in Farms",
}: IProps) => {

    const [feesModalOpen, setFeesModalOpen] = useState(false);

    const handleFeesModal = async () => {
        setFeesModalOpen(!feesModalOpen);
    };

    const isSmallDevice = window.innerWidth <= 768;
    const [modalOpen, setModalOpen] = useState(false);
  
    const handleInfoModal = async () => {
        setModalOpen(!modalOpen);
    };

    return (
        <>
            <Box textAlign={"center"}>
                {" "}
                <Flex flexDirection="row" alignItems="center" gap="20px">
                    <NextImage alt="" src={hypey} />
                    <Flex flexDirection="column">
                        <Heading as="h1" fontSize={"3xl"} mb="1">
                            {title}
                        </Heading>
                        <Text fontSize={"md"} color="white.400" mb="10">
                            {subtitle}
                        </Text>
                    </Flex>
                </Flex>
                <Center
                    px="6"
                    py="3"
                    textAlign={"center"}
                    bg="black.baseDark"
                    maxW="600px"
                    mx="auto"
                    borderRadius={"xl"}
                    flexDir="column"
                >
                    <Heading as="h4" fontSize={"md"} color="white.400" fontWeight={"400"}>
                        {tvlText}
                    </Heading>
                    <Text fontSize={"2xl"} fontWeight="600">
                        ${formatNumber(amount)}
                    </Text>
                </Center>
                <ActionButton
                    height={"30px"}
                    bg="white"
                    mt={5}
                    onClick={handleFeesModal}
                    disabled={false}
                    mr={"5"}
                >
                    <InfoIcon/> &nbsp;&nbsp; Fees
                </ActionButton>
                <ActionButton
                    height={"30px"}
                    bg="white"
                    mt={5}
                    onClick={handleInfoModal}
                    disabled={false}
                >
                    <InfoIcon/> &nbsp;&nbsp; Auto-Harvest
                </ActionButton>
                {feesModalOpen && 
                    <HypezoneInfoModal 
                        onClose={() => setFeesModalOpen(false)}
                    />
                }
                {modalOpen && 
                    <AutoHarvestInfoModal
                        onClose={() => setModalOpen(false)}
                    />
                }
            </Box>
        </>
    );
};

export default HypezoneTitle;
