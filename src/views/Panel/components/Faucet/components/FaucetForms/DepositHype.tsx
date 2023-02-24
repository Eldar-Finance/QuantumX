import { Box, Heading, Input } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import useGetfaucetInfo from "views/Panel/hooks/useGetfaucetInfo";
import { deposiHype } from "views/Panel/scServices/faucetCall";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(0.1)
    .required("Amount is required"),
});

const DepositHype = () => {
  const { info, isLoading } = useGetfaucetInfo();

  const { token } = useGetElrondToken(
    isLoading === false ? info?.reward.token : null
  );
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: (values) => {
      if (token) {
        deposiHype(values.amount, token);
      }
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
