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
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";
import { useFormik } from "formik";
import { formatBalance } from "utils/functions/formatBalance";
import useGetFarmsFees from "views/Panel/hooks/useGetFarmsFees";
import { createFarm } from "views/Panel/scServices/farmsCalls";

import * as yup from "yup";

const newFarmSchema = yup.object().shape({
  stakingTokenI: yup.string().required("Staking token is required"),
  rewardTokenI: yup.string().required("Reward token is required"),
  unbondingPeriod: yup.number().required("Unbonding period is required"),
  unbondingFee: yup.number().required("Unbonding fee is required"),
  harvestFee: yup.number().required("Harvest fee is required"),
});

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewFarmModal = ({ isOpen, onClose }: IProps) => {
  const { fees } = useGetFarmsFees();

  const formik = useFormik({
    initialValues: {
      stakingTokenI: "",
      rewardTokenI: "",
      unbondingPeriod: "",
      unbondingFee: "",
      harvestFee: "",
    },
    validationSchema: newFarmSchema,
    onSubmit: (values) => {
      console.log(values);
      createFarm(formatBalance({ balance: fees.farmCreation }), values);
    },
  });

  return (
    <MyModal bg="black.baseDark" isOpen={isOpen} onClose={onClose} size="xl">
      <form onSubmit={formik.handleSubmit}>
        <ModalHeader>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Heading fontSize={"md"}> Create pool/farm</Heading>{" "}
            <ActionButton aria-label="close" bg="transparent" onClick={onClose}>
              <CloseIcon color="main" fontSize={"12px"} cursor="pointer" />
            </ActionButton>
          </Flex>
        </ModalHeader>
        <Divider />
        <ModalBody display={"flex"} flexDir="column" gap={4} mt={5}>
          <Box bg="black.base" p="2" px={5} borderRadius={"md"}>
            <Flex>
              <Input
                variant={"unstyled"}
                placeholder="Identifier of token to stake"
                flex="1"
                name="stakingTokenI"
                value={formik.values.stakingTokenI}
                onChange={formik.handleChange}
              />{" "}
            </Flex>
          </Box>
          <Box bg="black.base" p="2" px={5} borderRadius={"md"}>
            <Flex>
              <Input
                variant={"unstyled"}
                placeholder="Identifier of rewards token"
                flex="1"
                name="rewardTokenI"
                value={formik.values.rewardTokenI}
                onChange={formik.handleChange}
              />{" "}
            </Flex>
          </Box>
          <Box bg="black.base" p="2" px={5} borderRadius={"md"}>
            <Flex>
              <Input
                variant={"unstyled"}
                placeholder="Unbonding Period in epochs (Number only)"
                flex="1"
                name="unbondingPeriod"
                value={formik.values.unbondingPeriod}
                onChange={formik.handleChange}
              />{" "}
            </Flex>
          </Box>
          <Box bg="black.base" p="2" px={5} borderRadius={"md"}>
            <Flex>
              <Input
                variant={"unstyled"}
                placeholder="Unbonding Fee (Number oNLY)"
                flex="1"
                name="unbondingFee"
                value={formik.values.unbondingFee}
                onChange={formik.handleChange}
              />{" "}
            </Flex>
          </Box>
          <Box bg="black.base" p="2" px={5} borderRadius={"md"}>
            <Flex>
              <Input
                variant={"unstyled"}
                placeholder="Harvest Fee (Number oNLY)"
                flex="1"
                name="harvestFee"
                value={formik.values.harvestFee}
                onChange={formik.handleChange}
              />{" "}
            </Flex>
          </Box>
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

export default NewFarmModal;
