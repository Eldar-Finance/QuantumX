import MyModal from 'components/Modal/Modal';
import { Text, ModalHeader, Divider, ModalBody, ModalCloseButton, Flex, ListIcon } from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';

const AutoHarvestInfoModal = ({ onClose }) => {
    return (
        <MyModal
            isOpen={true}
            bg="black.baseDark"
            onClose={onClose}
            size="xl"
        >
            <ModalHeader>Auto-Harvest</ModalHeader>
            <ModalCloseButton mt={2}/>
            <Divider />
            <ModalBody padding={10}>
                <Flex direction="column" gap="20px">
                    <Flex alignItems="start">
                        <MinusIcon color="white" mr="2" mt={1} />
                        <Text color="white" fontWeight="normal">
                            QuantumX introduces &quot;Auto-Harvest&quot; to help users manage rewards by automatically harvesting them after a long period of inactivity.
                        </Text>
                    </Flex>
                    <Flex alignItems="start">
                        <MinusIcon color="white" mr="2" mt={1} />
                        <Text color="white" fontWeight="normal">
                            It&apos;s an emergency feature, so regular harvesting is encouraged to minimize costs and avoid reliance on this option.
                        </Text>
                    </Flex>
                    <Flex alignItems="start">
                        <MinusIcon color="white" mr="2" mt={1} />
                        <Text color="white" fontWeight="normal">
                           One of the main reasons behind this feature, is the harvesting of rewards for inactive users before a pool or farm gets shut down. This helps ensure that rewards are not lost due to extended inactivity.
                        </Text>
                    </Flex>
                    <Flex alignItems="start">
                        <MinusIcon color="white" mr="2" mt={1} />
                        <Text color="white" fontWeight="normal">
                            The Auto-Harvest feature won&apos;t activate if the pending rewards are less than the gas fees required for the transaction, for instance, when the rewards are less than $0.3, as the gas fees would significantly exceed the rewards.
                        </Text>
                    </Flex>
                </Flex>
            </ModalBody>
        </MyModal>
    );
}


export default AutoHarvestInfoModal;