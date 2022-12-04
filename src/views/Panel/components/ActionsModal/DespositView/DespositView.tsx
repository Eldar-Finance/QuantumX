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
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import { IScFarm2 } from "utils/types/sc.interface";
import { depositRewards } from "views/Panel/scServices";
import * as yup from "yup";

const validationSchema = yup.object({
  days: yup.number().required(),
  amount: yup.number().required(),
});

interface IProps {
  onClose: () => void;
  farm: IScFarm2;
}

const DepositView = ({ onClose, farm }: IProps) => {
  const { token } = useGetElrondToken(farm.rewardToken);
  const formik = useFormik({
    initialValues: {
      days: "",
      amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (token) {
        depositRewards(token, farm.farmId, values.days, values.amount);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ModalHeader>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Heading fontSize={"md"} textTransform="uppercase">
              Deposit rewards
            </Heading>{" "}
            <ActionButton aria-label="close" bg="transparent" onClick={onClose}>
              <CloseIcon color="main" fontSize={"12px"} cursor="pointer" />
            </ActionButton>
          </Flex>
        </ModalHeader>
        <Divider />
        <ModalBody mt="3">
          <Flex flexDir={"column"} gap="4">
            <Box bg="black.base" px="5" py="3" borderRadius={"lg"}>
              <Flex align={"center"}>
                <Input
                  variant={"unstyled"}
                  placeholder="0"
                  flex="1"
                  name="days"
                  onChange={formik.handleChange}
                />{" "}
                <Text fontSize={"14px"}>DAYS</Text>
              </Flex>
            </Box>
            <Box bg="black.base" px="5" py="3" borderRadius={"lg"}>
              <Flex align={"center"}>
                <Input
                  variant={"unstyled"}
                  placeholder="0.0"
                  flex="1"
                  name="amount"
                  onChange={formik.handleChange}
                />{" "}
                <Text fontSize={"14px"}>{token.ticker}</Text>
              </Flex>
            </Box>
          </Flex>
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

export default DepositView;
