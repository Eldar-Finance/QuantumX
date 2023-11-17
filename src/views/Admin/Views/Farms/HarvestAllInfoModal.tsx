import MyModal from 'components/Modal/Modal';
import { Text, ModalHeader, Divider, ModalBody, ModalCloseButton, Flex, ListIcon, List, Box } from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import { DotsIcon } from 'components/Icons/ui';

const HarvestAllInfoModal = ({ onClose, minDollarvalue, feeTokenName, feeAmount, showBBnotice = false }) => {
    return (
        <MyModal
            isOpen={true}
            bg="black.baseDark"
            onClose={onClose}
            size="xl"
        >
            <ModalHeader>Harvest All</ModalHeader>
            <ModalCloseButton mt={2}/>
            <Divider />
            <ModalBody padding={5}>
                <Flex direction="column" gap="20px">
                    <Flex alignItems="start">
                        <MinusIcon color="white" mr="2" mt={1} />
                        <Text color="white" fontWeight="normal">
                            QuantumX introduces &quot;Harvest All&quot; to allow users harvest all their rewards in one go instead of harvesting each farm individually.
                        </Text>
                    </Flex>
                    <Flex alignItems="start">
                        <MinusIcon color="white" mr="2" mt={1} />
                        <Text color="white" fontWeight="normal">
                            In order to do that, you need to have:
                            <List>
                                <Text>
                                    <ListIcon color="white" ml="2" as={MinusIcon}/>
                                    a minimum of ${minDollarvalue} worth of rewards from multiple {showBBnotice ? "farms" : "pools"}, and
                                </Text>
                                <Text>
                                    <ListIcon color="white" ml="2" as={MinusIcon}/>
                                    {feeAmount} {feeTokenName} in your wallet to cover the service fee.
                                </Text>
                            </List>
                        </Text>
                    </Flex>
                    {showBBnotice && <Flex alignItems="start">
                        <MinusIcon color="white" mr="2" mt={1} />
                        <Text color="white" fontWeight="normal">
                            BearlyBonding Farm is exlcuded from this feature due to its high gas cost.
                        </Text>
                    </Flex>}
                </Flex>
            </ModalBody>
        </MyModal>
    );
}


export default HarvestAllInfoModal;