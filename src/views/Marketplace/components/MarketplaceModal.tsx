import React from 'react';
import { ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Divider, Flex, Box, Text } from '@chakra-ui/react';

import MyModal from 'components/Modal/Modal';

const ModalComponent = ({ username, extension, amount, onClose }) => {
    return (
        <MyModal
            isOpen={true}
            onClose={onClose}
            size={"3xl"}
            background="black.baseDark"
            
        >
            <ModalHeader>
                <ModalHeader>
                    <Flex justify="space-between" alignItems="center">
                        <Text fontSize="xl" fontWeight="bold">
                            Buy QxTag
                        </Text>
                        <ModalCloseButton m="20px 20px 0 0" />
                    </Flex>
                </ModalHeader>
                <Divider />
            </ModalHeader>
            <ModalBody>
                <Box bg="#151515" padding="20px" borderRadius="20px">
                    <Flex direction="column" textAlign="center" gap="5px">
                        <Text>{username}.{extension}</Text>
                        <Text>{amount}</Text>
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
                        <Button colorScheme="blue" width="100%" bg="none" border="1px solid #22F7DD" color='white' _hover={{ bg: '#22F7DD', color: 'black' }} onClick={() => alert('Re na to xanapw?')}>
                            <Text>Buy</Text>
                        </Button>
                    </Box>
                </Flex>
            </ModalFooter>
        </MyModal>
    );
};

export default ModalComponent;
