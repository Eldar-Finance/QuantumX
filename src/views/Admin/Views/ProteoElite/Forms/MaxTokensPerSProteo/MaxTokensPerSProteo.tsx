import { Center, Input } from "@chakra-ui/react";
import { BigUIntValue, BytesValue } from "@multiversx/sdk-core/out";
import { scCall } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  tokenI: yup.string().required(),
  amount: yup.number().required(),
});

const MaxTokensPerSProteo = () => {
  const formik = useFormik({
    initialValues: {
      tokenI: "",
      amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      scCall(
        proteoEliteWsp,
        "setMaxTokensPerSproteo",
        [
          BytesValue.fromUTF8(values.tokenI),
          new BigUIntValue(new BigNumber(values.amount)),
        ],
        50000000
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDirection={"column"}>
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
          placeholder="Amount"
          name="amount"
          isInvalid={formik.touched.amount && Boolean(formik.errors.amount)}
        />
        <ActionButton type="submit" px={8} py={5}>
          Set Max Tokens Per Sproteo
        </ActionButton>
      </Center>
    </form>
  );
};

export default MaxTokensPerSProteo;
