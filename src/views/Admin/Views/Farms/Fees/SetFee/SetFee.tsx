import { Flex, Input, Text } from "@chakra-ui/react";
import { U64Value } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";

import { useFormik } from "formik";
import { setElrondBalance } from "utils/functions/formatBalance";
import * as yup from "yup";

const validationSchema = yup.object({
  value: yup.number(),
});

interface IProps {
  placeholder?: string;
  title: string;
  feeLabel: string;
  scFunc: "setFee" | "setCreatorCharge" | "setFarmCreationCharge";
  isAmount?: boolean;
}

const SetFee = ({ isAmount, scFunc, placeholder, title }: IProps) => {
  const formik = useFormik({
    initialValues: {
      value: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const fee = values.value;
      scCall("farms2", scFunc, [
        isAmount
          ? new U64Value(new BigNumber(Number(setElrondBalance(Number(fee)))))
          : new U64Value(new BigNumber(Number(fee) * 100)),
      ]);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex
        flexDirection={"column"}
        width="full"
        mb={8}
        maxW={{ xs: "300px", tablet: "450px" }}
      >
        <Text as="h2" fontSize={"1.8rem"} mb={5}>
          {title}
        </Text>

        <Input
          mb={4}
          w="full"
          onChange={formik.handleChange}
          isInvalid={formik.touched.value && Boolean(formik.errors.value)}
          placeholder={placeholder || "Fee"}
          name="value"
        />

        <ActionButton type="submit" px={8} py={5}>
          Set{" "}
        </ActionButton>
      </Flex>
    </form>
  );
};

export default SetFee;
