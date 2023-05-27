import MyModal from 'components/Modal/Modal';
import { ModalFooter, ModalBody, Button, Divider, Flex, Box, Input, FormErrorMessage, Text, ModalHeader, ModalCloseButton } from '@chakra-ui/react';
import { useFormik } from "formik";
import { setElrondBalance } from "utils/functions/formatBalance";
import { scCallOnlyTx } from "api/sc/calls";
import * as Yup from 'yup';
import { BigUIntValue } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";
import { sendTransaction } from "api/sc/sc";

interface FormValues {
    inputValue: number;
}

const SellTagModal = ({ onClose }) => {

    const initialValues: FormValues = {
        inputValue: null,
    };

    const validationSchema = Yup.object({
        inputValue: Yup.number()
            .nullable(true)
            .typeError('Input value must be a number')
            .required('Input value is required'),
    });

    const handleSubmit = async (values: FormValues) => {
        const transformedValue = setElrondBalance(Number(values.inputValue), 18);
        const tx = await scCallOnlyTx("tagsWsp", "listForSale", [new BigUIntValue(new BigNumber(transformedValue))], 10000000);
        const res = await sendTransaction({
            tx
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <MyModal
            isOpen={true}
            bg="black.baseDark"
            onClose={onClose}
            size="xl"
        >
            <ModalHeader>
                <Flex justify="space-between" alignItems="center">
                    <Text fontSize="xl" fontWeight="bold">
                        Sell Your QxTag
                    </Text>
                    <ModalCloseButton m="10px" />
                </Flex>
            </ModalHeader>
            <form onSubmit={formik.handleSubmit}>
                <Divider />
                <ModalBody>
                    <Box bg="black.base" p="5" borderRadius={"xl"}>

                        <Flex>
                            <Input
                                id="inputValue"
                                name="inputValue"
                                placeholder="Enter egld amount"
                                type="number"
                                value={formik.values.inputValue}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                aria-invalid={formik.errors.inputValue && formik.touched.inputValue}
                            />
                            <FormErrorMessage>{formik.errors.inputValue}</FormErrorMessage>
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
                                type="submit"
                                disabled={!formik.isValid || formik.isSubmitting}
                            >
                                {formik.isSubmitting ? 'Confirming...' : 'Confirm'}
                            </Button>
                        </Box>
                    </Flex>
                </ModalFooter>
            </form>
        </MyModal>
    );
}


export default SellTagModal;