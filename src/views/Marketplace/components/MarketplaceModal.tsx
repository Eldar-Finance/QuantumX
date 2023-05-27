import React from 'react';
import { ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Divider, Flex, Box, Text } from '@chakra-ui/react';
import { purchaseQxTagMarketplace } from 'views/Marketplace/services/calls';
import { useAppSelector } from "utils/hooks/redux";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import MyModal from 'components/Modal/Modal';
import { getRealBalance } from "utils/functions/formatBalance";
import egld from 'assets/logos/egld.svg';
import NextImage from 'components/NextImage/NextImage';
import { InfoOutlineIcon } from '@chakra-ui/icons'

const buyQxTag = (username, extension, amount) => {
    purchaseQxTagMarketplace(username, extension, amount)
};

const ModalComponent = ({ username, extension, amount, tokenId, isOwned, onClose }) => {

    const userAddress = useAppSelector(selectUserAddress);

    return (
        <MyModal
            isOpen={true}
            onClose={onClose}
            size={"2xl"}
            background="black.baseDark"
        >
            <ModalHeader>
                <Flex justify="space-between" alignItems="center" p="10px">
                    <Flex flexDirection="column">
                        <Text fontSize="xl" fontWeight="bold">
                            Buy QxTag
                        </Text>
                        {isOwned && (
                            <Flex alignItems="center" mt={2}>
                                <InfoOutlineIcon color="#22F7DD" boxSize={5} />
                                <Text fontSize="md" color="#22F7DD" ml={2}>
                                    You are the owner
                                </Text>
                            </Flex>
                        )}
                    </Flex>
                    <ModalCloseButton m="20px 20px 0 0" />
                </Flex>


                <Divider />
            </ModalHeader>
            <ModalBody>
                <Box bg="#151515" padding="20px" borderRadius="20px">
                    <Flex direction="column" textAlign="center" gap="5px">
                        <Text>{username}.{extension}</Text>
                        {tokenId && tokenId == 'EGLD' ?
                            <>
                                <Flex justifyContent="center" gap="10px">
                                    <Text fontSize="20px">{getRealBalance(amount, 18)}</Text>
                                    <NextImage
                                        src={egld}
                                        alt=""
                                        height={20}
                                        width={20}
                                    />
                                </Flex>
                            </>
                            : ''
                        }
                    </Flex>
                </Box>
            </ModalBody>
            <ModalFooter justifyContent="center">
                <Flex width="100%" justify="space-around" gap="10px">
                    <Box width="100%">
                        <Button colorScheme="blue" width="100%" bg="none" border="1px solid #22F7DD" color='white' _hover={{ bg: '#22F7DD', color: 'black' }} onClick={onClose}>
                            <Text>Cancel</Text>
                        </Button>
                    </Box>
                    <Box width="100%">
                        <Button
                            colorScheme="blue" width="100%" bg="none" border="1px solid #22F7DD" color='white'
                            _hover={{ bg: '#22F7DD', color: 'black' }}
                            onClick={() => buyQxTag(username, extension, amount)}
                            disabled={!userAddress || isOwned}
                        >
                            <Text>Buy</Text>
                        </Button>
                    </Box>
                </Flex>
            </ModalFooter>
        </MyModal>
    );
};

export default ModalComponent;
