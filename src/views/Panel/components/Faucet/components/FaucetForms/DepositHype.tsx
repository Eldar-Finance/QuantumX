import { Box, Heading, Input } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(0.1)
    .required("Amount is required"),
});

const DepositHype = () => {
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: validationSchema,
  });
  return (
    /* @ts-ignore */
    <Box as="form" onSubmit={formik.handleSubmit}>
      <Heading as="h3" fontSize={"xl"} mb={2} textAlign="center">
        Deposit HYPE
      </Heading>
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

export default DepositHype;
