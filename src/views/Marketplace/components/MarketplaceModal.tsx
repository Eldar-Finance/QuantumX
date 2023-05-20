import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Divider, Flex, Box } from '@chakra-ui/react';

const ModalComponent = ({ username, extension, onClose }) => {
    return (
        // <Modal isOpen={true} onClose={onClose} >
        <Modal
            isCentered
            isOpen={true}
            onClose={onClose}
            motionPreset='slideInBottom'
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Buy QxTag</ModalHeader>
                <Divider />
                <ModalCloseButton />
                <ModalBody>
                    <Box bg="#151515" padding="20px" borderRadius="20px"  >
                        <p>Username: {username}</p>
                        <p>Extension: {extension}</p>
                    </Box>
                </ModalBody>
                <Divider />
                <ModalFooter justifyContent="center">
                    <Flex width="100%" justifyContent="space-between">
                        <Box>
                            <Button colorScheme="blue" onClick={onClose}>
                                Cancel
                            </Button>
                        </Box>
                        <Box>
                            <Button colorScheme="blue" onClick={() => alert('Re na to xanapw?')}>
                                Buy
                            </Button>
                        </Box>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalComponent;
