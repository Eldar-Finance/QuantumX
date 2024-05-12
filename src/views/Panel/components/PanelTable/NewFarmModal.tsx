import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";
import { useFormik } from "formik";
import { formatBalance } from "utils/functions/formatBalance";
import useGetFarmsFees from "views/Panel/hooks/useGetFarmsFees";
import { createFarm } from "views/Panel/scServices/farmsCalls";

import * as yup from "yup";

const newFarmSchema = yup.object().shape({
  stakingTokenI: yup.string()
    .required("Staking token is required")
    .matches(/^\S*$/, "Staking token cannot contain spaces"),
  rewardTokenI: yup.string(),
  unbondingPeriod: yup.number().integer().required("Unbonding period is required"),
  unbondingFee: yup.number().required("Unbonding fee is required")
    .min(0, "Unbonding fee must be at least 0.")
    .max(99.99, "Unbonding fee must be less than 100."),
  allowMultipleRewardsTokens: yup.boolean(),
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
      allowMultipleRewardsTokens: false,
    },
    validationSchema: newFarmSchema,
    onSubmit: (values) => {
      createFarm(formatBalance({ balance: fees.farmCreation }, true), values);
    },
  });

  return (
    <MyModal bg="black.baseDark" isOpen={isOpen} onClose={onClose} size="xl">
      <form onSubmit={formik.handleSubmit}>
        <ModalHeader>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Heading fontSize={"md"}> Create Pool/Farm</Heading>{" "}
            <ActionButton aria-label="close" bg="transparent" onClick={onClose}>
              <CloseIcon color="main" fontSize={"12px"} cursor="pointer" />
            </ActionButton>
          </Flex>
        </ModalHeader>
        <Divider />
        <ModalBody display={"flex"} flexDir="column" gap={4} mt={5}>
          <FormControl>
            <FormLabel mb={1}>Staked Token</FormLabel>
            <Input
              p="2"
              pl={6}
              placeholder="Example: RARE-99e8b0"
              flex="1"
              name="stakingTokenI"
              bg="black.base"
              borderRadius={"md"}
              value={formik.values.stakingTokenI}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.stakingTokenI &&
                Boolean(formik.errors.stakingTokenI)
              }
            />{" "}
          </FormControl>
          {formik.touched.stakingTokenI && formik.errors.stakingTokenI ? (
              <Text color={"white.600"} fontSize={"sm"}>{formik.errors.stakingTokenI}</Text>
            ) : null}
          <Checkbox
            colorScheme="blue"
            onChange={formik.handleChange}
            name="allowMultipleRewardsTokens"
          >
            Allow multiple reward tokens
          </Checkbox>
          {!formik.values.allowMultipleRewardsTokens && (
            <FormControl>
              <FormLabel mb={1}>Reward Token</FormLabel>
              <Input
                p="2"
                pl={6}
                placeholder="Example: RARE-99e8b0"
                flex="1"
                name="rewardTokenI"
                bg="black.base"
                borderRadius={"md"}
                value={formik.values.rewardTokenI}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.rewardTokenI &&
                  Boolean(formik.errors.rewardTokenI)
                }
              />{" "}
            </FormControl>
          )}

          <Divider />

          <FormControl>
            <FormLabel mb={1}>Unbonding Period</FormLabel>
            <InputGroup>
              <Input
                p="2"
                pl={6}
                placeholder="Example: 3"
                flex="1"
                name="unbondingPeriod"
                bg="black.base"
                borderRadius={"md"}
                value={formik.values.unbondingPeriod}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.unbondingPeriod &&
                  Boolean(formik.errors.unbondingPeriod)
                }
              />
              <InputRightAddon>Days</InputRightAddon>
            </InputGroup>
            {formik.touched.unbondingPeriod && formik.errors.unbondingPeriod ? (
              <Text color={"white.600"} fontSize={"sm"}>{formik.errors.unbondingPeriod}</Text>
            ) : null}
          </FormControl>

          <FormControl
            isInvalid={
              formik.touched.unbondingFee && Boolean(formik.errors.unbondingFee)
            }
          >
            <FormLabel mb={1}>Unbonding Fee</FormLabel>

            <Box>
              {/* <Flex> */}
                <InputGroup>
                  <Input
                    p="2"
                    pl={6}
                    placeholder="Example: 3"
                    flex="1"
                    name="unbondingFee"
                    value={formik.values.unbondingFee}
                    onChange={formik.handleChange}
                    bg="black.base"
                    borderRadius={"md"}
                    isInvalid={
                      formik.touched.unbondingFee &&
                      Boolean(formik.errors.unbondingFee)
                    }
                  />{" "}
                  <InputRightAddon>%</InputRightAddon>
                </InputGroup>
                {formik.touched.unbondingFee && formik.errors.unbondingFee ? (
                  <Text color={"white.600"} fontSize={"sm"}>{formik.errors.unbondingFee}</Text>
                ) : null}
              {/* </Flex> */}
            </Box>
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

export default NewFarmModal;
