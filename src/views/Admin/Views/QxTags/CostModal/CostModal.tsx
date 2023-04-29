import { CloseIcon } from "@chakra-ui/icons";
import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";
import { useFormik } from "formik";

import * as yup from "yup";

const newFarmSchema = yup.object({
  tokenI: yup.string().required("Required"),
  costAmount: yup.string().required("Required"),
  nonce: yup.number().required("Required"),
});

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (values: {
    tokenI: string;
    costAmount: string;
    nonce: string;
  }) => void;
}

const CostModal = ({ isOpen, onClose, onSubmit, title }: IProps) => {
  const formik = useFormik({
    initialValues: {
      tokenI: "",
      costAmount: "",
      nonce: "0",
    },
    validationSchema: newFarmSchema,
    onSubmit: (values) => {
      console.log("values", values);

      onSubmit(values);
    },
  });

  return (
    <MyModal bg="black.baseDark" isOpen={isOpen} onClose={onClose} size="xl">
      <form onSubmit={formik.handleSubmit}>
        <ModalHeader>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Heading fontSize={"md"}> {title}</Heading>{" "}
            <ActionButton aria-label="close" bg="transparent" onClick={onClose}>
              <CloseIcon color="main" fontSize={"12px"} cursor="pointer" />
            </ActionButton>
          </Flex>
        </ModalHeader>
        <Divider />
        <ModalBody display={"flex"} flexDir="column" gap={4} mt={5}>
          <FormControl isRequired>
            <FormLabel mb={1}>Cost Token</FormLabel>
            <Input
              p="2"
              pl={6}
              placeholder="Example: EGLD"
              flex="1"
              name="tokenI"
              bg="black.base"
              borderRadius={"md"}
              value={formik.values.tokenI}
              onChange={formik.handleChange}
              isInvalid={formik.touched.tokenI && Boolean(formik.errors.tokenI)}
            />{" "}
          </FormControl>

          <Divider />

          <FormControl isRequired>
            <FormLabel mb={1}>Cost Amount</FormLabel>
            <InputGroup>
              <Input
                p="2"
                pl={6}
                placeholder="Example: 0.1"
                flex="1"
                name="costAmount"
                bg="black.base"
                borderRadius={"md"}
                value={formik.values.costAmount}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.costAmount && Boolean(formik.errors.costAmount)
                }
              />{" "}
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel mb={1}>Cost Amount</FormLabel>
            <InputGroup>
              <Input
                p="2"
                pl={6}
                placeholder="Example: 02"
                flex="1"
                name="nonce"
                bg="black.base"
                borderRadius={"md"}
                value={formik.values.nonce}
                onChange={formik.handleChange}
                isInvalid={formik.touched.nonce && Boolean(formik.errors.nonce)}
              />{" "}
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent={"center"} gap="6" flexWrap={"wrap"}>
          <ActionButton w="full" type="submit">
            Confirm
          </ActionButton>
        </ModalFooter>
      </form>
    </MyModal>
  );
};

export default CostModal;
