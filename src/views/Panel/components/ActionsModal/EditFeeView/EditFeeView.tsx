import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  ModalBody,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import { IScFarm2 } from "utils/types/sc.interface";
import { setEarlyUnbodingFee } from "views/Panel/scServices/farmsCalls";
import * as yup from "yup";

const valUnbound = yup.object({
  unboundingFee: yup.number().required().max(100).min(0),
});

interface IProps {
  onClose: () => void;
  farm: IScFarm2;
}

const EditFeeView = ({ onClose, farm }: IProps) => {
  const formikUnbound = useFormik({
    initialValues: {
      unboundingFee: "",
    },
    validationSchema: valUnbound,
    onSubmit: (values) => {
      setEarlyUnbodingFee(farm.farmId, values.unboundingFee);
    },
  });

  return (
    <>
      <ModalHeader>
        <Flex justifyContent={"space-between"} alignItems="center">
          <Heading fontSize={"md"} textTransform="uppercase">
            Fees
          </Heading>{" "}
          <ActionButton aria-label="close" bg="transparent" onClick={onClose}>
            <CloseIcon color="main" fontSize={"12px"} cursor="pointer" />
          </ActionButton>
        </Flex>
      </ModalHeader>
      <Divider />
      <ModalBody mt="3">
        <Center
          w="full"
          flexDir={"column"}
          mb={8}
          gap={4}
          as="form"
          //@ts-ignore
          onSubmit={formikUnbound.handleSubmit}
        >
          <Flex flexDir={"column"} gap="4">
            <Box
              bg="black.base"
              px="5"
              py="3"
              borderRadius={"lg"}
              border={
                formikUnbound.touched.unboundingFee &&
                Boolean(formikUnbound.errors.unboundingFee)
                  ? "1px solid"
                  : "0px"
              }
              borderColor="danger"
            >
              <Flex align={"center"}>
                <Input
                  variant={"unstyled"}
                  px={1}
                  mr="2"
                  borderRadius="4px"
                  placeholder="0.0"
                  flex="1"
                  name="unboundingFee"
                  onChange={formikUnbound.handleChange}
                />{" "}
                <Text fontSize={"14px"}>Unbonding Fee</Text>
              </Flex>
            </Box>
          </Flex>

          <ActionButton
            bg="white.100"
            variant={"outline"}
            color="gray.400"
            w="full"
            maxW={"180px"}
            type="submit"
          >
            Confirm
          </ActionButton>
        </Center>
      </ModalBody>
    </>
  );
};

export default EditFeeView;
