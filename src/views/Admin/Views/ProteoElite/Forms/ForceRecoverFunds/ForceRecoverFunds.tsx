import { Center, Input } from "@chakra-ui/react";
import {
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
} from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  tokenI: yup.string().required(),
  nonce: yup.number().required(),
  amount: yup.number().required(),
  address: yup.string().required(),
});

const ForceRecoverFunds = () => {
  const formik = useFormik({
    initialValues: {
      tokenI: "",
      nonce: "",
      amount: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      scCall(
        proteoEliteWsp,
        "forceRecoverFunds",
        [
          BytesValue.fromUTF8(values.tokenI),
          new BigUIntValue(new BigNumber(values.nonce)),
          new BigUIntValue(new BigNumber(values.amount)),
          new AddressValue(new Address(values.address)),
        ],
        50000000
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDirection={"column"} mb={8}>
        <Input
          mb={2}
          width={{ xs: "300px", tablet: "450px" }}
          onChange={formik.handleChange}
          placeholder="Token Identifier"
          name="tokenI"
          isInvalid={formik.touched.tokenI && Boolean(formik.errors.tokenI)}
        />
        <Input
          mb={2}
          width={{ xs: "300px", tablet: "450px" }}
          onChange={formik.handleChange}
          placeholder="Token Nonce"
          name="nonce"
          isInvalid={formik.touched.nonce && Boolean(formik.errors.nonce)}
        />
        <Input
          mb={2}
          width={{ xs: "300px", tablet: "450px" }}
          onChange={formik.handleChange}
          placeholder="Amount"
          name="amount"
          isInvalid={formik.touched.amount && Boolean(formik.errors.amount)}
        />
        <Input
          mb={4}
          width={{ xs: "300px", tablet: "450px" }}
          onChange={formik.handleChange}
          placeholder="Receiver Address"
          name="address"
          isInvalid={formik.touched.address && Boolean(formik.errors.address)}
        />
        <ActionButton type="submit" px={8} py={5}>
          Force Recover Funds
        </ActionButton>
      </Center>
    </form>
  );
};

export default ForceRecoverFunds;
