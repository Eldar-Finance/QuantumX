import { Box, Heading, Input } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import { isValidIdentifier } from "utils/functions/validates";
import { changeReward } from "views/Panel/scServices/faucetCall";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(0.1)
    .required("Amount is required"),
  //validate token input with a function
  token: Yup.string()
    .required("Token is required")
    .test("is-token", "Token is not valid", (value) => {
      return isValidIdentifier(value);
    }),
});

const ChangeRewards = () => {
  const formik = useFormik({
    initialValues: {
      amount: "",
      token: "",
    },
    onSubmit: (values) => {
      changeReward(values.amount, values.token);
    },
    validationSchema: validationSchema,
  });
  return (
    /* @ts-ignore */
    <Box Box as="form" onSubmit={formik.handleSubmit}>
      <Heading as="h3" fontSize={"xl"} mb={2} textAlign="center">
        Set Reward
      </Heading>
      <Input
        placeholder="Token..."
        mb={3}
        name="token"
        onChange={formik.handleChange}
        isInvalid={formik.touched.token && Boolean(formik.errors.token)}
      />
      <Input
        placeholder="Amount..."
        mb={3}
        type="number"
        name="amount"
        onChange={formik.handleChange}
        isInvalid={formik.touched.amount && Boolean(formik.errors.amount)}
      />
      <ActionButton w="full" type="submit">
        Send
      </ActionButton>
    </Box>
  );
};

export default ChangeRewards;
