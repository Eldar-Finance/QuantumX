import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import { IScFarm2 } from "utils/types/sc.interface";
import { setUnbondingPeriod } from "views/Panel/scServices/farmsCalls";
import * as yup from "yup";

const validationSchema = yup.object({
  days: yup.number().required(),
});

interface IProps {
  onClose: () => void;
  farm: IScFarm2;
}

const UnboundingView = ({ onClose, farm }: IProps) => {
  const formik = useFormik({
    initialValues: {
      days: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setUnbondingPeriod(farm.farmId, values.days);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ModalHeader>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Heading fontSize={"md"} textTransform="uppercase">
              Set Unbonding period
            </Heading>{" "}
            <ActionButton aria-label="close" bg="transparent" onClick={onClose}>
              <CloseIcon color="main" fontSize={"12px"} cursor="pointer" />
            </ActionButton>
          </Flex>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Box bg="black.base" p="5" borderRadius={"xl"}>
            <Flex mb="3">
              <Input
                variant={"unstyled"}
                placeholder="0"
                flex="1"
                name="days"
                onChange={formik.handleChange}
              />{" "}
              <Text fontSize={"14px"}>Days</Text>
            </Flex>
          </Box>
        </ModalBody>
        <ModalFooter justifyContent={"center"} gap="6" flexWrap={"wrap"}>
          <ActionButton
            variant={"outline"}
            w="full"
            maxW={"180px"}
            onClick={onClose}
          >
            Cancel
          </ActionButton>
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
        </ModalFooter>
      </form>
    </>
  );
};

export default UnboundingView;
