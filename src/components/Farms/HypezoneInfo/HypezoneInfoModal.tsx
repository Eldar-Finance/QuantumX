import MyModal from 'components/Modal/Modal';
import { Text, ModalHeader, Divider, ModalBody, ModalCloseButton, Flex } from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
const HypezoneInfoModal = ({ onClose }) => {

    return (
        <MyModal
            isOpen={true}
            bg="black.baseDark"
            onClose={onClose}
            size="xl"
        >
            <ModalHeader>Fees</ModalHeader>
            <ModalCloseButton mt={2}/>
            <Divider />
            <ModalBody padding={10}>
                <Flex direction="column" gap="10px">
                    <Flex alignItems="start">
                        <MinusIcon color="white" mr="2" mt={1} />
                        <Text color="white" fontWeight="normal">Important things you need to know before accessing HYPEZone Area</Text>
                    </Flex>
                    <Flex alignItems="start">
                        <MinusIcon color="white" mr="2" mt={1} />
                        <Text color="white" fontWeight="normal">The gas fee for any transaction in the HYPEZone is 0.5 $RARE, includes staking and claiming rewards</Text>
                    </Flex>
                    <Flex alignItems="start">
                        <MinusIcon color="white" mr="2" mt={1} />
                        <Text color="white" fontWeight="normal">Withdrawal fees for HYPEZone Farms and Pools</Text>
                    </Flex>
                    <Flex alignItems="start">
                        <MinusIcon color="white" mr="2" mt={1} />
                        <Text color="white" fontWeight="normal">0-14 Days - 5% Fee</Text>
                    </Flex>
                    <Flex alignItems="start">
                        <MinusIcon color="white" mr="2" mt={1} />
                        <Text color="white" fontWeight="normal">15-28 Days - 2.5% Fee</Text>
                    </Flex>
                    <Flex alignItems="start">
                        <MinusIcon color="white" mr="2" mt={1} />
                        <Text color="white" fontWeight="normal">Minimum staking period 28 days, after 28 days 0 fees</Text>
                    </Flex>
                    <Flex alignItems="start">
                        <MinusIcon color="white" mr="2" mt={1} />
                        <Text color="white" fontWeight="normal">Please note that adding LP or tokens into the Pool or Farm will automatically reset the timer to 28days</Text>
                    </Flex>
                </Flex>
            </ModalBody>
        </MyModal>
    );
}


export default HypezoneInfoModal;